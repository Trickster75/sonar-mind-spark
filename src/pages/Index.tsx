import { SymptomInput } from "@/components/SymptomInput";
import { DiagnosisResults } from "@/components/DiagnosisResults";
import { useMedicalDiagnosis } from "@/hooks/useSearch";

const Index = () => {
  const { results, isLoading, diagnose } = useMedicalDiagnosis();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          {/* Main symptom input interface */}
          <div className="w-full flex justify-center mb-8">
            <SymptomInput onAnalyze={diagnose} isLoading={isLoading} />
          </div>
          
          {/* Diagnosis results */}
          <DiagnosisResults results={results} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
