/**
 * Image path mapping for PawHub frontend
 *
 * This centralized file maps IDs to local image paths,
 * making it easier to update and maintain image references.
 */

// Breed category images (used in BreedExplorer)
export const breedCategoryImages = {
  "doodle-breeds": "/images/breeds/doodle-breed.jpg",
  "apartment-breeds": "/images/breeds/apartment-friendly.jpg",
  "teacup-breeds": "/images/breeds/teacup-breed.jpg",
  "family-breeds": "/images/breeds/family-favorites.jpg",
  "allergy-friendly": "/images/breeds/hypoallergenic.jpg",
  "active-breeds": "/images/breeds/active-breed.jpg",
};

/**
 * Social sharing images
 *
 * These images are used when links to the site are shared
 * on social media platforms like Facebook, Twitter, LinkedIn, etc.
 */
export const socialImages = {
  openGraph: "/images/social/og-image.jpg", // 1200×630px - for Facebook, LinkedIn
  twitter: "/images/social/twitter-image.jpg", // 1200×600px - for Twitter
};

/**
 * Pet images mapping
 *
 * Note: These will be replaced with backend data in production.
 * This mapping is primarily for development and testing.
 */
export const petImages = {
  "pet-1": "/images/pets/golden-retriever-bella.jpg",
  "pet-2": "/images/pets/german-shepherd-max.jpg",
  "pet-3": "/images/pets/labrador-luna.jpg",
};

/**
 * Get a properly formatted image path
 *
 * Utility function that ensures the image path is properly formatted
 * and handles missing images gracefully.
 */
export function getImagePath(
  category: "breed" | "pet" | "social",
  id: string,
  fallback: string = "/images/placeholder.jpg"
): string {
  if (category === "breed") {
    return (
      breedCategoryImages[id as keyof typeof breedCategoryImages] || fallback
    );
  }

  if (category === "pet") {
    return petImages[id as keyof typeof petImages] || fallback;
  }

  if (category === "social") {
    return socialImages[id as keyof typeof socialImages] || fallback;
  }

  return fallback;
}
