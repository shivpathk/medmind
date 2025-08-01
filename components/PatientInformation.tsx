/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Step1PatientInfo({ 
  formData, 
  handleChange 
}: { 
  formData: any; 
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="block mb-2 font-medium text-slate-700">Patient Full Name *</Label>
          <Input
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Patient's Name"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            autoFocus
          />
        </div>
        
        <div>
          <Label className="block mb-2 font-medium text-slate-700">Mobile Number *</Label>
          <div className="flex">
            <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500">
              +91
            </span>
            <Input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full px-4 py-3 rounded-r-xl border border-l-0 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              required
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label className="block mb-2 font-medium text-slate-700">Health Condition *</Label>
        <Input
          name="disease"
          value={formData.disease}
          onChange={handleChange}
          placeholder="e.g. Hypertension, Diabetes, etc."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
          required
        />
        <p className="text-slate-500 text-sm mt-2">
          Helps us customize reminders
        </p>
      </div>
    </div>
  );
}