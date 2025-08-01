import { checkAndSendReminders } from "@/lib/checkAndSendReminders";
import { NextResponse } from "next/server";

export async function GET() {
  await checkAndSendReminders();
  return NextResponse.json({ status: "Reminder cron ran successfully." });
}
