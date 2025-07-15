# Example Folder Documentation - Pet Marketplace Implementation

## Overview

The `/src/example/` folder contains a React-based pet marketplace implementation that serves as a reference for building our Next.js version. This implementation uses React Router and demonstrates key patterns for pet listing, filtering, and component architecture.

## File Structure

```
src/example/
├── Shop.tsx                     # Main shop page component
├── PetCard.tsx                  # Individual pet card component
├── PetFilters.tsx               # Filter sidebar component
├── PetGrid.tsx                  # Pet grid container with pagination
├── PetGridContainer.tsx         # Container logic for grid data
├── SortHeader.tsx               # Sort controls and result count
├── EmptyState.tsx               # No results state component
├── ifeStyleFilterBanner.tsx     # Lifestyle filter banner
├── usePetFilters.ts             # Filter logic custom hook
├── usePetSorting.ts             # Sorting logic custom hook
└── usePagiantion.ts             # Pagination logic custom hook
```

## Component Analysis

### 1. Shop.tsx - Main Container

**Purpose**: Root component for the pet marketplace page
**Key Features**:

- Mobile-responsive filter toggle
- State management for filters and display
- Integration of all child components

```tsx
// Key patterns from Shop.tsx
const [showFilters, setShowFilters] = useState(false);
const [filters, setFilters] = useState<FilterState>({
  priceRange: 100000,
  isVaccinated: false,
  isVetChecked: false,
  isGoodWithKids: false,
  isMicrochipped: false,
});

// Mobile filter handling
const handleApplyFilters = (newFilters: FilterState) => {
  setFilters(newFilters);
  setShowFilters(false); // Close mobile filters
};
```

**Layout Structure**:

```tsx
<div className="min-h-screen bg-[#F4EBD9]">
  {/* Header with title and mobile filter toggle */}
  <div className="bg-white border-b">
    <div className="container mx-auto px-4 py-4 md:py-6 max-w-7xl">
      {/* Title and mobile filter button */}
    </div>
  </div>

  {/* Main content area */}
  <div className="container mx-auto px-4 py-4 md:py-6 max-w-7xl">
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      {/* Filter sidebar - responsive */}
      <div className={`md:w-64 ${showFilters ? "block" : "hidden md:block"}`}>
        <PetFilters />
      </div>

      {/* Pet grid */}
      <div className="flex-1 min-w-0">
        <PetGrid />
      </div>
    </div>
  </div>
</div>
```

**Issues to Improve**:

- Hardcoded colors (`#F4EBD9`, `#E07A5F`) instead of design tokens
- React Router navigation instead of Next.js patterns
- No server-side rendering optimization

### 2. PetFilters.tsx - Filter System

**Purpose**: Comprehensive filtering interface with multiple filter types
**Key Features**:

- Price range slider
- Dropdown selects for breed, age, gender, location
- Boolean checkboxes for health characteristics
- Apply/Clear filter actions

```tsx
// Filter state interface
interface FilterState {
  age?: string;
  breed?: string;
  gender?: string;
  priceRange: number;
  location?: string;
  isVaccinated: boolean;
  isVetChecked: boolean;
  isGoodWithKids: boolean;
  isMicrochipped: boolean;
}
```

**Filter Components Used**:

- `Select` components for dropdowns
- `Checkbox` for boolean filters
- `Slider` for price range
- `Button` for actions

**Data Source**:

- Uses `dummyPets` data to generate dynamic filter options
- Extracts unique breeds, locations, ages from available pets

**Mobile Handling**:

- Apply/Clear buttons shown on mobile
- Progressive disclosure pattern
- Collapsible on mobile with toggle

**Issues to Improve**:

- Hardcoded filter options instead of API-driven
- No real-time filter result counts
- Limited accessibility features

### 3. PetCard.tsx - Pet Display Component

**Purpose**: Individual pet card for grid display
**Key Features**:

- High-quality image display
- Essential pet information
- Health indicator badges
- Action buttons (Choose Me, Heart favorite)

```tsx
interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  price?: string;
  image: string;
  isVaccinated?: boolean;
  isVetChecked?: boolean;
  isGoodWithKids?: boolean;
  location: string;
}
```

**Card Structure**:

```tsx
<Card className="group hover:shadow-lg transition-all duration-300">
  {/* Image with overlay actions */}
  <div className="relative">
    <img className="w-full h-48 object-cover" />
    <div className="absolute top-2 right-2">{/* Heart favorite button */}</div>
  </div>

  {/* Content area */}
  <div className="p-4">
    {/* Pet basic info */}
    <h3 className="font-semibold text-lg">{name}</h3>
    <p className="text-gray-600">
      {breed} • {age}
    </p>

    {/* Health badges */}
    <div className="flex flex-wrap gap-1 mt-2">
      {isVaccinated && <Badge>Vaccinated</Badge>}
      {isVetChecked && <Badge>Vet Checked</Badge>}
      {isGoodWithKids && <Badge>Good with Kids</Badge>}
    </div>

    {/* Location and action */}
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-500">{location}</span>
      <Button onClick={handleChooseMe}>Choose Me</Button>
    </div>
  </div>
</Card>
```

**Interaction Patterns**:

- Hover effects for enhanced interactivity
- Toast notifications for user feedback
- Modal integration for adoption form

**Issues to Improve**:

- No price display (commented out)
- Limited image optimization
- Basic accessibility support

### 4. PetGrid.tsx - Grid Container

**Purpose**: Manages pet grid display with sorting and pagination
**Key Features**:

- Integration with PetGridContainer for data logic
- Lifecycle filter banner display
- Sort header with result counts
- Pagination controls

```tsx
const PetGrid = ({ category, filters }: PetGridProps) => {
  const [sortBy, setSortBy] = useState("newest");
  const gridData = PetGridContainer({ category, filters, sortBy, setSortBy });

  return (
    <div>
      {/* Lifestyle filter banner */}
      {breedType && <LifestyleFilterBanner breedType={breedType} />}

      {/* Sort header */}
      <SortHeader {...sortProps} />

      {/* Pet grid or empty state */}
      {gridData.currentPagePets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridData.currentPagePets.map((pet) => (
            <PetCard key={pet.id} {...pet} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      {/* Pagination */}
      <Pagination />
    </div>
  );
};
```

**Grid Responsive Breakpoints**:

- 1 column on mobile
- 2 columns on tablet (md)
- 3 columns on desktop (lg)

### 5. Custom Hooks Analysis

#### usePetFilters.ts

**Purpose**: Filter logic separated from UI components
**Key Features**:

- Centralized filtering logic
- Age parsing and range checking
- Multiple filter criteria application

```typescript
const filteredPets = useMemo(() => {
  return pets.filter((pet) => {
    // Age filter
    if (filters.age) {
      const petAgeInMonths = parseAgeToMonths(pet.age);
      const ageRange = parseAgeRange(filters.age);
      if (!isAgeInRange(petAgeInMonths, ageRange)) {
        return false;
      }
    }

    // Breed filter (case-insensitive search)
    if (
      filters.breed &&
      !pet.breed.toLowerCase().includes(filters.breed.toLowerCase())
    ) {
      return false;
    }

    // Location filter
    if (
      filters.location &&
      !pet.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // Boolean filters
    if (filters.isVaccinated && !pet.isVaccinated) return false;
    if (filters.isVetChecked && !pet.isVetChecked) return false;
    if (filters.isGoodWithKids && !pet.isGoodWithKids) return false;

    return true;
  });
}, [pets, filters]);
```

**Helper Functions**:

- `parseAgeToMonths()`: Converts age strings to numeric months
- `parseAgeRange()`: Parses age range strings like "6-12 months"
- `isAgeInRange()`: Checks if age falls within range

#### usePetSorting.ts

**Purpose**: Sorting logic for pet listings
**Sort Options**:

- `newest`: Default order (no sorting)
- `age`: Youngest to oldest
- `price-low`: Lowest price first
- `price-high`: Highest price first

```typescript
const sortedPets = useMemo(() => {
  return [...pets].sort((a, b) => {
    switch (sortBy) {
      case "age":
        return parseAgeToMonths(a.age) - parseAgeToMonths(b.age);
      case "price-low":
        const priceA = parseInt(a.price.replace(/[^\d]/g, ""));
        const priceB = parseInt(b.price.replace(/[^\d]/g, ""));
        return priceA - priceB;
      case "price-high":
        const priceA2 = parseInt(a.price.replace(/[^\d]/g, ""));
        const priceB2 = parseInt(b.price.replace(/[^\d]/g, ""));
        return priceB2 - priceA2;
      default:
        return 0;
    }
  });
}, [pets, sortBy]);
```

#### usePagination.ts

**Purpose**: Simple pagination logic
**Features**:

- Fixed items per page
- Slice-based pagination
- Total pages calculation

```typescript
const usePagination = ({ items, itemsPerPage, currentPage }) => {
  return useMemo(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    return { totalPages, startIndex, endIndex, paginatedItems };
  }, [items, itemsPerPage, currentPage]);
};
```

## Design Patterns Used

### 1. Component Composition

- Clear separation of concerns
- Reusable filter and card components
- Custom hooks for business logic

### 2. State Management

- Local state with useState
- Derived state with useMemo
- Props drilling for filter state

### 3. Responsive Design

- Mobile-first approach
- Conditional rendering for mobile filters
- CSS Grid for responsive layouts

### 4. User Experience

- Progressive disclosure in filters
- Loading states and empty states
- Toast notifications for feedback

## Issues to Address in Next.js Implementation

### 1. Performance Issues

- **Client-side filtering**: All pets loaded and filtered in browser
- **No server-side rendering**: SEO and initial load performance
- **Image optimization**: Basic img tags without Next.js optimization

### 2. Routing & Navigation

- **React Router**: Should use Next.js App Router
- **URL state**: Filters not reflected in URL for bookmarking
- **SEO**: No proper meta tags or structured data

### 3. Data Management

- **Dummy data**: Should use real API with RTK Query
- **No caching**: API calls not optimized
- **No infinite scroll**: Basic pagination only

### 4. Accessibility

- **Limited ARIA**: Missing proper accessibility attributes
- **Keyboard navigation**: Not fully keyboard accessible
- **Screen reader**: Limited screen reader support

### 5. Design System

- **Hardcoded colors**: Should use design tokens
- **Inconsistent spacing**: Manual spacing instead of system
- **Limited variants**: Basic component variations

## Migration Strategy to Next.js

### Phase 1: Structure Migration

1. Convert Shop.tsx to Next.js page component
2. Move components to proper `/components` directory
3. Implement proper TypeScript interfaces

### Phase 2: API Integration

1. Replace dummy data with RTK Query hooks
2. Implement server-side filtering
3. Add proper error handling and loading states

### Phase 3: Performance Optimization

1. Implement Next.js Image optimization
2. Add server-side rendering for SEO
3. Implement infinite scroll or advanced pagination

### Phase 4: Enhanced UX

1. Add URL state management for filters
2. Implement proper accessibility
3. Add advanced features (save filters, favorites, etc.)

## Reusable Patterns for Next.js

### 1. Filter Architecture

```typescript
// Improved filter hook for Next.js
const useFilters = (initialFilters: FilterState) => {
  const [filters, setFilters] = useState(initialFilters);
  const router = useRouter();

  const updateFilters = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);
      // Update URL with new filters
      const query = filtersToQuery(newFilters);
      router.push({ pathname: router.pathname, query }, undefined, {
        shallow: true,
      });
    },
    [router]
  );

  return { filters, updateFilters };
};
```

### 2. Responsive Grid Component

```tsx
const PetGrid = ({ pets, loading }: PetGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {loading
        ? Array.from({ length: 12 }).map((_, i) => <PetCardSkeleton key={i} />)
        : pets.map((pet) => <PetCard key={pet.id} pet={pet} />)}
    </div>
  );
};
```

### 3. Advanced Filter Component

```tsx
const PetFilters = ({ filters, onFiltersChange }: PetFiltersProps) => {
  return (
    <Card className="p-6">
      <FilterGroup title="Price Range">
        <PriceRangeSlider
          value={filters.priceRange}
          onChange={(range) =>
            onFiltersChange({ ...filters, priceRange: range })
          }
        />
      </FilterGroup>

      <FilterGroup title="Characteristics">
        <FilterCheckboxGroup
          options={healthOptions}
          values={filters.health}
          onChange={(health) => onFiltersChange({ ...filters, health })}
        />
      </FilterGroup>
    </Card>
  );
};
```

## Conclusion

The example folder provides a solid foundation with good component architecture and user experience patterns. However, it needs significant updates for:

1. **Next.js App Router** integration
2. **Real API** integration with RTK Query
3. **Design system** consistency
4. **Performance** optimization
5. **Accessibility** improvements
6. **SEO** optimization

The patterns and component structure are valuable references for building our enhanced Next.js implementation with proper server-side rendering, API integration, and modern React patterns.
