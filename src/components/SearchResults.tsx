import { useState } from "react";
import { ExternalLink, Clock, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Source {
  title: string;
  url: string;
  snippet: string;
  domain: string;
}

interface SearchResult {
  query: string;
  answer: string;
  sources: Source[];
  timestamp: Date;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading?: boolean;
}

export const SearchResults = ({ results, isLoading = false }: SearchResultsProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
      toast({
        title: "Copied to clipboard",
        description: "Answer copied successfully",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="response-card p-8 animate-pulse">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary animate-spin" />
            <h3 className="text-xl font-semibold">Searching and analyzing...</h3>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-surface-elevated rounded w-3/4"></div>
            <div className="h-4 bg-surface-elevated rounded w-full"></div>
            <div className="h-4 bg-surface-elevated rounded w-2/3"></div>
          </div>
        </Card>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {results.map((result, index) => (
        <Card key={index} className="response-card p-6 animate-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {result.query}
                </h3>
                <div className="flex items-center gap-2 text-text-muted text-sm">
                  <Clock className="w-4 h-4" />
                  {result.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(result.answer, index)}
              className="text-text-secondary hover:text-text-primary"
            >
              {copiedIndex === index ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
              {result.answer}
            </p>
          </div>

          {result.sources.length > 0 && (
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Sources ({result.sources.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.sources.map((source, sourceIndex) => (
                  <a
                    key={sourceIndex}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-surface-elevated rounded-lg border border-border/30 hover:border-primary/50 transition-all duration-200 hover:shadow-elevated group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-text-primary text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {source.title}
                        </h5>
                        <p className="text-xs text-text-muted mt-1">
                          {source.domain}
                        </p>
                        <p className="text-xs text-text-secondary mt-2 line-clamp-2">
                          {source.snippet}
                        </p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-primary ml-2 flex-shrink-0 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};