/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

export default function Step4ReviewSubmit({ 
  formData, 
  handleChange 
}: { 
  formData: any; 
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
        <h3 className="font-bold text-blue-800 flex items-center">
          <Check className="mr-2 text-blue-600" size={20} />
          Review Prescription Details
        </h3>
        
        <div className="mt-4 space-y-4">
          <div className="flex justify-between border-b pb-3">
            <span className="text-slate-600">Patient:</span>
            <span className="font-medium">{formData.patientName}</span>
          </div>
          
          <div className="flex justify-between border-b pb-3">
            <span className="text-slate-600">Mobile:</span>
            <span className="font-medium">+91 {formData.mobile}</span>
          </div>
          
          <div className="flex justify-between border-b pb-3">
            <span className="text-slate-600">Condition:</span>
            <span className="font-medium">{formData.disease}</span>
          </div>
          
          <div className="flex justify-between border-b pb-3">
            <span className="text-slate-600">Medicine:</span>
            <span className="font-medium">{formData.medicine}</span>
          </div>
          
          <div className="flex justify-between border-b pb-3">
            <span className="text-slate-600">Dosage:</span>
            <span className="font-medium">
              {formData.dosage} ({formData.doseQuantity} tablet{formData.doseQuantity !== "1" ? 's' : ''} per dose)
            </span>
          </div>
          
          {formData.dosage === "OD" && (
            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-600">Time:</span>
              <span className="font-medium">{formData.odTimeSlot}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-slate-600">Total Quantity:</span>
            <span className="font-medium">{formData.quantity} tablets</span>
          </div>
        </div>
      </div>
      
      <div>
        <Label className="block mb-2 font-medium text-slate-700">
          Special Instructions (Optional)
        </Label>
        <Textarea
          name="suggestions"
          value={formData.suggestions}
          onChange={handleChange}
          placeholder="e.g., Avoid alcohol, Take with plenty of water, Store in cool place..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition min-h-[120px]"
        />
      </div>
    </div>
  );
}