// lib/twilio.ts
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const from = process.env.TWILIO_PHONE_NUMBER!;

export const client = twilio(accountSid, authToken);

export const sendSMS = async (to: string, body: string) => {
  return await client.messages.create({
    body,
    from,
    to,
  });
};
