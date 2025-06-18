# Image Management System

This folder contains all images for your portfolio website. The images are organized into subfolders for better organization.

## Folder Structure

```
public/img/
├── profile/     # Profile pictures, avatars, headshots
├── projects/    # Project preview images, screenshots
├── general/     # Backgrounds, icons, logos, etc.
└── README.md    # This file
```

## How to Use

### 1. Add Images

Place your images in the appropriate subfolder:

- **Profile pictures**: `public/img/profile/`
- **Project previews**: `public/img/projects/`
- **General images**: `public/img/general/`

### 2. Update the Image Registry

After adding images, update `src/lib/images.ts` to register them:

```typescript
// Example: Adding a profile picture
export const profileImages = {
  avatar: `${IMG_BASE_PATH}/profile/my-avatar.jpg`,
  headshot: `${IMG_BASE_PATH}/profile/professional-headshot.png`,
} as const;
```

### 3. Use Images in Components

Import and use images in your React components:

```tsx
import { images, getImagePath } from '@/lib/images';
import Image from 'next/image';

// Method 1: Using the images object
<Image
  src={images.profile.avatar}
  alt="Profile Avatar"
  width={200}
  height={200}
/>

// Method 2: Using the utility function
<Image
  src={getImagePath('my-image.jpg', 'profile')}
  alt="My Image"
  width={300}
  height={200}
/>

// Method 3: Direct path (for one-off images)
<Image
  src="/img/general/hero-background.jpg"
  alt="Hero Background"
  fill
/>
```

## Best Practices

1. **Use descriptive filenames**: `professional-headshot.jpg` instead of `IMG_001.jpg`
2. **Optimize images**: Use appropriate formats (WebP for photos, SVG for icons)
3. **Consistent naming**: Use kebab-case for filenames (`my-project-preview.jpg`)
4. **Register frequently used images**: Add them to `images.ts` for type safety
5. **Use Next.js Image component**: Always use `next/image` for better performance

## Supported Formats

- JPEG/JPG (photos)
- PNG (images with transparency)
- SVG (icons, logos)
- WebP (optimized photos)
- GIF (animations)

## Example Usage in Different Pages

### About Page

```tsx
import { images } from "@/lib/images";

<Image
  src={images.profile.headshot}
  alt="Professional headshot"
  width={400}
  height={400}
/>;
```

### Projects Page

```tsx
import { images } from "@/lib/images";

<Image
  src={images.project.portfolioPreview}
  alt="Portfolio project preview"
  width={600}
  height={400}
/>;
```
