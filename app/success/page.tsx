// app/reminder-form/page.tsx
import SuccessPage from '@/components/SuccessPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remainder Saved Successfully | MedMind',
  description: 'Create and schedule automatic medicine reminders using MedMind.',
  keywords: ['reminder form', 'schedule medicine', 'pharmacy tool', 'auto alert', 'MedMind'],
};

export default function ReminderFormPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SuccessPage/>
    </div>
  );
}
