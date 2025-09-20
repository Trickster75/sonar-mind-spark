import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Disease {
  name: string;
  probability: number;
  description: string;
  symptoms: string[];
  treatments: string[];
  severity: "mild" | "moderate" | "severe";
}

interface DiagnosisResult {
  symptoms: string;
  diseases: Disease[];
  generalAdvice: string;
  timestamp: Date;
}

// Medical knowledge base for local diagnosis
const medicalKnowledgeBase = {
  "fever": {
    diseases: [
      { name: "Common Cold", description: "Viral infection affecting upper respiratory tract", symptoms: ["fever", "cough", "runny nose", "sore throat"], treatments: ["Rest", "Fluids", "Paracetamol", "Throat lozenges"], severity: "mild" as const },
      { name: "Flu", description: "Influenza viral infection", symptoms: ["fever", "body aches", "fatigue", "headache"], treatments: ["Rest", "Antiviral medication", "Pain relievers", "Plenty of fluids"], severity: "moderate" as const },
      { name: "COVID-19", description: "SARS-CoV-2 viral infection", symptoms: ["fever", "cough", "loss of taste", "fatigue"], treatments: ["Isolation", "Rest", "Monitor symptoms", "Consult doctor"], severity: "moderate" as const }
    ]
  },
  "headache": {
    diseases: [
      { name: "Tension Headache", description: "Stress-related headache", symptoms: ["headache", "neck stiffness", "stress"], treatments: ["Rest", "Pain relievers", "Stress management", "Hydration"], severity: "mild" as const },
      { name: "Migraine", description: "Severe recurring headache disorder", symptoms: ["severe headache", "nausea", "light sensitivity"], treatments: ["Dark room", "Migraine medication", "Rest", "Cold compress"], severity: "moderate" as const }
    ]
  },
  "cough": {
    diseases: [
      { name: "Common Cold", description: "Viral infection affecting upper respiratory tract", symptoms: ["cough", "runny nose", "sore throat"], treatments: ["Cough syrup", "Honey", "Steam inhalation", "Rest"], severity: "mild" as const },
      { name: "Bronchitis", description: "Inflammation of bronchial tubes", symptoms: ["persistent cough", "mucus", "chest discomfort"], treatments: ["Bronchodilators", "Expectorants", "Rest", "Fluids"], severity: "moderate" as const }
    ]
  },
  "stomach pain": {
    diseases: [
      { name: "Gastritis", description: "Inflammation of stomach lining", symptoms: ["stomach pain", "nausea", "bloating"], treatments: ["Antacids", "Avoid spicy foods", "Small meals", "PPI medications"], severity: "mild" as const },
      { name: "Food Poisoning", description: "Foodborne illness", symptoms: ["stomach pain", "vomiting", "diarrhea"], treatments: ["Hydration", "BRAT diet", "Electrolyte solutions", "Rest"], severity: "moderate" as const }
    ]
  }
};

export const useMedicalDiagnosis = () => {
  const [results, setResults] = useState<DiagnosisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const diagnose = async (symptoms: string) => {
    setIsLoading(true);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const symptomsLower = symptoms.toLowerCase();
      const possibleDiseases: Disease[] = [];
      
      // Simple keyword matching for demonstration
      Object.entries(medicalKnowledgeBase).forEach(([symptom, data]) => {
        if (symptomsLower.includes(symptom)) {
          data.diseases.forEach(disease => {
            const matchingSymptoms = disease.symptoms.filter(s => 
              symptomsLower.includes(s.toLowerCase())
            );
            const probability = (matchingSymptoms.length / disease.symptoms.length) * 100;
            
            if (probability > 20) {
              possibleDiseases.push({
                ...disease,
                probability: Math.min(probability, 95)
              });
            }
          });
        }
      });

      // Sort by probability
      possibleDiseases.sort((a, b) => b.probability - a.probability);
      
      // Remove duplicates
      const uniqueDiseases = possibleDiseases.filter((disease, index, self) =>
        index === self.findIndex(d => d.name === disease.name)
      );

      const generalAdvice = "This is an AI-generated analysis for informational purposes only. Please consult a healthcare professional for proper medical diagnosis and treatment. If symptoms are severe or persistent, seek immediate medical attention.";

      const newResult: DiagnosisResult = {
        symptoms,
        diseases: uniqueDiseases.slice(0, 5), // Top 5 matches
        generalAdvice,
        timestamp: new Date()
      };

      setResults(prev => [newResult, ...prev]);
      
      toast({
        title: "Analysis completed",
        description: `Found ${uniqueDiseases.length} possible conditions`,
      });
      
    } catch (error) {
      console.error("Diagnosis error:", error);
      toast({
        title: "Analysis failed",
        description: "Could not complete the analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    diagnose
  };
};