const characterListDiv = document.getElementById('character-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let allCharacters = [];
let currentPage = 1;
const itemsPerPage = 8;

const defaultSpaceImage = "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=500&q=80"; 

const loadCharacters = async () => {
    try {
        const response = await fetch('https://akabab.github.io/starwars-api/api/all.json');
        allCharacters = await response.json();
        renderPage();
    } catch (error) {
        console.error("Error al cargar los datos de la API:", error);
    }
};

const renderPage = () => {
    characterListDiv.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const charactersToDisplay = allCharacters.slice(startIndex, endIndex);

    charactersToDisplay.forEach((character) => {
        const name = character.name;
        let imageUrl = character.image;

        if (!imageUrl || imageUrl.trim() === "" || imageUrl.includes('null') || imageUrl.includes('placeholder')) {
            imageUrl = defaultSpaceImage;
        }

        characterListDiv.innerHTML += `
        <div class="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-md p-4 hover:scale-105 hover:border-yellow-400 transition duration-300 cursor-pointer flex flex-col justify-between">
            <div>
                <img class="w-full h-80 object-cover object-top rounded-xl mb-4 bg-slate-950" 
                     src="${imageUrl}" 
                     alt="${name}"
                     onerror="this.onerror=null; this.src='${defaultSpaceImage}';">
                <h2 class="text-base font-bold text-center text-yellow-400 capitalize">${name}</h2>
            </div>
            <div class="text-slate-400 text-xs text-center mt-3 border-t border-slate-700 pt-2">
                <p><span class="text-slate-500">Especie:</span> ${character.species || 'Humano'}</p>
                <p><span class="text-slate-500">Origen:</span> ${character.homeworld || 'Desconocido'}</p>
            </div>
        </div>
        `;
    });

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = endIndex >= allCharacters.length;

    prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1";
};

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

nextBtn.addEventListener('click', () => {
    const maxPages = Math.ceil(allCharacters.length / itemsPerPage);
    if (currentPage < maxPages) {
        currentPage++;
        renderPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

loadCharacters();