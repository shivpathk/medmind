import { sendSMS } from "../lib/twilio.ts";
import { connectToDB } from "../lib/db.ts";
import { Reminder } from "../models/Reminder.ts";
import { User } from "../models/User.ts";

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning ☀️";
  if (hour < 17) return "Good afternoon 🌤️";
  if (hour < 21) return "Good evening 🌙";
  return "Good night 🌌";
}

function isSleepTime(date: Date): boolean {
  const h = date.getHours();
  return h >= 22 || h < 7;
}

export async function checkAndSendReminders() {
  try {
    await connectToDB();
    const now = new Date();
    const nowUTC = new Date(now.toISOString());

    const reminders = await Reminder.find({ completed: false }).populate(
      "doctorId"
    );

    for (const reminder of reminders) {
      const dueTimes = reminder.reminderTimes.filter(
        (time: Date) => time <= nowUTC
      );
      const upcomingTimes = reminder.reminderTimes.filter(
        (time: Date) => time > nowUTC
      );

      if (dueTimes.length === 0) continue; // Nothing due now

      const currentDoseTime = dueTimes[0];
      if (isSleepTime(currentDoseTime)) continue; // Skip if it's sleep time

      // Build reminder message
      const {
        patientName,
        mobile,
        medicine,
        doseQuantity,
        dosage,
        whenToTake,
        disease,
        suggestions,
        doctorId,
      } = reminder;

      const formattedDose = `${doseQuantity} ${
        doseQuantity > 1 ? "tablets" : "tablet"
      }`;
      const totalDosesLeft = upcomingTimes.length;

      const doctor = await User.findById(doctorId);
      const doctorName = doctor?.name || "Your Doctor";
      const doctorPhone = doctor?.phone || "+919155307250";

      const greeting = getTimeGreeting();

      // patient message 

//       const patientMessage = `
// ${greeting} ${patientName} 👋,

// This is your gentle reminder 💊 to take your medicine:
// ➡️ ${medicine} (${formattedDose}, ${dosage}) - ${whenToTake} meal.

// 🕒 Doses remaining: ${totalDosesLeft}

// ${suggestions ? `💡 Doctor's Note: ${suggestions}` : ""}

// Wishing you a speedy recovery and brighter days ahead! 💚
// If you feel uneasy or have any issues, please reach out to ${doctorName} at ${doctorPhone}.
//       `.trim();

// patient message for testing as twilio support small length message
      const patientMessage = `
This is your gentle reminder 💊 to take your medicine:
➡️ ${medicine} (${formattedDose}, ${dosage}) - ${whenToTake} meal.
      `.trim();

      // Send message to patient
      await sendSMS(mobile, patientMessage);

      // Send first message to doctor
      const totalPlanned = reminder.quantity / doseQuantity;
      if (reminder.reminderTimes.length === totalPlanned) {
        const docStartMsg = `
${getTimeGreeting()} ${doctorName} 👨‍⚕️,

Patient ${patientName} has begun their medication for "${disease}".
Prescription: ${medicine} (${formattedDose}, ${dosage}) - ${whenToTake} meal.
        `.trim();
        setTimeout(async () => {
          await sendSMS(doctorPhone, docStartMsg);
        },5000)
      }

      // Send final message if this was the last one
      if (upcomingTimes.length === 0) {
        const docEndMsg = `
✅ Patient ${patientName} has completed their course of ${medicine}.
📞 Suggest a follow-up at ${mobile}.
        `.trim();
        setTimeout(async () => {
          await sendSMS(doctorPhone, docEndMsg);
        }, 10000);
        reminder.completed = true;
      }

      // Update reminder times and save
      reminder.reminderTimes = upcomingTimes;
      await reminder.save();

      console.log(`✅ Reminder sent to ${patientName}`);
    }

    console.log("🎉 All reminders processed at", now.toLocaleString());
  } catch (err) {
    console.error("💥 Reminder Cron Error:", err);
  }
}