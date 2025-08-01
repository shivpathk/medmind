// app/reminder-form/page.tsx
import ReminderForm from '@/components/ReminderForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Reminder | MedMind',
  description: 'Create and schedule automatic medicine reminders using MedMind.',
  keywords: ['reminder form', 'schedule medicine', 'pharmacy tool', 'auto alert', 'MedMind'],
};

export default function ReminderFormPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <ReminderForm/>
    </div>
  );
}
