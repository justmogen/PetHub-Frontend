# CSS & Styling Optimization Guide

This guide focuses on optimizing and organizing CSS and styling in the PawHub frontend application, emphasizing Tailwind-first development with proper use of CSS modules for complex styles.

## Current Style Structure

The codebase currently uses:

1. **Tailwind CSS** (primary styling approach)
2. **CSS Modules** (for complex styles that Tailwind can't easily handle)
3. **Global CSS** (in globals.css)
4. **Design System CSS** (in styles/design-system.css)

## Priority Improvements

### 1. Extract Common Style Patterns

**Issue:** Duplicate style patterns across multiple CSS modules.

**Solution:** Create shared style modules for common patterns:

```bash
mkdir -p src/styles/shared
```

Create these shared modules:

```
src/styles/shared/gradients.module.css
src/styles/shared/animations.module.css
src/styles/shared/text-effects.module.css
```

**Example Content:**

```css
/* src/styles/shared/gradients.module.css */
.primaryGradient {
  background: linear-gradient(
    135deg,
    hsl(var(--primary)) 0%,
    hsl(var(--primary-600)) 100%
  );
}

.textGradient {
  background: linear-gradient(
    135deg,
    hsl(var(--primary)) 0%,
    hsl(var(--secondary)) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

/* Add other common gradients */
```

```css
/* src/styles/shared/animations.module.css */
.fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

.slideUp {
  animation: slideUp 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Add other common animations */
```

### 2. Clean Up Component-Specific CSS Modules

**Goal:** Ensure CSS modules only contain styles that can't be easily done with Tailwind.

**For each component CSS module:**

1. Review all classes
2. Move common patterns to shared modules
3. Replace simple styles with Tailwind classes
4. Keep only complex styles that Tailwind can't handle:
   - Complex gradients with background-clip
   - Advanced animations
   - Complex patterns and backgrounds
   - Advanced pseudo-element styles

**Example - Before:**

```css
/* PetCard.module.css */
.card {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.imageOverlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.2),
    transparent,
    transparent
  );
}
```

**Example - After:**

```css
/* PetCard.module.css */
/* Only keep the complex overlay style */
.imageOverlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.2),
    transparent,
    transparent
  );
}

/* In the component TSX file, use Tailwind for the card */
<div className="rounded-2xl overflow-hidden shadow-md">...</div>
```

### 3. Create Style Constants for Tailwind

For frequently used Tailwind class combinations, create reusable constants:

```tsx
// src/styles/tailwind-constants.ts
export const CARD_STYLES =
  "rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300";
export const BUTTON_STYLES =
  "px-4 py-2 rounded-lg font-medium transition-all duration-300";
export const PRIMARY_BUTTON_STYLES = `${BUTTON_STYLES} bg-primary text-white hover:bg-primary-600`;
export const SECONDARY_BUTTON_STYLES = `${BUTTON_STYLES} bg-secondary/10 text-secondary hover:bg-secondary/20`;
```

Usage:

```tsx
import { CARD_STYLES } from "@/styles/tailwind-constants";

<div className={CARD_STYLES}>...</div>;
```

### 4. Standardize the Use of CSS Variables

**Current state:** Mixture of direct HSL values and CSS variables.

**Solution:** Consistently use CSS variables for colors and other design tokens:

```css
/* Instead of: */
color: hsl(210, 100%, 50%);

/* Use: */
color: hsl(var(--primary));
```

For opacity variations:

```css
/* Instead of: */
color: rgba(0, 0, 0, 0.5);

/* Use: */
color: hsl(var(--primary) / 0.5);
```

### 5. Create a Comprehensive Style Guide Component

Create a visual style guide page to document and showcase UI elements:

```tsx
// src/app/style-guide/page.tsx
export default function StyleGuidePage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">PawHub Style Guide</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="Primary" variable="--primary" />
          <ColorSwatch name="Secondary" variable="--secondary" />
          {/* More colors */}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Typography</h2>
        {/* Typography examples */}
      </section>

      {/* More sections for buttons, cards, forms, etc. */}
    </div>
  );
}

// src/components/style-guide/ColorSwatch.tsx
function ColorSwatch({ name, variable }) {
  const cssVar = `var(${variable})`;

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <div
        className="h-24 w-full"
        style={{ backgroundColor: `hsl(${cssVar})` }}
      ></div>
      <div className="p-3">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{variable}</p>
      </div>
    </div>
  );
}
```

## Advanced Tailwind Optimization

### 1. Custom Utility Classes

For complex utilities that are used often, extend Tailwind's utilities:

```js
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      // existing extensions...
    },
  },
  plugins: [
    // existing plugins...
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-gradient": {
          "background-clip": "text",
          "-webkit-background-clip": "text",
          color: "transparent",
          "-webkit-text-fill-color": "transparent",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
```

Usage:

```html
<h1 class="bg-gradient-to-r from-primary to-secondary text-gradient">
  Gradient Text
</h1>
```

### 2. Component-Specific Plugins

For complex components that need consistent styling, create Tailwind plugins:

```js
// tailwind-plugins/pet-card.js
const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    ".pet-card": {
      borderRadius: "1rem",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "all 300ms",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
      },
    },
    ".pet-card-image": {
      height: "200px",
      width: "100%",
      objectFit: "cover",
    },
    // Add more component-specific styles
  });
});
```

Add to your Tailwind config:

```js
// tailwind.config.ts
module.exports = {
  // ...
  plugins: [
    require("./tailwind-plugins/pet-card"),
    // Other plugins
  ],
};
```

Usage:

```html
<div class="pet-card">
  <img src="..." alt="..." class="pet-card-image" />
  <!-- Content -->
</div>
```

## Implementation Strategy

1. **Start with shared modules:**

   - Create the shared style modules
   - Move common styles to these modules

2. **Clean up component modules one by one:**

   - Start with the most complex components (HeroSection, PetCard)
   - Update imports to use shared styles
   - Replace simple styles with Tailwind classes

3. **Create style constants for common patterns**

4. **Build the style guide page**

## Tips for Effective Tailwind + CSS Modules Usage

1. **Tailwind First:** Try to use Tailwind classes for everything possible
2. **CSS Modules for Complexity:** Use CSS modules only for things Tailwind can't easily do
3. **Avoid Global Styles:** Keep global styles to an absolute minimum
4. **Be Consistent:** Use the same approach throughout the codebase
5. **Document:** Comment complex styles to explain why they're needed

By following these guidelines, you'll maintain a clean, consistent, and maintainable styling approach throughout the PawHub frontend.
