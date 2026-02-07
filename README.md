# 🎬 Movie API Frontend

A modern, responsive web application for managing movies with a sleek Netflix-inspired dark theme. This frontend interfaces with a RESTful movie API to perform full CRUD operations.

## ✨ Features

- **📊 Dashboard Statistics** - View total movies, average ratings, and latest releases at a glance
- **➕ Add Movies** - Create new movie entries with title, description, genre, release year, and rating
- **✏️ Update Movies** - Edit existing movies through an intuitive modal interface
- **🗑️ Delete Movies** - Remove movies with confirmation prompts
- **🔄 Real-time Updates** - Automatic refresh and live API status monitoring
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI** - Dark theme with smooth animations and transitions
- **⚡ Fast & Efficient** - Clean vanilla JavaScript with no framework dependencies

## 🚀 Live Demo

**API Endpoint:** `https://movie-api-production-3803.up.railway.app/api/movies`

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Vanilla JS with async/await
- **Fetch API** - For HTTP requests
- **RESTful API** - Backend integration

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Active internet connection (to connect to the API)
- Optional: Local web server for development

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shudhu7/movie-api-frontend
   cd movie-api-frontend
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser, or
   - Use a local development server:
   
   **Using VS Code:**
   - Install "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

3. **Access the application**
   - Navigate to `http://localhost:8000` (or the port your server uses)

## 📁 Project Structure

```
movie-api-frontend/
│
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # Application logic and API interactions
└── README.md           # Project documentation
```

## 🎯 Usage

### Adding a Movie

1. Fill in the movie details in the "Add New Movie" form
2. Click "Add Movie" button
3. The movie will be added to the database and displayed in the list

### Editing a Movie

1. Click the "✏️ Edit" button on any movie card
2. Update the desired fields in the modal
3. Click "Update Movie" to save changes

### Deleting a Movie

1. Click the "🗑️ Delete" button on any movie card
2. Confirm the deletion in the prompt
3. The movie will be removed from the database

### Refreshing the List

- Click the "🔄 Refresh" button to manually reload all movies
- The list auto-refreshes after add, update, or delete operations

## 🔌 API Integration

### Base URL
```javascript
const API_BASE_URL = "https://movie-api-production-3803.up.railway.app/api/movies";
```

### API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | Fetch all movies |
| POST | `/api/movies` | Create a new movie |
| PUT | `/api/movies/:id` | Update a movie by ID |
| DELETE | `/api/movies/:id` | Delete a movie by ID |

### Movie Object Schema

```javascript
{
  "id": 1,                          // Auto-generated
  "title": "The Shawshank Redemption",
  "description": "Two imprisoned...",
  "genre": "Drama",
  "releaseYear": 1994,
  "rating": 9.3
}
```

## 🎨 Features Breakdown

### Statistics Dashboard
- **Total Movies**: Count of all movies in the database
- **Average Rating**: Calculated from all rated movies
- **Latest Year**: Most recent release year in the collection
- **API Status**: Real-time connection status (Online/Offline)

### Form Validation
- Title is required
- Rating must be between 0-10
- Release year accepts valid years
- Optional fields can be left empty

### User Experience
- Success/error notifications with auto-dismiss
- Loading states during API calls
- Empty state messaging
- Confirmation dialogs for destructive actions
- Collapsible add form to save space
- XSS protection through HTML escaping

## 🎨 Customization

### Changing the Theme Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --primary-color: #e50914;      /* Main accent color */
    --primary-dark: #b20710;       /* Darker accent */
    --bg-color: #141414;           /* Background */
    --card-bg: #1f1f1f;            /* Card backgrounds */
    --text-primary: #ffffff;       /* Primary text */
    --text-secondary: #b3b3b3;     /* Secondary text */
}
```

### Connecting to a Different API

Update the API base URL in `script.js`:

```javascript
const API_BASE_URL = "https://your-api-url.com/api/movies";
```

## 🐛 Troubleshooting

### API Status Shows Offline
- Check your internet connection
- Verify the backend API is running
- Check browser console for CORS errors
- Ensure the API URL is correct

### Movies Not Displaying
- Check browser console for errors
- Verify API response format matches expected schema
- Clear browser cache and reload

### Form Submission Fails
- Ensure all required fields are filled
- Check network tab for request details
- Verify API accepts the data format being sent

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Performance

- Minimal dependencies (vanilla JavaScript)
- Optimized API calls with async/await
- Efficient DOM manipulation
- CSS animations with GPU acceleration
- Responsive images and lazy loading ready

## 🔒 Security

- XSS protection through HTML escaping
- Input validation on client-side
- Confirmation for destructive actions
- Secure HTTPS API connection

## 📝 Future Enhancements

- [ ] Search and filter functionality
- [ ] Sort movies by different criteria
- [ ] Pagination for large datasets
- [ ] Image upload for movie posters
- [ ] User authentication
- [ ] Favorites/watchlist feature
- [ ] Advanced filtering (by genre, year, rating)
- [ ] Export data to CSV/JSON
- [ ] Dark/Light theme toggle
- [ ] Offline support with Service Workers

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

Your Name
- GitHub: [@Shuddhodan Ingale](https://github.com/Shudhu7)
- Email: mr.shudhuingle@gmail.com

## 🙏 Acknowledgments

- Design inspired by Netflix UI
- Icons from emoji set
- API hosted on Railway

## 📞 Support

If you have any questions or run into issues, please:
- Open an issue on GitHub
- Contact via email
- Check the troubleshooting section above

---

**Made with ❤️ and ☕**
