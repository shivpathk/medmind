/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className=" flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-200">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="text-green-600" size={48} />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-3">
            Reminder Scheduled!
          </h1>
          
          <p className="text-slate-600 mb-6">
            Your patient's medication reminders have been successfully scheduled. 
            They will receive their first reminder shortly.
          </p>
          
          <div className="grid grid-cols-2 gap-3 mt-8">
            <Link
              href="/reminder-form"
              className="btn-secondary"
            >
              Create Another
            </Link>
            
            <Link
              href="/dashboard"
              className="btn-primary"
            >
              View Dashboard
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-slate-500 text-sm">
          <p>MedMind will automatically track compliance and notify you when the course is completed</p>
        </div>
      </div>
    </div>
  );
}