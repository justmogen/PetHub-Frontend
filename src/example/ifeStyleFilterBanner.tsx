interface LifestyleFilterBannerProps {
  breedType: string;
}

const LifestyleFilterBanner = ({ breedType }: LifestyleFilterBannerProps) => {
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
    <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
      <p className="text-sm text-orange-800">
        <span className="font-semibold">Filtered by:</span>{" "}
        {getLifestyleCategoryName(breedType)}
      </p>
    </div>
  );
};

export default LifestyleFilterBanner;
