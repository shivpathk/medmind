// /lib/utils/scheduler.ts
export function generateReminderTimes({
  dosage,
  doseQuantity,
  quantity,
  odTimeSlot,
}: {
  dosage: "OD" | "BD" | "TDS" | "QID";
  doseQuantity: number;
  quantity: number;
  odTimeSlot?: "Early Morning" | "Lunch Time" | "Bed Time";
}): Date[] {
  const gapMap = { OD: 24, BD: 12, TDS: 8, QID: 6 };
  const timeSlotMap = { "Early Morning": 7, "Lunch Time": 13, "Bed Time": 21 };
  const gap = gapMap[dosage];
  const totalDoses = Math.floor(quantity / doseQuantity);

  const reminderTimes: Date[] = [];
  const now = new Date();
  let current = new Date(now.getTime() + 2 * 60 * 1000); // First dose after 2 mins

  const isSleepTime = (d: Date) => {
    const h = d.getHours();
    return h < 7 || h >= 22;
  };

  if (isSleepTime(current)) {
    // Move to 7 AM tomorrow
    current.setDate(current.getDate() + 1);
    current.setHours(7, 0, 0, 0);
  }

  for (let i = 0; i < totalDoses; i++) {
    const doseTime = new Date(current);

    if (dosage === "OD") {
      const slotHour = timeSlotMap[odTimeSlot || "Early Morning"];
      doseTime.setHours(slotHour, 0, 0, 0);

      if (doseTime < current) {
        // Move to next day
        doseTime.setDate(doseTime.getDate() + 1);
      }
      current = new Date(doseTime.getTime() + 24 * 60 * 60 * 1000); // next day
      reminderTimes.push(new Date(doseTime));
    } else {
      // Skip night hours
      while (isSleepTime(current)) {
        current.setMinutes(current.getMinutes() + 15);
      }
      reminderTimes.push(new Date(current));
      current = new Date(current.getTime() + gap * 60 * 60 * 1000);
    }
  }

  return reminderTimes;
}
