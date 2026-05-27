const characterListDiv = document.getElementById('character-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let allFilms = [];
let currentPage = 1;
const itemsPerPage = 4;

const loadFilms = async () => {
    const response = await fetch('https://swapi.info/api/films');
    allFilms = await response.json();
    renderPage();
};

const renderPage = () => {
    characterListDiv.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const filmsToDisplay = allFilms.slice(startIndex, endIndex);

    filmsToDisplay.forEach((film) => {
        const title = film.title;
        
        const urlSplits = film.url.split('/');
        const id = urlSplits[urlSplits.length - 1];

        const movieImages = {
            "1": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
            "2": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500&q=80",
            "3": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
            "4": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
            "5": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&q=80",
            "6": "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&q=80 font"
        };

        const imageUrl = movieImages[id] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80";

        characterListDiv.innerHTML += `
        <div class="bg-slate-800 border border-slate-700 rounded-2xl shadow-md p-4 hover:scale-105 hover:border-yellow-400 transition duration-300 cursor-pointer">
            <img class="w-full h-80 object-cover rounded-xl mb-4" 
                 src="${imageUrl}" 
                 alt="${title}">
            <h2 class="text-base font-bold text-center text-yellow-400 capitalize">${title}</h2>
        </div>
        `;
    });

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = endIndex >= allFilms.length;

    prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1";
};

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
});

nextBtn.addEventListener('click', () => {
    const maxPages = Math.ceil(allFilms.length / itemsPerPage);
    if (currentPage < maxPages) {
        currentPage++;
        renderPage();
    }
});

loadFilms();