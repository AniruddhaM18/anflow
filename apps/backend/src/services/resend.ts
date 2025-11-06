import { prismaClient } from "@repo/db";
import { Resend } from "resend";

export async function sendResendMail({
  userId,
  to,
  subject,
  html
}: {
  userId: string,
  to: string | string[],
  subject: string,
  html: string
}) {
  if(!userId) throw new Error("Unauthorized");
  if(!to || !subject || !html) throw new Error("All fields required");

  const getCredential = await prismaClient.credential.findFirst({
    where:{
      userId,
      platform: "GMAIL"
    }
  });
  if(!getCredential) throw new Error("Credential not found");
  const { apiKey, fromEmail } = getCredential.data as any;
  if(!apiKey || !fromEmail) throw new Error("Missing credential");

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: Array.isArray(to) ? to: [to],
    subject,
    html
  });
  if(error) throw new Error(error.message || "Failed to send email");
  return data;
}