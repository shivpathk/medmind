import mongoose from 'mongoose';

const ReminderSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  patientName: { type: String, required: true },
  mobile: { type: String, required: true },
  disease: { type: String, required: true },

  medicine: { type: String, required: true },
  quantity: { type: Number, required: true },

  doseQuantity: { type: Number, default: 1 },

  dosage: { 
    type: String, 
    enum: ['OD', 'BD', 'TDS', 'QID'], // medical terms
    required: true 
  },
  odTimeSlot: {
    type: String,
    enum: ['Early Morning', 'Lunch Time', 'Bed Time'],
  },
  whenToTake: { 
    type: String, 
    enum: ['before', 'after'],
    required: true 
  },

  suggestions: { type: String },

  reminderTimes: [Date], 
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export const Reminder = mongoose.models.Reminder || mongoose.model('Reminder', ReminderSchema);
