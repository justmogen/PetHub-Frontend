# Frontend Pet Hub Recovery Plan

## Rollback Recovery: Implementing Advanced Filtering System

**Date**: July 17, 2025  
**Situation**: Rolled back 2 days to commit `0a764cb`, need to re-implement recent improvements

---

## Current State Analysis

### ✅ What We Still Have (From 2 Days Ago)

- Basic component structure in organized folders
- Navigation and Footer components
- Basic pet listing functionality
- CSS module system (needs to be removed)
- Unsplash image configuration (needs to be removed)
- Basic PetFilters interface (without breed characteristics)

### ❌ What We Lost (Need to Re-implement)

1. **Advanced Breed Characteristics Filtering**
2. **BreedFilterExplorer Component**
3. **Enhanced breedApi.ts with comprehensive filtering**
4. **CSS Module Cleanup (Tailwind migration)**
5. **Backend image integration**
6. **Enhanced PetFilters with breed characteristics**
7. **Updated usePetFilters hook**
8. **Backend filtering enhancements**

---

## Recovery Implementation Plan

### Phase 1: Infrastructure Cleanup (Priority: HIGH)

**Estimated Time**: 30 minutes

#### 1.1 Remove CSS Modules System

- [ ] Delete all `*.module.css` files
- [ ] Remove CSS module imports from components
- [ ] Replace with Tailwind CSS classes using design system tokens

**Files to Clean:**

- `src/components/HeroSection.module.css`
- `src/components/FeaturedPets.module.css`
- `src/styles/shared/*.module.css`
- Components importing these modules

#### 1.2 Update Next.js Configuration

- [ ] Remove Unsplash remote pattern from `next.config.ts`
- [ ] Configure for backend image sources

#### 1.3 Clean Component Dependencies

- [ ] Remove/update components using external images
- [ ] Ensure all imports point to existing files

### Phase 2: API Architecture Enhancement (Priority: HIGH)

**Estimated Time**: 45 minutes

#### 2.1 Create Enhanced breedApi.ts

```typescript
// src/lib/api/services/breedApi.ts
- Comprehensive breed filtering
- Breed characteristics queries
- Popular breeds endpoint
- Breed groups endpoint
- Advanced filtering with caching
```

#### 2.2 Update PetFilters Interface

```typescript
// Add to src/lib/api/types.ts
export interface PetFilters {
  // ... existing fields ...
  // Breed characteristics
  size_category?: "small" | "medium" | "large" | "giant";
  breed_group?: string;
  trainability?: "easy" | "moderate" | "difficult";
  good_with_children?: boolean;
  good_with_other_pets?: boolean;
  apartment_friendly?: boolean;
  hypoallergenic?: boolean;
  intelligence_gte?: number;
}
```

#### 2.3 Remove categoryApi.ts

- [ ] Delete redundant category API
- [ ] Update imports that reference it

### Phase 3: Advanced Filtering Components (Priority: HIGH)

**Estimated Time**: 60 minutes

#### 3.1 Create BreedFilterExplorer Component

```typescript
// src/components/BreedFilterExplorer.tsx
- Comprehensive breed filtering interface
- Multi-tab layout (characteristics, popular, groups)
- Advanced filtering controls
- Separate from main BreedExplorer
```

#### 3.2 Enhanced PetFilters Component

```typescript
// src/components/pets/PetFilters.tsx
- Add breed characteristics section
- Size category dropdown
- Trainability dropdown
- Boolean characteristic badges
- handleBooleanToggle function
- Updated active filters count
```

#### 3.3 Updated usePetFilters Hook

```typescript
// src/hooks/usePetFilters.ts
- URL parameter handling for characteristics
- Breed characteristic initialization
- Enhanced updateFilters function
```

### Phase 4: Backend Integration (Priority: MEDIUM)

**Estimated Time**: 30 minutes

#### 4.1 Django Model Enhancement

