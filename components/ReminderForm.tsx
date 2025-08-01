/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressHeader from "@/components/ProgressHeader";
import FormNavigation from "@/components/FormNavigation";
import Step1PatientInfo from "./PatientInformation";
import Step2MedicineInfo from "./MedicineInformation";
import Step3DosageSchedule from "./Dosage";
import Step4ReviewSubmit from "./Submit";

export default function ReminderForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    mobile: "",
    disease: "",
    medicine: "",
    quantity: "",
    doseQuantity: "1",
    dosage: "BD",
    odTimeSlot: "",
    whenToTake: "after",
    suggestions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData({ ...formData, mobile: digitsOnly });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => {
    if (
      step === 1 &&
      (!formData.patientName || !formData.mobile || !formData.disease)
    ) {
      toast.error("Please fill all patient details");
      return;
    }
    if (step === 2 && (!formData.medicine || !formData.quantity)) {
      toast.error("Please fill medicine details");
      return;
    }
    if (step === 3 && formData.dosage === "OD" && !formData.odTimeSlot) {
      toast.error("Please select a preferred time");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/reminder", {
        ...formData,
        mobile: `+91${formData.mobile}`,
        doseQuantity: Number(formData.doseQuantity),
      });

      if (res.data.success) {
        toast.success("✅ Reminder saved successfully!");
        router.push("/success");
      } else {
        toast.error("❌ Failed to save reminder");
      }
    } catch (error: any) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.error || "❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <ProgressHeader step={step} />

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <span className="text-blue-600 text-xl">💊</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Create New Reminder
                </h1>
                <p className="text-slate-500 text-sm font-normal mt-1">
                  {step === 1 && "Enter patient details"}
                  {step === 2 && "Add medicine information"}
                  {step === 3 && "Set dosage schedule"}
                  {step === 4 && "Review and submit"}
                </p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {step === 4 ? (
              <form onSubmit={handleSubmit}>
                <Step4ReviewSubmit
                  formData={formData}
                  handleChange={handleChange}
                />
                <FormNavigation
                  step={step}
                  prevStep={prevStep}
                  nextStep={nextStep}
                  loading={loading}
                  formData={formData}
                />
              </form>
            ) : (
              <>
                {step === 1 && (
                  <Step1PatientInfo
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
                {step === 2 && (
                  <Step2MedicineInfo
                    formData={formData}
                    handleChange={handleChange}
                    setFormData={setFormData}
                  />
                )}
                {step === 3 && (
                  <Step3DosageSchedule
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                <FormNavigation
                  step={step}
                  prevStep={prevStep}
                  nextStep={nextStep}
                  loading={loading}
                  formData={formData}
                />
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-slate-500 text-sm">
          <p>
            MedMind will automatically calculate the schedule based on dosage
          </p>
          <p>and avoid nighttime notifications (10PM - 7AM)</p>
        </div>
      </div>
    </div>
  );
}
