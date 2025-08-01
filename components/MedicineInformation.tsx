/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC } from "react";

interface Step2Props {
  formData: {
    medicine: string;
    quantity: number | string;
    doseQuantity: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Step2MedicineInfo: FC<Step2Props> = ({ formData, handleChange, setFormData }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <Label className="block mb-2 font-medium text-slate-700">Medicine Name *</Label>
        <Input
          name="medicine"
          value={formData.medicine}
          onChange={handleChange}
          placeholder="e.g. Metformin 500mg"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
          autoFocus
          required
        />
        <p className="text-slate-500 text-sm mt-2">
          Include dosage strength if available
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="block mb-2 font-medium text-slate-700">Total Quantity *</Label>
          <Input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 30 tablets"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            required
          />
        </div>

        <div>
          <Label className="block mb-2 font-medium text-slate-700">Quantity per Dose</Label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() =>
                  setFormData((prev: typeof formData) => ({
                    ...prev,
                    doseQuantity: String(num),
                  }))
                }
                className={`py-3 rounded-lg text-center font-medium text-sm transition ${
                  formData.doseQuantity === String(num)
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {num} {num === 1 ? "Unit" : "Units"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2MedicineInfo;
