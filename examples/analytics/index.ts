import { api, data, events } from "@serverless/cloud";

const TRANSPARENT_GIF_BUFFER = Buffer.from(
  "R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=",
  "base64"
);

api.get("/health", async (req, res) => {
  res.send({ status: "ok" });
});

function keyToISODate(_key: string) {
  const [, key] = _key.split(":");
  const year = key.slice(0, 4);
  const month = key.slice(4, 6) || "01";
  const day = key.slice(6, 8) || "01";
  const hour = key.slice(8, 10) || "00";

  return `${year}-${month}-${day}T${hour}:00:00.000Z`;
}

const labels = {
  h: "Hourly visits",
  d: "Daily visits",
  m: "Monthly visits",
  y: "Yearly visits",
};

api.get("/api/data", async (req, res) => {
  const hostkey = req.query.host;
  if (!hostkey) {
    res.status(400).send({ error: "host is required" });
    return;
  }

  const period = req.query.period || "h";
  if (!["h", "d", "m", "y"].includes(period)) {
    res.status(400).send({ error: "Invalid period" });
    return;
  }

  const host = (await data.get(`host_${hostkey}`, { meta: false })) as any;
  const result = (await data.get(`host_${hostkey}_${period}:*`, true)) as any;

  res.send({
    total: host?.value || 0,
    series: [
      {
        label: labels[period],
        data: result.items.map((item) => ({
          date: keyToISODate(item.key),
          value: item.value.value,
        })),
      },
    ],
  });
});

api.get("/api/hosts", async (req, res) => {
  const prefix = req.query.prefix || "";
  const results = (await data.getByLabel("label1", `hosts:${prefix}*`)) as any;
  res.send({
    items: results.items.map((item) => ({
      key: item.key.slice(5),
      hostname: item.value.hostname,
      pathname: item.value.pathname,
    })),
  });
});

api.get("/pixel.gif", async (req, res) => {
  res.writeHead(200, { "Content-Type": "image/gif" });
  res.end(TRANSPARENT_GIF_BUFFER, "binary");

  await events.publish("visit", {
    referer: req.headers.referer,
    agent: req.headers["user-agent"],
  });
});

function getHostkey(input: string) {
  try {
    const { hostname, pathname } = new URL(input);
    return { hostname, pathname };
  } catch (error) {
    return {};
  }
}

events.on("visit", async (event) => {
  const { hostname, pathname } = getHostkey(event.body.referer);
  if (!hostname) {
    return;
  }

  // TODO: track data by pathname and hostname

  const key = hostname;

  const date = new Date(event.time);
  const hour = date.toISOString().slice(0, 13).replace(/[-T]/g, "");
  const day = hour.slice(0, 8);
  const month = day.slice(0, 6);
  const year = month.slice(0, 4);

  // TODO: use atomic increments when data supports it

  const [host, h, d, m, y] = await Promise.all([
    data.get(`host_${key}`, { meta: false }),
    data.get(`host_${key}_h:${hour}`, { meta: false }),
    data.get(`host_${key}_d:${day}`, { meta: false }),
    data.get(`host_${key}_m:${month}`, { meta: false }),
    data.get(`host_${key}_y:${year}`, { meta: false }),
  ]);

  await Promise.all([
    data.set(
      `host_${key}`,
      {
        hostname,
        pathname,
        value: ((host as any)?.value || 0) + 1, // total visits
      },
      {
        label1: `hosts:${key}`,
      }
    ),
    data.set(`host_${key}_h:${hour}`, {
      value: ((h as any)?.value || 0) + 1,
    }),
    data.set(`host_${key}_d:${day}`, {
      value: ((d as any)?.value || 0) + 1,
    }),
    data.set(`host_${key}_m:${month}`, {
      value: ((m as any)?.value || 0) + 1,
    }),
    data.set(`host_${key}_y:${year}`, {
      value: ((y as any)?.value || 0) + 1,
    }),
  ]);
});
