# Upload Guide - Adding New Apps to LITEAPKS.COM Mirror

## Overview

This guide explains how to add new Android apps and games to the LITEAPKS.COM local mirror. Since this is a static mirror of a WordPress site, you'll need to manually create the necessary HTML files and organize assets following the existing structure.

## Prerequisites

- Basic HTML knowledge
- Understanding of the existing directory structure
- App/game information (name, description, version, category)
- App icon (512x512px recommended)
- Screenshots (at least 3-5, recommended size: 1080x1920px)
- APK file (for actual hosting, not included in mirror)

## Directory Structure Reference

```
liteapks.com/
├── apps/                    # Individual app pages
├── games/                   # Individual game pages
├── download/                # Download pages
├── wp-content/
│   └── uploads/
│       ├── 2026/           # Current year uploads
│       │   ├── 01/         # January
│       │   ├── 02/         # February
│       │   └── ...
│       ├── 2025/           # Previous years
│       └── ...
└── apps.html               # Main apps listing page
```

## Step-by-Step Upload Process

### 1. Prepare App Assets

Before creating pages, prepare the following assets:

**App Icon:**
- Size: 512x512px (PNG or WebP format)
- Name: `app-icon.png` (or similar descriptive name)

**Screenshots:**
- Size: 1080x1920px (portrait) or 1920x1080px (landscape)
- Format: PNG or WebP
- Quantity: 3-5 screenshots minimum
- Name: `screenshot-1.png`, `screenshot-2.png`, etc.

### 2. Upload Media Files

Place your media files in the appropriate uploads directory:

```bash
# Navigate to uploads directory
cd liteapks.com/wp-content/uploads/2026/05/  # Adjust month as needed

# Place files here:
# - app-icon.png
# - screenshot-1.png
# - screenshot-2.png
# - etc.
```

**Path format:** `liteapks.com/wp-content/uploads/YYYY/MM/filename.ext`

### 3. Create App Page

Create a new HTML file in the `liteapks.com/apps/` directory for applications or `liteapks.com/games/` for games.

**File Naming Convention:**
- Use lowercase, hyphen-separated names
- Example: `spotify-premium.html`, `minecraft-mod.html`
- Avoid special characters and spaces

**App Page Template:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Name - MOD APK Download | LITEAPKS</title>
    <meta name="description" content="Download App Name MOD APK for Android. Features, version info, and free download link.">
    <!-- Include existing theme CSS -->
    <link rel="stylesheet" href="../wp-content/themes/liteapks/styleb5da.css">
</head>
<body>
    <!-- Main content structure - copy from existing app page -->
    <div class="app-container">
        <div class="app-header">
            <img src="../wp-content/uploads/2026/05/app-icon.png" alt="App Name" class="app-icon">
            <div class="app-info">
                <h1>App Name</h1>
                <p class="app-version">Version: 1.0.0</p>
                <p class="app-category">Category: Music & Audio</p>
            </div>
        </div>
        
        <div class="app-description">
            <h2>About App Name</h2>
            <p>Detailed description of the app and its features...</p>
        </div>
        
        <div class="app-features">
            <h2>Features</h2>
            <ul>
                <li>Feature 1: Description</li>
                <li>Feature 2: Description</li>
                <li>Feature 3: Description</li>
            </ul>
        </div>
        
        <div class="app-screenshots">
            <h2>Screenshots</h2>
            <img src="../wp-content/uploads/2026/05/screenshot-1.png" alt="Screenshot 1">
            <img src="../wp-content/uploads/2026/05/screenshot-2.png" alt="Screenshot 2">
        </div>
        
        <div class="download-section">
            <a href="../download/app-name-version.html" class="download-btn">Download APK</a>
        </div>
    </div>
</body>
</html>
```

**Tip:** Copy an existing app page from `liteapks.com/apps/` and modify it to maintain consistent styling.

### 4. Create Download Page

Create a download page in the `liteapks.com/download/` directory.

**File Naming Convention:**
- Include app name and version
- Example: `spotify-premium-8.8.50.html`

**Download Page Template:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Download App Name v1.0.0 MOD APK | LITEAPKS</title>
    <meta name="description" content="Download App Name MOD APK version 1.0.0 for Android free.">
    <link rel="stylesheet" href="../wp-content/themes/liteapks/styleb5da.css">
</head>
<body>
    <div class="download-container">
        <h1>Download App Name MOD APK</h1>
        
        <div class="download-info">
            <table>
                <tr><td>App Name:</td><td>App Name</td></tr>
                <tr><td>Version:</td><td>1.0.0</td></tr>
                <tr><td>Size:</td><td>50 MB</td></tr>
                <tr><td>Category:</td><td>Music & Audio</td></tr>
                <tr><td>Mod Features:</td><td>Premium Unlocked</td></tr>
            </table>
        </div>
        
        <div class="download-button">
            <a href="path/to/apk/file.apk" class="btn-download">Download Now</a>
            <p class="download-note">Note: APK file not included in static mirror</p>
        </div>
        
        <div class="install-instructions">
            <h2>How to Install</h2>
            <ol>
                <li>Download the APK file</li>
                <li>Enable "Unknown Sources" in settings</li>
                <li>Install the APK</li>
                <li>Enjoy the modded app!</li>
            </ol>
        </div>
    </div>
</body>
</html>
```

