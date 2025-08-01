// app/(subscription)/onboarding/page.tsx
import UserForm from '@/components/UserForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doctor/Shopkeeper Onboarding - Auto Prescription Reminder',
  description:
    'Get started with the Auto Prescription Reminder system by creating your doctor or shopkeeper account. Enter your contact details to automate patient medicine reminders with ease.',
  keywords: [
    'doctor onboarding',
    'shopkeeper registration',
    'medicine reminder system',
    'healthcare automation',
    'clinic reminder setup',
  ],
};

export default function OnboardingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100  p-4">
      <div className="w-full max-w-xl">
        <UserForm />
      </div>
    </main>
  );
}
