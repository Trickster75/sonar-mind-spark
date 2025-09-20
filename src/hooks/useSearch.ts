import { useState } from "react";
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

export const useSearch = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const search = async (query: string) => {
    setIsLoading(true);
    
    try {
      // Simulate AI-powered search with web results
      // In a real implementation, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSources: Source[] = [
        {
          title: "Latest AI Research Developments - ArXiv",
          url: "https://arxiv.org/list/cs.AI/recent",
          snippet: "Recent publications in artificial intelligence research covering machine learning, neural networks, and computational intelligence.",
          domain: "arxiv.org"
        },
        {
          title: "AI News and Updates - MIT Technology Review",
          url: "https://www.technologyreview.com/topic/artificial-intelligence/",
          snippet: "Breaking news and analysis on artificial intelligence developments, featuring expert insights and industry trends.",
          domain: "technologyreview.com"
        },
        {
          title: "OpenAI Research Papers",
          url: "https://openai.com/research/",
          snippet: "Latest research publications from OpenAI covering language models, robotics, and AI safety.",
          domain: "openai.com"
        }
      ];

      const mockAnswer = `Based on the latest information from across the web, here are the key developments in AI:

**Recent Breakthroughs:**
• Advanced language models are showing improved reasoning capabilities and reduced hallucinations
• Multimodal AI systems are becoming more sophisticated, combining text, image, and audio processing
• AI safety research is accelerating with new alignment techniques and interpretability methods

**Industry Trends:**
• Major tech companies are increasing AI infrastructure investments
• Open-source AI models are becoming more competitive with proprietary solutions
• Regulatory frameworks are being developed in multiple countries

**Research Focus Areas:**
• Efficient training methods to reduce computational costs
• Better human-AI collaboration interfaces
• Solving complex scientific problems through AI assistance

The field continues to evolve rapidly with new papers published daily on platforms like ArXiv and significant commercial applications being deployed across industries.`;

      const newResult: SearchResult = {
        query,
        answer: mockAnswer,
        sources: mockSources,
        timestamp: new Date()
      };

      setResults(prev => [newResult, ...prev]);
      
      toast({
        title: "Search completed",
        description: "Found relevant information with sources",
      });
      
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "Could not complete the search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    search
  };
};