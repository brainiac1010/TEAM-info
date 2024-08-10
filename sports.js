function loadAllTeams() {
    const url = `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayInfo(data.teams))
        .catch(error => console.error('Error fetching data:', error));
}

function loadInfo() {
    const teamName = document.getElementById('teamInput').value;
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${teamName}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayInfo(data.teams))
        .catch(error => console.error('Error fetching data:', error));
}

function displayInfo(infos) {
    const displayContainer = document.getElementById('container');
    displayContainer.innerHTML = '';

    if (infos && infos.length > 0) {
        for (const info of infos) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('team-card', 'p-4', 'rounded', 'shadow', 'mb-4', 'transition', 'transform');
            newDiv.innerHTML = `
                <h4 class="text-lg font-bold mb-2">Team ID: ${info.idTeam}</h4>
                <p class="text-blue-600 font-semibold mb-1">Team Name: ${info.strTeam}</p>
                
                <img src="${info.strBadge}" alt="${info.strTeam} Badge" class="w-24 mx-auto mt-2 mb-2">
                <img src="${info.strLogo}" alt="${info.strTeam} Logo" class="w-24 mx-auto mt-2 mb-2">
                <img src="${info.strEquipment}" alt="${info.strTeam} Equipment" class="w-24 mx-auto mt-2 mb-2">
                <p class="more-info" onclick="toggleInfo(this)">More Info</p>
                <div class="more-info-content">
                <p class="mb-1">Stadium: ${info.strStadium}</p>
                <p class="mb-1">League: ${info.strLeague}</p>
                <p class="mb-1">Capacity: ${info.intStadiumCapacity}</p>
                <p class="mb-1">Location: ${info.strLocation}</p>
                    <p>Website: <a href="${info.strWebsite}" target="_blank" class="text-blue-600">${info.strWebsite}</a></p>
                    <p>Founded: ${info.intFormedYear}</p> <p>Youtube: ${info.strYoutube}</p>
                    <p>Description: ${info.strDescriptionEN.slice(0,150)}</p>
                   
                </div>
            `;
            displayContainer.appendChild(newDiv);
        }
    } else {
        displayContainer.innerHTML = '<p class="text-red-500">No team found. Please try another search.</p>';
    }
}

function toggleInfo(element) {
    const content = element.nextElementSibling;
    if (content.style.display === 'block') {
        content.style.display = 'none';
        element.textContent = 'More Info';
    } else {
        content.style.display = 'block';
        element.textContent = 'Less Info';
    }
}

// Load all teams by default when the page loads
window.onload = loadAllTeams;
