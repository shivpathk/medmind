/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function FormNavigation({ 
  step, 
  prevStep, 
  nextStep, 
  loading,
  formData
}: { 
  step: number; 
  prevStep: () => void; 
  nextStep: () => void;
  loading: boolean;
  formData: any;
}) {
  return (
    <div className="mt-10 flex flex-col-reverse md:flex-row justify-between gap-3">
      {step > 1 && (
        <Button
          type="button"
          onClick={prevStep}
          variant="outline"
          className=" bg-slate-100 text-slate-700 font-medium py-3 px-6 rounded-xl hover:bg-slate-200 transition"
        >
          <ChevronLeft size={18} className="mr-2" /> Back
        </Button>
      )}
      
      {step < 4 ? (
        <Button
          type="button"
          onClick={nextStep}
          className=" bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          disabled={
            (step === 1 && (!formData.patientName || !formData.mobile || !formData.disease)) ||
            (step === 2 && (!formData.medicine || !formData.quantity)) ||
            (step === 3 && formData.dosage === "OD" && !formData.odTimeSlot)
          }
        >
          Continue <ChevronRight size={18} className="ml-2" />
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center">
              <Check size={18} className="mr-2" /> Save & Schedule Reminders
            </span>
          )}
        </Button>
      )}
    </div>
  );
}