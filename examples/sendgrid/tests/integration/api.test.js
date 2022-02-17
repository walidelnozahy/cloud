import { api } from "@serverless/cloud";

test("should send emails successfully", async () => {
  const requestBody = {
    subject: "Hello from Serverless Cloud",
    text: "This email was sent from Serverless Cloud via SendGrid",
  };

  const { body: responseBody } = await api.post("/send").invoke(requestBody);

  expect(responseBody).toBe("Email sent successfully");
});
