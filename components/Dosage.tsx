/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";

export default function Step3DosageSchedule({ 
  formData, 
  setFormData 
}: { 
  formData: any; 
  setFormData: (data: any) => void;
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <Label className="block mb-2 font-medium text-slate-700">Dosage Frequency *</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "OD", label: "OD", desc: "Once a day" },
            { value: "BD", label: "BD", desc: "Twice a day" },
            { value: "TDS", label: "TDS", desc: "Thrice a day" },
            { value: "QID", label: "QID", desc: "Four times a day" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFormData((prev: any) => ({ ...prev, dosage: item.value, odTimeSlot: "" }))}
              className={`py-4 rounded-xl text-center border-2 transition-all ${
                formData.dosage === item.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
              }`}
            >
              <span className="block font-bold text-lg">{item.label}</span>
              <span className="block text-sm mt-1">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>
      
      {formData.dosage === "OD" && (
        <div>
          <Label className="block mb-2 font-medium text-slate-700">Preferred Time *</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { value: "Early Morning", label: "🌅 Early Morning", time: "7:00 AM" },
              { value: "Lunch Time", label: "🍽️ Lunch Time", time: "1:00 PM" },
              { value: "Bed Time", label: "🌙 Bed Time", time: "9:00 PM" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFormData((prev: any) => ({ ...prev, odTimeSlot: item.value }))}
                className={`py-3 rounded-xl text-center border-2 ${
                  formData.odTimeSlot === item.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                }`}
              >
                <span className="block font-medium">{item.label}</span>
                <span className="block text-sm mt-1 text-slate-500">{item.time}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <Label className="block mb-2 font-medium text-slate-700">When to Take *</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData((prev: any) => ({ ...prev, whenToTake: "before" }))}
            className={`py-4 rounded-xl text-center border-2 ${
              formData.whenToTake === "before"
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-green-300'
            }`}
          >
            <span className="block font-medium">🍽️ Before Meal</span>
            <span className="block text-sm mt-1">Take 10 mins before eating food</span>
          </button>
          
          <button
            type="button"
            onClick={() => setFormData((prev: any) => ({ ...prev, whenToTake: "after" }))}
            className={`py-4 rounded-xl text-center border-2 ${
              formData.whenToTake === "after"
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-green-300'
            }`}
          >
            <span className="block font-medium">🍽️ After Meal</span>
            <span className="block text-sm mt-1">Take 10 mins after eating food</span>
          </button>
        </div>
      </div>
    </div>
  );
}