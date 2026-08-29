let players = [];

// Load player data
async function loadPlayers() {
    try {
        const response = await fetch("data/players.json");

        if (!response.ok) {
            throw new Error("Could not load players.json");
        }

        players = await response.json();

        // Sort by points, highest first
        players.sort((a, b) => b.points - a.points);

        displayPodium();
        displayPlayers(players);

    } catch (error) {
        console.error("Error loading players:", error);

        const leaderboard = document.getElementById("leaderboard");

        if (leaderboard) {
            leaderboard.innerHTML = `
                <div class="error-message">
                    Failed to load player data.
                </div>
            `;
        }
    }
}


// Top 3 players
function displayPodium() {
    const podium = document.getElementById("podium");

    if (!podium || players.length < 3) return;

    const topThree = players.slice(0, 3);

    podium.innerHTML = `
        <div class="podium-player second">
            <div class="podium-place">2</div>
            <img src="${topThree[1].avatar}" alt="${topThree[1].name}">
            <h2>${topThree[1].name}</h2>
            <p>${topThree[1].points.toLocaleString()} points</p>
        </div>

        <div class="podium-player first">
            <div class="podium-place">1</div>
            <img src="${topThree[0].avatar}" alt="${topThree[0].name}">
            <h2>${topThree[0].name}</h2>
            <p>${topThree[0].points.toLocaleString()} points</p>
        </div>

        <div class="podium-player third">
            <div class="podium-place">3</div>
            <img src="${topThree[2].avatar}" alt="${topThree[2].name}">
            <h2>${topThree[2].name}</h2>
            <p>${topThree[2].points.toLocaleString()} points</p>
        </div>
    `;
}


// Display leaderboard
function displayPlayers(playerList) {
    const leaderboard = document.getElementById("leaderboard");

    if (!leaderboard) return;

    leaderboard.innerHTML = "";

    playerList.forEach((player, index) => {
        const rank = index + 1;

        const playerCard = document.createElement("div");
        playerCard.className = "player-card";

        playerCard.innerHTML = `
            <div class="player-rank">
                #${rank}
            </div>

            <img
                class="player-avatar"
                src="${player.avatar}"
                alt="${player.name}"
            >

            <div class="player-info">
                <h3>${player.name}</h3>
                <span>${player.country || "Unknown"}</span>
            </div>

            <div class="player-stats">
                <div>
                    <strong>${player.points.toLocaleString()}</strong>
                    <span>Points</span>
                </div>

                <div>
                    <strong>${player.levelsCompleted}</strong>
                    <span>Levels</span>
                </div>
            </div>
        `;

        leaderboard.appendChild(playerCard);
    });
}


// Search players
function searchPlayers() {
    const searchInput = document.getElementById("playerSearch");

    if (!searchInput) return;

    const search = searchInput.value.toLowerCase().trim();

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(search)
    );

    displayPlayers(filteredPlayers);
}


// Start everything
document.addEventListener("DOMContentLoaded", () => {

    loadPlayers();

    const searchInput = document.getElementById("playerSearch");

    if (searchInput) {
        searchInput.addEventListener("input", searchPlayers);
    }

});