```python
# pets/models/breed.py
- Add hypoallergenic field (if missing)
- Ensure all characteristic fields exist
```

#### 4.2 Update Pet Filtering

```python
# pets/views/pet_views.py
class PetFilter(django_filters.FilterSet):
    # Add breed characteristic filters
    size_category = django_filters.CharFilter(field_name='breed__size_category')
    breed_group = django_filters.CharFilter(field_name='breed__breed_group')
    trainability = django_filters.CharFilter(field_name='breed__trainability')
    good_with_children = django_filters.BooleanFilter(field_name='breed__good_with_children')
    good_with_other_pets = django_filters.BooleanFilter(field_name='breed__good_with_other_pets')
    apartment_friendly = django_filters.BooleanFilter(field_name='breed__apartment_friendly')
    hypoallergenic = django_filters.BooleanFilter(field_name='breed__hypoallergenic')
    intelligence_gte = django_filters.NumberFilter(field_name='breed__intelligence', lookup_expr='gte')
```

### Phase 5: Design System Implementation (Priority: MEDIUM)

**Estimated Time**: 20 minutes

#### 5.1 Replace All CSS Module Classes

- [ ] HeroSection components → Tailwind classes
- [ ] FeaturedPets components → Tailwind classes
- [ ] Use brand color tokens (brand-primary, brand-secondary, etc.)
- [ ] Implement gradient patterns with Tailwind

#### 5.2 Component Modernization

- [ ] Update button styles
- [ ] Update card components
- [ ] Ensure responsive design
- [ ] Use design system spacing and typography

### Phase 6: Navigation & Routing Fixes (Priority: LOW)

**Estimated Time**: 15 minutes

#### 6.1 BreedExplorer Navigation

- [ ] Fix navigation from `/shop` to `/pets`
- [ ] Update breed category routing
- [ ] Ensure URL parameters are passed correctly

---

## Implementation Order

### Step 1: Emergency Fixes (Start Immediately)

1. Remove CSS module imports causing build errors
2. Clean Next.js config
3. Ensure basic app runs without errors

### Step 2: Core Infrastructure

1. Create breedApi.ts
2. Update PetFilters interface
3. Update usePetFilters hook

### Step 3: UI Components

1. Create BreedFilterExplorer
2. Enhance PetFilters component
3. Update styling to Tailwind

### Step 4: Backend Sync

1. Add backend filtering
2. Test API endpoints
3. Verify filtering works end-to-end

### Step 5: Polish & Optimization

1. Fix navigation issues
2. Optimize styling
3. Test user flow

---

## Critical Files to Recreate

### High Priority

1. `src/lib/api/services/breedApi.ts` - **CRITICAL**
2. `src/components/BreedFilterExplorer.tsx` - **CRITICAL**
3. `src/hooks/usePetFilters.ts` (enhance) - **CRITICAL**
4. `src/components/pets/PetFilters.tsx` (enhance) - **CRITICAL**

### Medium Priority

1. Backend filter updates
2. CSS module cleanup
3. Design system implementation

### Low Priority

1. Navigation fixes
2. Image optimization
3. Performance improvements

---

## Success Criteria

- [ ] Advanced breed characteristics filtering works
- [ ] Frontend communicates with backend filtering
- [ ] No CSS module build errors
- [ ] Clean Tailwind-based styling
- [ ] Responsive design maintained
- [ ] All components render without errors
- [ ] URL parameters work for filtering
- [ ] User can filter by apartment-friendly, good with children, etc.

---

## Time Estimate

**Total Recovery Time**: ~3 hours

- Phase 1 (Cleanup): 30 min
- Phase 2 (API): 45 min
- Phase 3 (Components): 60 min
- Phase 4 (Backend): 30 min
- Phase 5 (Styling): 20 min
- Phase 6 (Polish): 15 min

---

## Next Steps

1. Start with Phase 1 emergency fixes
2. Work through phases sequentially
3. Test after each major component
4. Commit frequently to avoid future rollbacks