### 5. Update Main Listing Pages

Add your new app to the appropriate listing page:

**For Apps:** Edit `liteapks.com/apps.html`
**For Games:** Edit `liteapks.com/games.html`

Add an entry in the apps/games grid following the existing pattern:

```html
<div class="app-card">
    <a href="apps/app-name.html">
        <img src="wp-content/uploads/2026/05/app-icon.png" alt="App Name">
        <h3>App Name</h3>
        <p class="app-category">Music & Audio</p>
    </a>
</div>
```

### 6. Update Homepage (Optional)

If you want the app to appear on the homepage, edit `liteapks.com/index.html` and add it to the featured apps section.

## Content Guidelines

### App Description
- Write clear, concise descriptions
- Highlight key features and mod benefits
- Include version information
- Mention any special requirements (Android version, etc.)

### Categories

**App Categories:**
- Music & Audio
- Video Players & Editors
- Social
- Productivity
- Photography
- Tools
- Communication
- Personalization

**Game Categories:**
- Action
- Adventure
- RPG
- Strategy
- Puzzle
- Racing
- Sports
- Simulation

### Mod Features
Common mod features to mention:
- Premium Unlocked
- No Ads
- Unlimited Money/Gems
- All Levels Unlocked
- Pro Features Free
- Offline Mode

## File Organization Best Practices

1. **Use consistent naming** - lowercase, hyphens only
2. **Organize by date** - use current year/month in uploads
3. **Keep related files together** - app icon and screenshots in same folder
4. **Maintain directory structure** - don't create new top-level directories
5. **Use relative paths** - all links should be relative to maintain portability

## Validation Checklist

Before considering an upload complete:

- [ ] App page created in correct directory (apps/ or games/)
- [ ] Download page created in download/ directory
- [ ] Media files uploaded to wp-content/uploads/YYYY/MM/
- [ ] All image paths are correct and relative
- [ ] App added to apps.html or games.html
- [ ] Links between pages work correctly
- [ ] Page title and meta description added
- [ ] App icon displays correctly
- [ ] Screenshots display correctly
- [ ] Download button points to correct download page

## Common Issues and Solutions

### Images Not Displaying
- **Problem:** Images show as broken links
- **Solution:** Check that file paths are relative and correct. Use `../wp-content/uploads/...` format

### Links Not Working
- **Problem:** Clicking app doesn't navigate correctly
- **Solution:** Ensure all links use relative paths (e.g., `apps/app-name.html` not `/apps/app-name.html`)

### Styling Issues
- **Problem:** Page looks different from others
- **Solution:** Copy the structure from an existing app page and ensure CSS link is correct

## Automation Tips

For frequent uploads, consider:

1. **Create a template file** - Save a blank app page template to copy from
2. **Use a script** - Create a simple script to generate the basic file structure
3. **Batch processing** - Prepare multiple apps at once with consistent naming

## Example: Complete Upload Workflow

Let's say you want to add "Spotify Premium MOD":

```bash
# 1. Create uploads directory for this month
mkdir -p liteapks.com/wp-content/uploads/2026/05

# 2. Place media files
# Copy spotify-icon.png and screenshots to:
# liteapks.com/wp-content/uploads/2026/05/

# 3. Create app page
# Edit liteapks.com/apps/spotify-premium.html
# Use template, fill in details, set image paths

# 4. Create download page
# Edit liteapks.com/download/spotify-premium-8.8.50.html
# Use download template

# 5. Update listing
# Edit liteapks.com/apps.html
# Add Spotify card to the grid

# 6. Test
# Open liteapks.com/apps/spotify-premium.html in browser
# Verify all images load and links work
```

## Support

For issues or questions:
- Check existing app pages as reference
- Verify file paths are correct
- Ensure all required directories exist
- Test in a browser after each major change

## Notes

- This is a static mirror - dynamic features (search, comments) won't work
- APK files are not hosted in this mirror structure
- External links require internet connection
- Maintain consistency with existing pages for best user experience
