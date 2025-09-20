import { SearchInterface } from "@/components/SearchInterface";
import { SearchResults } from "@/components/SearchResults";
import { useSearch } from "@/hooks/useSearch";

const Index = () => {
  const { results, isLoading, search } = useSearch();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          {/* Main search interface */}
          <div className="w-full flex justify-center mb-8">
            <SearchInterface onSearch={search} isLoading={isLoading} />
          </div>
          
          {/* Search results */}
          <SearchResults results={results} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
