const characterListDiv = document.getElementById('character-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let allCharacters = [];
let currentPage = 1;

const itemsPerPage = 8;

const defaultSpaceImage = "./default.png";

// PERSONAJES CON IMAGENES ROTAS
const brokenImages = [
    "Roos Tarpals",
    "Rugor Nass",
    "Adi Gallia",
    "Saesee Tiin",
    "Yarael Poof",
    "Ric Olié",
    "Ben Quadinaros",
    "Mace Windu",
    "Wedge Antilles",
    "Lobot",
    "Mon Mothma",
    "Shmi Skywalker",
    "Ratts Tyerell",
    "Gasgano",
    "Cordé",
    "Luminara Unduli",
    "Dormé",
    "Dexter Jettster",
    "Sly Moore",
    "Tion Medon",
    "Finn"
];

async function loadCharacters() {

    try {

        const response = await fetch(
            'https://akabab.github.io/starwars-api/api/all.json'
        );

        allCharacters = await response.json();

        renderPage();

    } catch (error) {

        console.error(error);
    }
}

function renderPage() {

    characterListDiv.innerHTML = '';

    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const endIndex =
        startIndex + itemsPerPage;

    const characters =
        allCharacters.slice(startIndex, endIndex);

    characters.forEach(character => {

        let imageUrl = character.image;

        // REEMPLAZAR IMAGENES ROTAS
        if (
            brokenImages.includes(character.name) ||
            !imageUrl
        ) {
            imageUrl = defaultSpaceImage;
        }

        characterListDiv.innerHTML += `

            <div class="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-md p-4 hover:scale-105 hover:border-yellow-400 transition duration-300 cursor-pointer flex flex-col justify-between">

                <div>

                    <img
                        class="w-full h-80 object-cover object-top rounded-xl mb-4 bg-slate-950"
                        src="${imageUrl}"
                        alt="${character.name}"

                        onerror="
                            this.onerror=null;
                            this.src='./default.png';
                        "
                    >

                    <h2 class="text-base font-bold text-center text-yellow-400 capitalize">
                        ${character.name}
                    </h2>

                </div>

                <div class="text-slate-400 text-xs text-center mt-3 border-t border-slate-700 pt-2">

                    <p>
                        <span class="text-slate-500">
                            Especie:
                        </span>

                        ${character.species || 'Desconocido'}
                    </p>

                    <p>
                        <span class="text-slate-500">
                            Origen:
                        </span>

                        ${character.homeworld || 'Desconocido'}
                    </p>

                </div>

            </div>
        `;
    });

    prevBtn.disabled = currentPage === 1;

    nextBtn.disabled =
        endIndex >= allCharacters.length;
}

prevBtn.addEventListener('click', () => {

    if (currentPage > 1) {

        currentPage--;

        renderPage();
    }
});

nextBtn.addEventListener('click', () => {

    const maxPages =
        Math.ceil(allCharacters.length / itemsPerPage);

    if (currentPage < maxPages) {

        currentPage++;

        renderPage();
    }
});

loadCharacters();