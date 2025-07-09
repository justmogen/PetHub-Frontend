# PurrfectPaws Design System

A comprehensive, modern design system for the PurrfectPaws pet marketplace built with Tailwind CSS and Next.js.

## 🎨 Design Philosophy

Our design system is built around the concept of connecting families with their perfect pet companions. Every design decision reflects warmth, trust, professionalism, and joy.

### Core Values

- **Warmth & Friendliness**: Inviting colors and soft, rounded corners
- **Trust & Reliability**: Professional typography and consistent spacing
- **Accessibility First**: WCAG 2.1 AA compliant color contrasts and focus states
- **Mobile Responsive**: Mobile-first approach with progressive enhancement

## 🎯 Brand Identity

### Primary Brand Colors

```css
/* Primary Orange - Main brand color */
--primary: #E07A5F (18° 95% 67%)
/* Warm, energetic, friendly */

/* Secondary Teal - Trust & nature */
--secondary: #81B29A (154° 34% 56%)
/* Calming, trustworthy, natural */

/* Accent Gold - Premium quality */
--accent: #F4A460 (39° 77% 67%)
/* Warm, premium, inviting */

/* Neutral Brown - Earthy & reliable */
--neutral: #8B7355 (30° 26% 44%)
/* Grounded, stable, natural */
```

### Extended Palette

Each brand color includes a full 50-900 scale for consistent theming:

- `brand.primary.50` through `brand.primary.900`
- `brand.secondary.50` through `brand.secondary.900`
- `brand.accent.50` through `brand.accent.900`
- `brand.neutral.50` through `brand.neutral.900`

## 📐 Typography System

### Font Family

- **Primary**: Inter (Google Fonts)
- **Fallback**: ui-sans-serif, system-ui, sans-serif

### Font Sizes (Mobile-First)

```css
text-xs:   12px (0.75rem)   - Small labels, captions
text-sm:   14px (0.875rem)  - Body text on mobile
text-base: 16px (1rem)      - Body text on desktop
text-lg:   18px (1.125rem)  - Large body text, small headings
text-xl:   20px (1.25rem)   - Subheadings
text-2xl:  24px (1.5rem)    - Card titles
text-3xl:  30px (1.875rem)  - Section headings
text-4xl:  36px (2.25rem)   - Page headings
text-5xl:  48px (3rem)      - Hero text (mobile)
text-6xl:  60px (3.75rem)   - Hero text (tablet)
text-7xl:  72px (4.5rem)    - Hero text (desktop)
```

### Font Weights

- `normal`: 400 - Regular body text
- `medium`: 500 - Emphasized text
- `semibold`: 600 - Headings, labels
- `bold`: 700 - Hero text, strong emphasis
- `extrabold`: 800 - Display text

## 🔄 Spacing System (8px Grid)

All spacing follows an 8px grid system for visual consistency:

```css
space-1:  4px   (0.25rem)  - Tight spacing
space-2:  8px   (0.5rem)   - Base unit
space-4:  16px  (1rem)     - Standard spacing
space-6:  24px  (1.5rem)   - Medium spacing
space-8:  32px  (2rem)     - Large spacing
space-12: 48px  (3rem)     - Section spacing
space-16: 64px  (4rem)     - Page-level spacing
```

## 🎯 Component Patterns

### Cards

```css
.card: Basic card with shadow and border
.card-interactive: Hover effects for clickable cards
.card-glass: Glassmorphism effect
.pet-card: Specific styling for pet listings
.category-card: Category selection cards
.stats-card: Statistics display cards
```

### Buttons

```css
.btn-brand-primary: Main CTA button with gradient
.btn-brand-secondary: Secondary teal button
.btn-brand-outline: Outline style button
```

### Layout

```css
.container-responsive: Responsive container with padding
.section-padding: Consistent section spacing
.responsive-grid-{2,3,4,6}: Responsive grid layouts
```

## 🎭 Animation System

### Animation Classes

```css
.animate-fade-in-up: Fade in with upward motion
.animate-scale-in: Scale in animation
.animate-slide-in-right: Slide from right
.animate-float: Gentle floating animation
.animate-bounce-gentle: Subtle bounce
.animate-pulse-gentle: Subtle pulse effect
```

