import { useState } from "react";
import { Search, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchInterface = ({ onSearch, isLoading = false }: SearchInterfaceProps) => {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Enter a search query",
        description: "Please enter something to search for",
        variant: "destructive",
      });
      return;
    }
    onSearch(query.trim());
  };

  const exampleQueries = [
    "What are the latest developments in AI?",
    "Current stock market trends",
    "Recent climate change research",
    "Best programming languages in 2024"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <Sparkles className="w-12 h-12 text-primary animate-pulse-glow" />
            <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full blur-xl"></div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Sonar AI
          </h1>
        </div>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Get real-time, AI-powered answers with source citations. 
          Ask anything and explore the latest information from across the web.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative glass rounded-2xl p-2 border border-border/50 shadow-glass">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pl-4">
              <Globe className="w-5 h-5 text-primary" />
              <Search className="w-5 h-5 text-text-secondary" />
            </div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything... What's happening in AI research today?"
              className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-text-muted"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="mr-2 bg-gradient-primary hover:shadow-ai transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {exampleQueries.map((example, index) => (
          <button
            key={index}
            onClick={() => {
              setQuery(example);
              onSearch(example);
            }}
            disabled={isLoading}
            className="p-4 text-left glass rounded-xl border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-glass hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 group"
          >
            <p className="text-text-secondary group-hover:text-text-primary transition-colors">
              {example}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};