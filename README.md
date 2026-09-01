# MakTech Doors - Product Catalog Management System

A professional door sales website with dynamic product upload and showcase features. Upload your door images and details to create a professional online catalog that persists using browser local storage.

## Features

✅ **Product Upload** - Add door products with images, descriptions, prices, and specifications

🖼️ **Dynamic Gallery** - Professional product showcase with hover effects and smooth animations

🔍 **Search & Filter** - Search doors by name/description and filter by category

💾 **Local Storage** - All products are saved automatically in browser local storage

📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices

🎨 **Professional Branding** - Navy blue and red color scheme matching MakTech identity

📊 **Product Management** - View detailed information, edit, and delete products

🏆 **Modal View** - Expanded view of door details in an elegant modal popup

## Door Categories

- Steel Security Doors
- Wooden Doors
- Glass Doors
- Sliding Doors
- Aluminum Doors
- Smart Lock Doors
- Other

## How to Use

### Adding a Door

1. Navigate to the "Upload Door" section
2. Fill in the door details:
   - **Door Name** - Name of the door product
   - **Category** - Select from available categories
   - **Price** - Price in USD
   - **Color** - Door color (optional)
   - **Description** - Detailed description of features and specifications
   - **Image** - Upload or drag & drop your door image (PNG, JPG, GIF - Max 5MB)
3. Click "Add Door to Catalog"
4. Your door will appear in the gallery instantly

### Viewing Your Catalog

1. Scroll to the "Door Catalog" section
2. Browse all your products in a professional grid layout
3. Use the search box to find specific doors
4. Filter by category using the category dropdown
5. Click "View Details" to see full information in an expanded view

### Managing Products

- **View Details** - Click the "View Details" button to see complete product information
- **Delete** - Click the "Delete" button to remove a product (with confirmation)
- **Search** - Use the search box to find doors by name or description
- **Filter** - Select a category to show only doors in that category

## Data Persistence

All your door products are automatically saved to your browser's local storage. This means:
- Products persist even after closing the browser
- Each browser/device has its own storage
- No server or database required
- Storage limit is typically 5-10MB (enough for hundreds of products)

## File Structure

```
maktech-doors-catalog/
├── index.html          # Main HTML file with form and gallery
├── css/
│   └── style.css       # Professional styling
├── js/
│   └── app.js          # Product management logic
├── README.md           # Documentation
└── .nojekyll           # GitHub Pages configuration
```

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Responsive design and animations
- **JavaScript (ES6+)** - DoorManager class with local storage API
- **Local Storage API** - For persistent data storage

## Customization

### Change Colors

Edit `css/style.css` to change the color scheme:
- Primary color (Navy): `#1a2a3a`
- Accent color (Red): `#ff4444`

### Add More Categories

Edit the `<select>` options in `index.html`:

```html
<option value="Your Category">Your Category</option>
```

### Modify Form Fields

Add new fields in both HTML and JavaScript to capture additional product information.

## Deploying with GitHub Pages

1. Push your code to GitHub
2. Go to repository **Settings**
3. Scroll to **GitHub Pages**
4. Select **main** branch as source
5. Your site will be live at: `https://yourusername.github.io/maktech-doors-catalog/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Example Products

To get started, try adding:

1. **Steel Security Door Pro**
   - Category: Steel Security
   - Price: $499.99
   - Color: Black
   - Description: High-security steel door with reinforced frame and certified fire-rated system.

2. **Elegant Wooden Door**
   - Category: Wooden
   - Price: $349.99
   - Color: Walnut Brown
   - Description: Premium wooden door with classic design, perfect for residential entrances.

3. **Modern Glass Door**
   - Category: Glass
   - Price: $399.99
   - Color: Clear
   - Description: Contemporary glass door design, ideal for storefronts and modern interiors.

## Troubleshooting

**Products not saving?**
- Check if local storage is enabled in your browser
- Clear browser cache and try again
- Use an incognito/private window to test

**Images not displaying?**
- Ensure file size is under 5MB
- Supported formats: PNG, JPG, GIF
- Check browser console for errors

**Storage full?**
- Local storage limit is typically 5-10MB
- If full, consider exporting/backing up data
- Delete old/unused products

## Contact

**MakTech Doors**
- Phone: 263 789 009 829
- Email: sales@maktechdoors.com
- Hours: Monday - Saturday, 8 AM - 7 PM
- Location: Harare ,Westgate 58 Purley Way 

## License

This project is owned by maktechsolutions . All rights reserved.

---

**MakTech Doors** - Security. Style. Durability.