### Hover Effects

```css
.hover-lift: Lift on hover
.hover-glow: Glow effect on hover
.hover-scale: Scale on hover
```

## 🎨 Gradient System

### Brand Gradients

```css
.gradient-brand: Primary orange to accent gold
.gradient-brand-soft: Soft version with opacity
.gradient-nature: Secondary teal to success green
.gradient-warm: Primary orange to warning amber
.gradient-text-brand: Text gradient for headings
```

## 📱 Responsive Design

### Breakpoints

```css
sm:  640px  - Small tablets
md:  768px  - Tablets
lg:  1024px - Laptops
xl:  1280px - Desktops
2xl: 1536px - Large screens
```

### Mobile-First Approach

All components are designed mobile-first with progressive enhancement:

1. **Mobile** (320px-639px): Single column, compact spacing
2. **Tablet** (640px-1023px): Two columns, medium spacing
3. **Desktop** (1024px+): Multi-column, generous spacing

## 🎯 Accessibility Features

### Focus States

- All interactive elements have visible focus rings
- Focus rings use brand colors with proper contrast
- Keyboard navigation supported throughout

### Color Contrast

- All text meets WCAG 2.1 AA standards (4.5:1 ratio)
- Interactive elements meet enhanced contrast requirements
- Dark mode support included

### Motion Preferences

- Respects `prefers-reduced-motion` for accessibility
- Animations can be disabled via system preferences

## 🧩 Usage Guidelines

### Component Composition

1. Start with base Tailwind classes
2. Apply component classes for consistency
3. Add utility classes for customization
4. Use animation classes sparingly for delight

### Best Practices

- Use semantic HTML elements
- Implement proper ARIA labels
- Maintain color contrast ratios
- Test with keyboard navigation
- Validate responsive behavior

## 📚 File Structure

```
src/
├── app/
│   └── globals.css          # Main design system CSS
├── styles/
│   └── design-system.css    # Component-specific styles
└── tailwind.config.ts       # Tailwind configuration
```

### Import Order

1. Tailwind directives
2. Global design system variables
3. Component styles
4. Utility classes
5. Animation keyframes

## 🎨 Color Usage Guidelines

### Primary Orange (#E07A5F)

- Primary CTA buttons
- Brand elements
- Important highlights
- Interactive states

### Secondary Teal (#81B29A)

- Secondary buttons
- Success states
- Nature-themed elements
- Calming sections

### Accent Gold (#F4A460)

- Premium features
- Highlight elements
- Warning states (light version)
- Badge accents

### Neutral Brown (#8B7355)

- Text on light backgrounds
- Border elements
- Subtle backgrounds
- Natural themes

## 🔧 Customization

To extend or modify the design system:

1. **Colors**: Add new brand colors to `tailwind.config.ts`
2. **Components**: Create new classes in `design-system.css`
3. **Animations**: Add keyframes to the animation system
4. **Spacing**: Follow the 8px grid system
5. **Typography**: Maintain the responsive scale

## 📖 Examples

### Button Usage

```tsx
// Primary CTA
<button className="btn-brand-primary">
  Adopt Now 🐾
</button>

// Secondary action
<button className="btn-brand-secondary">
  Learn More
</button>

// Outline style
<button className="btn-brand-outline">
  Contact Us
</button>
```

### Card Usage

```tsx
// Interactive pet card
<div className="pet-card group">
  <img className="pet-card-image" src="..." alt="..." />
  <div className="p-6">
    <h3 className="text-lg font-semibold">Pet Name</h3>
  </div>
</div>
```

### Typography Usage

```tsx
// Hero heading with gradient
<h1 className="hero-title">
  Find Your Perfect Companion
</h1>

// Section heading
<h2 className="section-title">
  Featured Pets
</h2>

// Body text
<p className="section-subtitle">
  Discover loving pets looking for their forever homes.
</p>
```

This design system ensures consistency, accessibility, and maintainability across the entire PurrfectPaws platform while providing flexibility for future enhancements.
