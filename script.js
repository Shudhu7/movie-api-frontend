// API Configuration
const API_BASE_URL =
  "https://movie-api-production-3803.up.railway.app/api/movies";

// State Management
let currentMovies = [];

// DOM Elements
const elements = {
  addMovieForm: document.getElementById("addMovieForm"),
  updateMovieForm: document.getElementById("updateMovieForm"),
  moviesList: document.getElementById("moviesList"),
  loadingSpinner: document.getElementById("loadingSpinner"),
  emptyState: document.getElementById("emptyState"),
  messageContainer: document.getElementById("messageContainer"),
  updateModal: document.getElementById("updateModal"),
  closeModal: document.getElementById("closeModal"),
  cancelUpdate: document.getElementById("cancelUpdate"),
  refreshBtn: document.getElementById("refreshBtn"),
  toggleForm: document.getElementById("toggleForm"),
  toggleIcon: document.getElementById("toggleIcon"),
  totalMovies: document.getElementById("totalMovies"),
  avgRating: document.getElementById("avgRating"),
  latestYear: document.getElementById("latestYear"),
  apiStatus: document.getElementById("apiStatus"),
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
  setupEventListeners();
});

// Initialize Application
async function initializeApp() {
  await checkApiStatus();
  await fetchMovies();
}

// Setup Event Listeners
function setupEventListeners() {
  // Form submissions
  elements.addMovieForm.addEventListener("submit", handleAddMovie);
  elements.updateMovieForm.addEventListener("submit", handleUpdateMovie);

  // Modal controls
  elements.closeModal.addEventListener("click", closeModal);
  elements.cancelUpdate.addEventListener("click", closeModal);
  elements.updateModal.addEventListener("click", (e) => {
    if (e.target === elements.updateModal) closeModal();
  });

  // Refresh button
  elements.refreshBtn.addEventListener("click", fetchMovies);

  // Toggle form
  elements.toggleForm.addEventListener("click", toggleAddForm);

  // Close messages on click
  elements.messageContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("message")) {
      e.target.remove();
    }
  });
}

// Check API Status
async function checkApiStatus() {
  try {
    const response = await fetch(API_BASE_URL);
    if (response.ok) {
      elements.apiStatus.textContent = "Online";
      elements.apiStatus.classList.add("online");
      elements.apiStatus.classList.remove("offline");
    } else {
      throw new Error("API not responding");
    }
  } catch (error) {
    elements.apiStatus.textContent = "Offline";
    elements.apiStatus.classList.add("offline");
    elements.apiStatus.classList.remove("online");
    showMessage(
      "API is currently offline. Please check the backend server.",
      "error",
    );
  }
}

// Fetch All Movies
async function fetchMovies() {
  showLoading(true);

  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    currentMovies = await response.json();
    displayMovies(currentMovies);
    updateStats(currentMovies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    showMessage(
      "Failed to load movies. Please check your connection.",
      "error",
    );
    elements.moviesList.innerHTML =
      '<p style="text-align: center; color: #b3b3b3;">Failed to load movies. Please try again.</p>';
  } finally {
    showLoading(false);
  }
}

// Display Movies
function displayMovies(movies) {
  if (!movies || movies.length === 0) {
    elements.moviesList.innerHTML = "";
    elements.emptyState.style.display = "block";
    return;
  }

  elements.emptyState.style.display = "none";

  elements.moviesList.innerHTML = movies
    .map(
      (movie) => `
        <div class="movie-card" data-id="${movie.id}">
            <div class="movie-header">
                <div>
                    <h3 class="movie-title">${escapeHtml(movie.title)}</h3>
                </div>
                <span class="movie-id">ID: ${movie.id}</span>
            </div>
            
            <div class="movie-meta">
                ${
                  movie.genre
                    ? `
                    <span class="meta-item">
                        <span class="icon">🎭</span>
                        ${escapeHtml(movie.genre)}
                    </span>
                `
                    : ""
                }
                
                ${
                  movie.releaseYear
                    ? `
                    <span class="meta-item">
                        <span class="icon">📅</span>
                        ${movie.releaseYear}
                    </span>
                `
                    : ""
                }
                
                ${
                  movie.rating !== null && movie.rating !== undefined
                    ? `
                    <span class="movie-rating">⭐ ${movie.rating}/10</span>
                `
                    : ""
                }
            </div>
            
            ${
              movie.description
                ? `
                <p class="movie-description">${escapeHtml(movie.description)}</p>
            `
                : ""
            }
            
            <div class="movie-actions">
                <button class="btn-edit" onclick="openUpdateModal(${movie.id})">
                    ✏️ Edit
                </button>
                <button class="btn-delete" onclick="deleteMovie(${movie.id}, '${escapeHtml(movie.title)}')">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `,
    )
    .join("");
}

