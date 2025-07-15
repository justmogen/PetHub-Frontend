import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortHeaderProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  startIndex: number;
  endIndex: number;
  totalResults: number;
  breedType?: string | null;
}

const SortHeader = ({
  sortBy,
  setSortBy,
  startIndex,
  endIndex,
  totalResults,
  breedType,
}: SortHeaderProps) => {
  const getLifestyleCategoryName = (type: string) => {
    switch (type) {
      case "doodle":
        return "Doodle Breeds";
      case "apartment":
        return "Apartment-Friendly Breeds";
      case "teacup":
        return "Teacup Breeds";
      case "family":
        return "Family-Friendly Breeds";
      case "hypoallergenic":
        return "Hypoallergenic Breeds";
      case "active":
        return "Active Breeds";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-gray-600">
        Showing {startIndex + 1}-{Math.min(endIndex, totalResults)} of{" "}
        {totalResults} results
        {breedType && (
          <span className="text-[#E07A5F] font-medium ml-1">
            in {getLifestyleCategoryName(breedType)}
          </span>
        )}
      </p>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="age">Age</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortHeader;
