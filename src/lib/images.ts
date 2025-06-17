/**
 * Image path utilities for easy image management
 * Place all images in the public/img folder and reference them here
 */

// Base path for images
const IMG_BASE_PATH = '/img';

// Profile images
export const profileImages = {
  // Add your profile pictures here
  // Example: avatar: `${IMG_BASE_PATH}/profile/avatar.jpg`,
  // Example: headshot: `${IMG_BASE_PATH}/profile/headshot.png`,
  pfp: `${IMG_BASE_PATH}/profile/pfp.jpg`,
  pfp2: `${IMG_BASE_PATH}/profile/about_pfp.jpg`,
} as const;

// Project preview images
export const projectImages = {
  // Add your project preview images here
  // Example: portfolioPreview: `${IMG_BASE_PATH}/projects/portfolio-preview.jpg`,
  // Example: ecommercePreview: `${IMG_BASE_PATH}/projects/ecommerce-preview.png`,
} as const;

// General images (icons, backgrounds, etc.)
export const generalImages = {
  // Add general images here
  // Example: heroBackground: `${IMG_BASE_PATH}/backgrounds/hero-bg.jpg`,
  // Example: logoLight: `${IMG_BASE_PATH}/logos/logo-light.svg`,
  // Example: logoDark: `${IMG_BASE_PATH}/logos/logo-dark.svg`,
} as const;

// Utility function to get image path
export const getImagePath = (imageName: string, category?: 'profile' | 'project' | 'general') => {
  if (category) {
    switch (category) {
      case 'profile':
        return `${IMG_BASE_PATH}/profile/${imageName}`;
      case 'project':
        return `${IMG_BASE_PATH}/projects/${imageName}`;
      case 'general':
        return `${IMG_BASE_PATH}/general/${imageName}`;
    }
  }
  return `${IMG_BASE_PATH}/${imageName}`;
};

// All images combined for easy access
export const images = {
  profile: profileImages,
  project: projectImages,
  general: generalImages,
} as const; 