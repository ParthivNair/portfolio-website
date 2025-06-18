# GitHub Pages Deployment Guide

This portfolio website is configured for automatic deployment to GitHub Pages using GitHub Actions.

## Setup Instructions

### 1. Repository Settings

1. Go to your GitHub repository settings
2. Navigate to **Pages** section (usually under "Code and automation")
3. Under **Source**, select **GitHub Actions**

### 2. Environment Variables (Optional)

If you're using the admin panel, you may want to set up environment variables:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add any required environment variables as repository secrets

### 3. Deployment Process

The deployment is automatic:

- Push to the `main` branch triggers the deployment workflow
- The workflow builds the static site and deploys it to GitHub Pages
- Your site will be available at: `https://[username].github.io/[repository-name]`

## Manual Deployment

If you want to deploy manually:

```bash
# Build the static export
npm run build

# The built files will be in the 'out' directory
# You can upload these files to any static hosting service
```

## Configuration Details

The project is configured with:

- **Static Export**: Next.js builds a fully static site
- **Image Optimization**: Disabled for static hosting compatibility
- **Trailing Slashes**: Enabled for better GitHub Pages compatibility
- **GitHub Actions**: Automated deployment workflow

## Troubleshooting

- **Build Errors**: Check the Actions tab in your GitHub repository for detailed error logs
- **404 Errors**: Ensure all internal links use relative paths
- **Images Not Loading**: Verify image paths are correct and images exist in the public directory

## Files Added/Modified for Deployment

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `next.config.js` - Updated with static export configuration
- `public/.nojekyll` - Prevents Jekyll processing on GitHub Pages
