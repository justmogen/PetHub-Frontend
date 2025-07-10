# Image Optimization Quick Guide

This guide focuses specifically on moving from external Unsplash images to locally hosted, optimized images - one of the highest-priority improvements for PawHub.

## Why This Matters

1. **Performance:** Local, optimized images load faster than external URLs
2. **Reliability:** No dependency on external services that could change/break
3. **Control:** Full control over image optimization and formats
4. **SEO:** Better Core Web Vitals scores, especially LCP (Largest Contentful Paint)

## Step 1: Create Directory Structure

```bash
mkdir -p public/images/{pets,breeds,categories,backgrounds,social}
```

## Step 2: Download & Optimize Key Images

### Featured Pets (Highest Priority)

Current references in `FeaturedPets.tsx`:

```
https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500
https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=500
https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500
```

Download and save as:

```
public/images/pets/golden-retriever-bella.jpg
public/images/pets/german-shepherd-max.jpg
public/images/pets/labrador-luna.jpg
```

### Category Images

Check for images in `CategoryGrid.tsx` and `CategoryCard.tsx` and download to:

```
public/images/categories/[category-name].jpg
```

### Breed Explorer Images

Check for images in `BreedExplorer.tsx` and download to:

```
public/images/breeds/[breed-name].jpg
```

### Social Images (Required for SEO)

Create:

```
public/images/social/og-image.jpg (1200x630px)
public/images/social/twitter-image.jpg (1200x600px)
```

## Step 3: Create Image Mapping System

Create a new file:

```typescript
// src/lib/images.ts

export const petImages = {
  "pet-1": "/images/pets/golden-retriever-bella.jpg",
  "pet-2": "/images/pets/german-shepherd-max.jpg",
  "pet-3": "/images/pets/labrador-luna.jpg",
};

export const categoryImages = {
  "doodle-breeds": "/images/categories/doodle-breed.jpg",
  "apartment-breeds": "/images/categories/apartment-friendly.jpg",
  "teacup-breeds": "/images/categories/teacup-breed.jpg",
  "family-breeds": "/images/categories/family-favorites.jpg",
  "allergy-friendly": "/images/categories/hypoallergenic.jpg",
  "active-breeds": "/images/categories/active-breed.jpg",
};

export const breedImages = {
  "golden-retriever": "/images/breeds/golden-retriever.jpg",
  "german-shepherd": "/images/breeds/german-shepherd.jpg",
  labrador: "/images/breeds/labrador.jpg",
  // Add more as needed
};

export const socialImages = {
  openGraph: "/images/social/og-image.jpg",
  twitter: "/images/social/twitter-image.jpg",
};
```

## Step 4: Update Components

### Update PetCard Component

```tsx
// src/components/PetCard.tsx
import { petImages } from '@/lib/images';

// Change this:
<Image
  src={image}
  alt={name}
  width={400}
  height={300}
  className="..."
/>

// To this:
<Image
  src={petImages[id] || '/images/pets/placeholder.jpg'}
  alt={name}
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j..." // Add placeholder base64
  className="..."
/>
```

### Update FeaturedPets Component

```tsx
// src/components/FeaturedPets.tsx or src/components/featured-pets/PetCardGrid.tsx
import { petImages } from "@/lib/images";

const featuredPets = [
  {
    id: "pet-1",
    name: "Bella",
    breed: "Golden Retriever",
    age: "2 years",
    price: "45,000",
    // Change this:
    // image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500",
    // To this:
    image: petImages["pet-1"],
    isVaccinated: true,
    isVetChecked: true,
    isGoodWithKids: true,
    location: "Nairobi, Kenya",
  },
  // Update other pets similarly
];
```

### Update Layout for Social Images

```tsx
// src/app/layout.tsx
import { socialImages } from "@/lib/images";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pawhub.com";

export const metadata: Metadata = {
  // ...existing metadata
  openGraph: {
    // ...existing openGraph
    images: [
      {
        url: `${baseUrl}${socialImages.openGraph}`,
        width: 1200,
        height: 630,
        alt: "PawHub - Premium Pet Marketplace",
      },
    ],
  },
  twitter: {
    // ...existing twitter
    images: [`${baseUrl}${socialImages.twitter}`],
  },
};
```

## Step 5: Update Next.js Config

Once all images are local, remove the Unsplash domain from allowed domains:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    // Uncomment only if you need external domains
    // domains: ["images.unsplash.com"],
  },
};
```

## Step 6: Test & Validate

1. Run the app locally to ensure all images load correctly
2. Check Network tab in DevTools to verify images are loading from local paths
3. Validate social images with:
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
4. Run Lighthouse test to verify improved performance

## Tools for Image Optimization

1. [Squoosh](https://squoosh.app/) - Browser-based image compression
2. [Sharp](https://sharp.pixelplumbing.com/) - Node.js library for image processing
3. [TinyPNG](https://tinypng.com/) - Compress PNG and JPG images
4. [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization) - Built-in features

## Bonus: Generate Placeholder Images

For optimal loading experience, generate base64 blur placeholders:

```bash
npx plaiceholder /path/to/image.jpg
```

This generates a tiny base64 representation for the blurDataURL prop.
