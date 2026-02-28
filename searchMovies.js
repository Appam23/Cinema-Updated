// searchMovies.js - Handles searching movies from OMDb API and rendering results


async function searchMovies(query) {
  if (!query.trim()) {
    renderMovies([]);
    return;
  }
  const resp = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query.trim())}`);
  const data = await resp.json();
  if (data.Search) {
    currentResults = data.Search;
    renderMovies(data.Search);
  } else {
    currentResults = [];
    renderMovies([]);
  }
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