// Update Statistics
function updateStats(movies) {
  // Total movies
  elements.totalMovies.textContent = movies.length;

  // Average rating
  const validRatings = movies.filter(
    (m) => m.rating !== null && m.rating !== undefined,
  );
  if (validRatings.length > 0) {
    const avgRating =
      validRatings.reduce((sum, m) => sum + m.rating, 0) / validRatings.length;
    elements.avgRating.textContent = avgRating.toFixed(1);
  } else {
    elements.avgRating.textContent = "N/A";
  }

  // Latest release year
  const validYears = movies.filter(
    (m) => m.releaseYear !== null && m.releaseYear !== undefined,
  );
  if (validYears.length > 0) {
    const latestYear = Math.max(...validYears.map((m) => m.releaseYear));
    elements.latestYear.textContent = latestYear;
  } else {
    elements.latestYear.textContent = "N/A";
  }
}

// Handle Add Movie
async function handleAddMovie(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const movieData = {
    title: formData.get("title"),
    description: formData.get("description") || null,
    genre: formData.get("genre") || null,
    releaseYear: formData.get("releaseYear")
      ? parseInt(formData.get("releaseYear"))
      : null,
    rating: formData.get("rating") ? parseFloat(formData.get("rating")) : null,
  };

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(data.message || "Movie added successfully!", "success");
      e.target.reset();
      await fetchMovies();
    } else {
      throw new Error(data.message || "Failed to add movie");
    }
  } catch (error) {
    console.error("Error adding movie:", error);
    showMessage(
      error.message || "Failed to add movie. Please try again.",
      "error",
    );
  }
}

// Open Update Modal
async function openUpdateModal(id) {
  const movie = currentMovies.find((m) => m.id === id);

  if (!movie) {
    showMessage("Movie not found", "error");
    return;
  }

  // Populate form
  document.getElementById("updateId").value = movie.id;
  document.getElementById("updateTitle").value = movie.title;
  document.getElementById("updateDescription").value = movie.description || "";
  document.getElementById("updateGenre").value = movie.genre || "";
  document.getElementById("updateReleaseYear").value = movie.releaseYear || "";
  document.getElementById("updateRating").value = movie.rating || "";

  // Show modal
  elements.updateModal.classList.add("active");
}

// Close Modal
function closeModal() {
  elements.updateModal.classList.remove("active");
  elements.updateMovieForm.reset();
}

// Handle Update Movie
async function handleUpdateMovie(e) {
  e.preventDefault();

  const id = document.getElementById("updateId").value;
  const formData = new FormData(e.target);

  const movieData = {
    title: formData.get("title"),
    description: formData.get("description") || null,
    genre: formData.get("genre") || null,
    releaseYear: formData.get("releaseYear")
      ? parseInt(formData.get("releaseYear"))
      : null,
    rating: formData.get("rating") ? parseFloat(formData.get("rating")) : null,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(data.message || "Movie updated successfully!", "success");
      closeModal();
      await fetchMovies();
    } else {
      throw new Error(data.message || "Failed to update movie");
    }
  } catch (error) {
    console.error("Error updating movie:", error);
    showMessage(
      error.message || "Failed to update movie. Please try again.",
      "error",
    );
  }
}

// Delete Movie
async function deleteMovie(id, title) {
  if (!confirm(`Are you sure you want to delete "${title}"?`)) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(data.message || "Movie deleted successfully!", "success");
      await fetchMovies();
    } else {
      throw new Error(data.message || "Failed to delete movie");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    showMessage(
      error.message || "Failed to delete movie. Please try again.",
      "error",
    );
  }
}

// Toggle Add Form
function toggleAddForm() {
  const form = elements.addMovieForm;
  const icon = elements.toggleIcon;

  if (form.classList.contains("collapsed")) {
    form.classList.remove("collapsed");
    icon.textContent = "▼";
    icon.classList.remove("rotated");
  } else {
    form.classList.add("collapsed");
    icon.textContent = "▲";
    icon.classList.add("rotated");
  }
}

// Show Loading Spinner
function showLoading(show) {
  elements.loadingSpinner.style.display = show ? "block" : "none";
  elements.moviesList.style.display = show ? "none" : "grid";
}

// Show Message
function showMessage(message, type = "info") {
  const messageEl = document.createElement("div");
  messageEl.className = `message ${type}`;

  const icon = type === "success" ? "✓" : type === "error" ? "✗" : "ℹ";
  messageEl.innerHTML = `<span style="font-size: 1.2rem;">${icon}</span> ${message}`;

  elements.messageContainer.appendChild(messageEl);

  // Auto remove after 5 seconds
  setTimeout(() => {
    messageEl.style.animation = "slideInRight 0.3s ease reverse";
    setTimeout(() => messageEl.remove(), 300);
  }, 5000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Make functions globally accessible
window.openUpdateModal = openUpdateModal;
window.deleteMovie = deleteMovie;
