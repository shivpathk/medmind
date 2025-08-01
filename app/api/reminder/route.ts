import { connectToDB } from "@/lib/db";
import { Reminder } from "@/models/Reminder";
import { NextResponse } from "next/server";
import { generateReminderTimes } from "@/lib/utils/scheduler";

const MOCK_DOCTOR_ID = "68849161d3f51992474a39a6";

type DosageType = "OD" | "BD" | "TDS" | "QID";
type TimeSlot = "Early Morning" | "Lunch Time" | "Bed Time";


export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();

        const {
      patientName,
      mobile,
      disease,
      medicine,
      quantity,
      doseQuantity,
      dosage,
      odTimeSlot,
      whenToTake,
      suggestions,
    }: {
      patientName: string;
      mobile: string;
      disease: string;
      medicine: string;
      quantity: number;
      doseQuantity: number;
      dosage: DosageType;
      odTimeSlot?: TimeSlot;
      whenToTake: string;
      suggestions?: string;
    } = body;

    const reminderTimes = generateReminderTimes({
      dosage,
      doseQuantity,
      quantity,
      odTimeSlot: dosage === 'OD' ? odTimeSlot : undefined,
    });

    const reminder = new Reminder({
      doctorId: MOCK_DOCTOR_ID,
      patientName,
      mobile,
      disease,
      medicine,
      quantity,
      doseQuantity,
      dosage,
      odTimeSlot: dosage === 'OD' ? odTimeSlot : undefined,
      whenToTake,
      suggestions,
      reminderTimes,
    });

    await reminder.save();

    return NextResponse.json({ success: true, reminder }, { status: 201 });
  } catch (error) {
    console.error("[REMINDER_CREATE_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
