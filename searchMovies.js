// searchMovies.js - Handles searching movies from OMDb API and rendering results
import { OMDB_API_KEY, renderMovies, searchMovies as sharedSearchMovies } from "./shared.js";

let currentResults = [];
function setCurrentResults(results) {
  currentResults = results;
}

// Use the shared searchMovies function
function searchMovies(query) {
  sharedSearchMovies(query, renderMovies, OMDB_API_KEY, setCurrentResults);
}


// Hide/show search results logic for searchmovies.html
// This block handles closing the search results section with the close button, Escape key, or clicking outside

document.addEventListener('DOMContentLoaded', function() {
  const resultsSection = document.getElementById('search-results-section');
  const closeBtn = document.getElementById('close-search-list');
  const movieList = document.getElementById('movie-list');
  const searchInput = document.getElementById('search-input');

  function hideResults() {
    if (resultsSection) resultsSection.style.display = 'none';
  }
  function showResults() {
    if (resultsSection) resultsSection.style.display = '';
  }
  if (closeBtn) closeBtn.onclick = hideResults;

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') hideResults();
  });

  document.addEventListener('click', function(e) {
    if (resultsSection && searchInput && !resultsSection.contains(e.target) && !searchInput.contains(e.target)) {
      hideResults();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', showResults);
    searchInput.addEventListener('focus', showResults);
  }

  // Show results when movies are rendered
  const observer = new MutationObserver(() => {
    showResults();
  });
  if (movieList) {
    observer.observe(movieList, { childList: true });
  }
});

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
if (searchBtn && searchInput) {
  searchBtn.onclick = () => {
    searchMovies(searchInput.value);
  };
  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
}
