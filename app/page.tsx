// app/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MedMind | Automated Prescription Reminders',
  description:
    'MedMind is a smart reminder app for pharmacies and doctors to schedule automatic WhatsApp, SMS, or voice call reminders for patients to take their medicine on time.',
  keywords: ['medicine reminder', 'pharmacy', 'doctor tool', 'auto reminders', 'WhatsApp SMS', 'MedMind'],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-4 p-10">
        Welcome to MedMind 💊
      </h1>
      <p className="text-gray-700 max-w-2xl text-lg sm:text-xl mb-6">
        Automate medicine reminders for your patients with ease. Send alerts via SMS, WhatsApp or calls directly from your pharmacy or clinic without any extra data entry.
      </p>
      <div className='flex items-center gap-5 '>
        <Link
          href="/onboarding"
          className="btn-secondary p-5 bg-gray-500 text-white hover:bg-gray-600"
        >
          Onboard Doctor
        </Link>
        <Link
          href="/reminder-form"
          className="btn-primary"
        >
          Create Reminder
        </Link>
      </div>
    </main>
  );
}
