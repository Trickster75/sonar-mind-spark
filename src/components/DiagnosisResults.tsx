import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, AlertTriangle, Info, Pill } from "lucide-react";
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

interface DiagnosisResultsProps {
  results: DiagnosisResult[];
  isLoading?: boolean;
}

const DiagnosisResults = ({ results, isLoading }: DiagnosisResultsProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
      
      toast({
        title: "Copied to clipboard",
        description: "Analysis copied successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "moderate": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "severe": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return "text-red-600";
    if (probability >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-muted-foreground">Analyzing symptoms...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No results
  if (!results.length) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {results.map((result, resultIndex) => (
        <Card key={resultIndex} className="bg-card/50 backdrop-blur-sm border-primary/10">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-xl text-foreground">
                  Medical Analysis
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Symptoms: {result.symptoms}
                </p>
                <p className="text-xs text-muted-foreground">
                  {result.timestamp.toLocaleString()}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(
                  `Symptoms: ${result.symptoms}\n\nPossible Conditions:\n${result.diseases.map(d => 
                    `${d.name} (${d.probability.toFixed(0)}% match)\nTreatments: ${d.treatments.join(', ')}`
                  ).join('\n\n')}`, 
                  resultIndex
                )}
                className="h-8"
              >
                {copiedIndex === resultIndex ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* General Advice Warning */}
            <div className="flex items-start gap-3 p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-orange-600">Medical Disclaimer</p>
                <p className="text-sm text-muted-foreground">{result.generalAdvice}</p>
              </div>
            </div>

            {/* Possible Diseases */}
            {result.diseases.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Possible Conditions ({result.diseases.length})
                  </h3>
                </div>

                <div className="space-y-4">
                  {result.diseases.map((disease, diseaseIndex) => (
                    <div key={diseaseIndex} className="border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground text-lg">{disease.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(disease.severity)}>
                            {disease.severity}
                          </Badge>
                          <span className={`font-semibold ${getProbabilityColor(disease.probability)}`}>
                            {disease.probability.toFixed(0)}% match
                          </span>
                        </div>
                      </div>

                      {disease.symptoms && disease.symptoms.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Common Symptoms:</p>
                          <div className="flex flex-wrap gap-1">
                            {disease.symptoms.map((symptom, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {disease.treatments && disease.treatments.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Pill className="h-4 w-4 text-primary" />
                            <p className="text-sm font-medium text-foreground">Suggested Treatments:</p>
                          </div>
                          <ul className="space-y-1">
                            {disease.treatments.map((treatment, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                                {treatment}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  No specific conditions identified. Please provide more detailed symptoms or consult a healthcare professional.
                </p>
              </div>
            )}

            <Separator className="my-4" />

            <div className="text-center p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">
                🏥 If symptoms persist, worsen, or if you're concerned, please consult a qualified healthcare professional immediately.
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { DiagnosisResults };