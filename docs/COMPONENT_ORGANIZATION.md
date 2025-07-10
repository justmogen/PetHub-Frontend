# Component Structure Organization

This guide provides a step-by-step plan for reorganizing the component structure in the PawHub frontend to improve maintainability and organization.

## Current Status

Some components (HeroSection, FeaturedPets) have been successfully refactored into subcomponent folders, but many remain as flat files.

✅ **Already Migrated:**

- HeroSection → components/hero/
- FeaturedPets → components/featured-pets/
- UI components → components/ui/

🔄 **Needs Migration:**

- PetCard, CategoryCard, CategoryGrid (to cards/)
- Navigation (to navigation/)
- Footer (to footer/)
- Other components

## Step-by-Step Migration Plan

### Step 1: Create Card Components Structure

```bash
mkdir -p src/components/cards
```

Move these files:

```
src/components/PetCard.tsx → src/components/cards/PetCard.tsx
src/components/PetCard.module.css → src/components/cards/PetCard.module.css
src/components/CategoryCard.tsx → src/components/cards/CategoryCard.tsx
src/components/CategoryCard.module.css → src/components/cards/CategoryCard.module.css
src/components/CategoryGrid.tsx → src/components/cards/CategoryGrid.tsx
src/components/CategoryGrid.module.css → src/components/cards/CategoryGrid.module.css
```

Update imports in all files that reference these components.

### Step 2: Create Navigation Structure

```bash
mkdir -p src/components/navigation
```

Move these files:

```
src/components/Navigation.tsx → src/components/navigation/Navigation.tsx
src/components/AppBreadcrumb.tsx → src/components/navigation/AppBreadcrumb.tsx
```

Update imports in all files that reference these components.

### Step 3: Create Footer Structure

```bash
mkdir -p src/components/footer
```

Move this file:

```
src/components/Footer.tsx → src/components/footer/Footer.tsx
```

Update imports in all files that reference this component.

### Step 4: Create Other Logical Groupings

```bash
mkdir -p src/components/breed-explorer
mkdir -p src/components/adoptions
mkdir -p src/components/shared
```

Move these files:

```
src/components/BreedExplorer.tsx → src/components/breed-explorer/BreedExplorer.tsx
src/components/BreedExplorer.module.css → src/components/breed-explorer/BreedExplorer.module.css
src/components/AdoptionForm.tsx → src/components/adoptions/AdoptionForm.tsx
```

### Step 5: Update Page Imports

Update imports in the page components:

```tsx
// src/app/page.tsx

// Before
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedPets from "@/components/FeaturedPets";
import RecentMatches from "@/components/RecentMatches";
import BreedExplorer from "@/components/BreedExplorer";
import BreederSpotlight from "@/components/BreederSpotlight";

// After
import HeroSection from "@/components/hero/HeroSection";
import CategoryGrid from "@/components/cards/CategoryGrid";
import FeaturedPets from "@/components/featured-pets/FeaturedPets";
import RecentMatches from "@/components/shared/RecentMatches";
import BreedExplorer from "@/components/breed-explorer/BreedExplorer";
import BreederSpotlight from "@/components/shared/BreederSpotlight";
```

### Step 6: Create Index Files for Easy Imports

Create barrel exports for component groups:

```tsx
// src/components/cards/index.ts
export { default as PetCard } from "./PetCard";
export { default as CategoryCard } from "./CategoryCard";
export { default as CategoryGrid } from "./CategoryGrid";

// src/components/navigation/index.ts
export { default as Navigation } from "./Navigation";
export { default as AppBreadcrumb } from "./AppBreadcrumb";

// And so on for other folders...
```

This enables cleaner imports:

```tsx
import { PetCard, CategoryCard } from "@/components/cards";
```

## Component Structure Best Practices

### Component Folder Structure

Each component folder should follow this pattern:

```
ComponentName/
  index.ts             # Re-exports the main component
  ComponentName.tsx    # Main component code
  ComponentName.module.css  # Component-specific styles
  ComponentName.test.tsx    # Component tests (optional)
  components/         # Subcomponents used only by this component
    SubComponent.tsx
```

### Complex Component Example

For components with multiple subcomponents:

```
HeroSection/
  index.ts
  HeroSection.tsx
  HeroSection.module.css
  components/
    HeroBackground.tsx
    HeroContent.tsx
    FloatingElements.tsx
  hooks/
    useHeroAnimation.ts
  utils/
    heroHelpers.ts
```

## Standardizing File Organization

### Component Template

Use this template for new components:

```tsx
// Import external libraries
import { useState, useEffect } from "react";
import { SomeIcon } from "lucide-react";

// Import internal components
import { Button } from "@/components/ui/button";

// Import styles
import styles from "./ComponentName.module.css";

// Type definitions
interface ComponentNameProps {
  // Props here
}

// Component
export const ComponentName = ({ prop1, prop2 }: ComponentNameProps) => {
  // State and hooks

  // Effects

  // Event handlers

  // Render
  return <div className="...">{/* Component content */}</div>;
};

export default ComponentName;
```

## Testing the Migration

After migrating each component:

1. Run the application to ensure it works correctly
2. Check for any console errors related to imports
3. Verify the component renders as expected
4. Update any tests that might be affected by the path changes

## Benefits of This Structure

1. **Maintainability** - Related code is grouped together
2. **Discoverability** - Easier to find components by category
3. **Reusability** - Clearer separation encourages proper component composition
4. **Scalability** - Structure can grow as the application expands
5. **Collaboration** - Easier for team members to work on different components
