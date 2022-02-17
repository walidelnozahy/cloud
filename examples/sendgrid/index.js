import { api, params } from "@serverless/cloud";
import sendGridMail from "@sendgrid/mail";

sendGridMail.setApiKey(params.SENDGRID_API_KEY);

api.post("/send", async (req, res) => {
  const { subject, text } = req.body || {};

  if (!subject || !text) {
    res.status(400).json("Missing 'subject' or 'text' properties");
  }

  const msg = {
    to: params.SENDGRID_SENDER,
    from: params.SENDGRID_SENDER,
    subject,
    text,
  };

  try {
    await sendGridMail.send(msg);
    res.send("Email sent successfully");
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }

    res.status(500).json("Failed to send email");
  }
});
