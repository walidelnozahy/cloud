// const baseURL = `${window.location.origin}`;
export const baseURL = `https://old-band-qem16.cloud.serverless.com`;
export const apiClient = async ({ url = '', body, method = 'GET' }) => {
  const res = await fetch(`${baseURL}/${url}`, {
    method,
    body,
  });
  const json = await res.json();
  if (res.ok) {
    return json;
  } else {
    throw new Error(json.message);
  }
};
