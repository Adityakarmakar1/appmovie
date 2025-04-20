// Movie data
const movies = [
  { 
    title: "Inception", 
    genre: "Sci-Fi", 
    rating: "8.8", 
    description: "A mind-bending thriller.", 
    poster: "https://via.placeholder.com/150" 
  },
  { 
    title: "The Notebook", 
    genre: "Romance", 
    rating: "7.9", 
    description: "A heartfelt love story.", 
    poster: "https://via.placeholder.com/150" 
  },
  { 
    title: "The Dark Knight", 
    genre: "Action", 
    rating: "9.0", 
    description: "An epic Batman adventure.", 
    poster: "https://via.placeholder.com/150" 
  }
];

// Redirect from login to movies page
function redirectToMovies() {
  const email = document.getElementById('email').value;
  if (email) {
    localStorage.setItem('userEmail', email);
    window.location.href = 'movies.html';
  }
}

// Chatbot functions
function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
}

function clearChat() {
  document.getElementById('chatbot-messages').innerHTML = '';
}

function sendMessage() {
  const input = document.getElementById('user-input');
  const messages = document.getElementById('chatbot-messages');
  const userMsg = input.value.trim();
  
  if (!userMsg) return;

  // Add user message
  messages.innerHTML += `<div class="mb-2 text-right">👤: ${userMsg}</div>`;
  
  // Generate bot response
  const mood = Object.keys(moodGenreMap).find(m => 
    userMsg.toLowerCase().includes(m)
  );
  
  let response;
  if (mood) {
    const genres = moodGenreMap[mood];
    const matchingMovies = movies.filter(movie => 
      genres.some(g => movie.genre.toLowerCase().includes(g.toLowerCase()))
    );
    response = matchingMovies.length > 0 
      ? `🤖 Try these ${mood} movies:<br>${matchingMovies.map(m => `• ${m.title}`).join('<br>')}`
      : "🤖 Sorry, no movies match your mood.";
  } else {
    response = "🤖 Tell me your mood (happy, sad, etc.) or favorite genre!";
  }

  messages.innerHTML += `<div class="mb-2">${response}</div>`;
  input.value = '';
  messages.scrollTop = messages.scrollHeight;
}

// Mood to genre mapping
const moodGenreMap = {
  happy: ["Comedy", "Romance"],
  sad: ["Drama", "Feel-good"], 
  adventurous: ["Action", "Thriller"],
  thoughtful: ["Mystery", "Sci-Fi"]
};

// Initialize when page loads
if (document.getElementById('movie-list')) {
  renderMovies();
}

function renderMovies() {
  const container = document.getElementById('movie-list');
  container.innerHTML = movies.map(movie => `
    <div class="movie-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <img src="${movie.poster}" alt="${movie.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold">${movie.title}</h3>
        <p class="text-sm text-gray-500">${movie.genre}</p>
        <p class="text-sm mt-2">${movie.description}</p>
        <div class="flex items-center mt-2">
          <span class="text-yellow-500">⭐ ${movie.rating}</span>
        </div>
      </div>
    </div>
  `).join('');
}
