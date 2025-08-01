import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProgressHeader({ step }: { step: number }) {
  const router = useRouter();
  
  return (
    <div className="flex justify-between items-center mb-8 px-4">
      <button 
        onClick={() => router.push('/')}
        className="flex items-center text-blue-600 hover:text-blue-800 transition"
      >
        <ChevronLeft size={20} className="mr-1" /> Back
      </button>
      
      <div className="flex items-center space-x-4">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
              step === num 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-600'
            } font-bold`}>
              {num}
            </div>
            <span className="text-xs mt-1 font-medium text-slate-600">
              {num === 1 && 'Patient'}
              {num === 2 && 'Medicine'}
              {num === 3 && 'Dosage'}
              {num === 4 && 'Review'}
            </span>
          </div>
        ))}
      </div>
      
      <div className="w-20"></div>
    </div>
  );
}