let levels = [];
let currentFilter = "all";

const levelsList = document.getElementById("levelsList");
const noResults = document.getElementById("noResults");
const levelSearch = document.getElementById("levelSearch");
const levelCount = document.getElementById("levelCount");

async function loadLevels() {
    try {
        const response = await fetch("data/levels.json");

        if (!response.ok) {
            throw new Error("Could not load levels.json");
        }

        levels = await response.json();

        levelCount.textContent = levels.length;

        displayLevels();

    } catch (error) {
        console.error("Error loading levels:", error);
    }
}

function displayLevels() {
    levelsList.innerHTML = "";

    levels.forEach(level => {
        const card = document.createElement("article");

        card.className = "level-card";

        card.innerHTML = `
            <div class="rank">
                #${String(level.rank).padStart(2, "0")}
            </div>

            <div class="level-info">
                <h3>${level.name}</h3>
                <p>by ${level.creator}</p>
            </div>

            <div class="difficulty">
                ${level.difficulty}
            </div>
        `;

        levelsList.appendChild(card);
    });
}

loadLevels();