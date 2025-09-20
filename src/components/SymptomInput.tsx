import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Stethoscope } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SymptomInputProps {
  onAnalyze: (symptoms: string) => void;
  isLoading?: boolean;
}

const SymptomInput = ({ onAnalyze, isLoading }: SymptomInputProps) => {
  const [symptoms, setSymptoms] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast({
        title: "Please describe your symptoms",
        variant: "destructive",
      });
      return;
    }
    onAnalyze(symptoms);
  };

  const exampleSymptoms = [
    "I have a headache and feeling nauseous",
    "Persistent cough with fever for 3 days",
    "Stomach pain after eating, bloating",
    "Sore throat and runny nose"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Stethoscope className="h-12 w-12 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            MediAI
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Describe your symptoms and get AI-powered analysis with possible conditions and treatment suggestions
        </p>
        <div className="text-sm text-orange-500 bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 max-w-2xl mx-auto">
          ⚠️ This is for informational purposes only. Always consult a healthcare professional for medical advice.
        </div>
      </div>

      {/* Symptom Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <Textarea
            placeholder="Describe your symptoms in detail... (e.g., headache, fever, nausea, duration, severity)"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full text-lg min-h-[120px] border-primary/20 focus:border-primary/40 bg-background/60 backdrop-blur-sm resize-none"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="absolute right-3 bottom-3 h-10 bg-primary hover:bg-primary/90"
            disabled={isLoading || !symptoms.trim()}
          >
            <Stethoscope className="h-4 w-4 mr-2" />
            Analyze Symptoms
          </Button>
        </div>
      </form>

      {/* Example Symptoms */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground text-center">Common symptom examples:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleSymptoms.map((example, index) => (
            <button
              key={index}
              onClick={() => {
                setSymptoms(example);
                onAnalyze(example);
              }}
              className="p-4 text-left rounded-lg border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-200 text-sm group"
              disabled={isLoading}
            >
              <span className="text-foreground group-hover:text-primary transition-colors">
                {example}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { SymptomInput };