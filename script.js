document.addEventListener('DOMContentLoaded', () => {
    const matchesContainer = document.getElementById('matches-container');
    const fetchButton = document.getElementById('fetch-matches');
    const apiKey = '5d82988e0fa014eb320d78cca51c0cee'; 

    async function fetchMatches() {
        const url = 'https://v3.football.api-sports.io/fixtures?date=2024-12-08'; 

        try {
            matchesContainer.innerHTML = '<p>Loading matches...</p>'; 
            const response = await fetch(url, {
                headers: {
                    'x-rapidapi-host': 'v3.football.api-sports.io',
                    'x-rapidapi-key': apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const data = await response.json();
            displayMatches(data.response);
        } catch (error) {
            matchesContainer.innerHTML = `<p class="error">${error.message}</p>`;
        }
    }

    function displayMatches(matches) {
        matchesContainer.innerHTML = ''; 

        matches.forEach(match => {
            const matchElement = document.createElement('div');
            matchElement.classList.add('match');
            matchElement.innerHTML = `
                <h2>${match.teams.home.name} vs ${match.teams.away.name}</h2>
                <p>Date: ${new Date(match.fixture.date).toLocaleString()}</p>
                <p>League: ${match.league.name}</p>
                <p>Venue: ${match.fixture.venue.name || 'Unknown'}</p>
            `;
            matchesContainer.appendChild(matchElement);
        });
    }

   
    fetchButton.addEventListener('click', fetchMatches);
});
