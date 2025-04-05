function redirectToMovies() {
    const email = document.getElementById('email').value;

    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email.');
    } else {
        localStorage.setItem('userEmail', email);  
        window.location.href = "movies.html";  
    }
}
// Create a function to render a movie element
function renderMovie(movie, watchlist) {
    const isInWatchlist = watchlist.some(m => m.title === movie.title);
  
    // Create a movie element
    const movieEl = document.createElement('div');
    movieEl.className = 'movie';
  
    // Create movie actions element
    const movieActionsEl = document.createElement('div');
    movieActionsEl.className = 'movie-actions';
  
    // Create watchlist button
    const watchlistBtn = document.createElement('button');
    watchlistBtn.className = 'action-btn';
    watchlistBtn.innerHTML = `
      <i class="fas ${isInWatchlist ? 'fa-bookmark' : 'fa-plus'}"></i>
    `;
    watchlistBtn.addEventListener('click', (event) => toggleWatchlistItem(event, movie));
  
    // Create play trailer button
    const playTrailerBtn = document.createElement('button');
    playTrailerBtn.className = 'action-btn';
    playTrailerBtn.innerHTML = `
      <i class="fas fa-play"></i>
    `;
    playTrailerBtn.addEventListener('click', () => playTrailer(movie.trailer));
  
    // Add buttons to movie actions element
    movieActionsEl.appendChild(watchlistBtn);
    movieActionsEl.appendChild(playTrailerBtn);
  
    // Create movie image element
    const movieImageEl = document.createElement('img');
    movieImageEl.src = movie.image;
    movieImageEl.alt = movie.title;
    movieImageEl.onerror = () => movieImageEl.src = 'placeholder.jpg';
  
    // Create movie content element
    const movieContentEl = document.createElement('div');
    movieContentEl.className = 'movie-content';
  
    // Create movie title element
    const movieTitleEl = document.createElement('h3');
    movieTitleEl.textContent = movie.title;
  
    // Create movie info element
    const movieInfoEl = document.createElement('div');
    movieInfoEl.className = 'movie-info';
  
    // Create movie genre element
    const movieGenreEl = document.createElement('span');
    movieGenreEl.textContent = movie.genre.split(',')[0];
  
    // Create movie rating element
    const movieRatingEl = document.createElement('span');
    movieRatingEl.className = 'movie-rating';
    movieRatingEl.innerHTML = `
      <i class="fas fa-star"></i>
      ${movie.rating}
    `;
  
    // Add elements to movie info element
    movieInfoEl.appendChild(movieGenreEl);
    movieInfoEl.appendChild(movieRatingEl);
  
    // Add elements to movie content element
    movieContentEl.appendChild(movieTitleEl);
    movieContentEl.appendChild(movieInfoEl);
  
    // Add elements to movie element
    movieEl.appendChild(movieActionsEl);
    movieEl.appendChild(movieImageEl);
    movieEl.appendChild(movieContentEl);
  
    // Add event listener to movie element
    movieEl.addEventListener('click', () => showMovieDetails(movie));
  
    return movieEl;
  }
  
  // Render movies
  filtered.forEach(movie => {
    const movieEl = renderMovie(movie, watchlist);
    // Append movie element to the DOM
    document.getElementById('movies-container').appendChild(movieEl);
  });