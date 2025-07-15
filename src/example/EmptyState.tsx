import { Link } from "react-router-dom";

interface EmptyStateProps {
  breedType?: string | null;
}

const EmptyState = ({ breedType }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">
        No pets found matching your criteria.
      </p>
      <p className="text-gray-400 mt-2">
        Try adjusting your filters or search terms.
      </p>
      {breedType && (
        <Link
          to="/shop"
          className="inline-block mt-4 text-[#E07A5F] hover:text-[#d4654a] font-medium"
        >
          View all pets
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
