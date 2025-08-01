import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'MedMind Reminder',
  description: 'Auto-Prescription Reminder System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster  position='top-center'/>
      </body>
    </html>
  );
}
