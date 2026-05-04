const kitData = {
    "NethPot": "1000189822.jpg",
    "Sword": "1000189824.jpg",
    "Axe": "1000189826.jpg",
    "Uhc": "1000189828.jpg",
    "Mace": "1000189830.jpg",
    "Potion": "1000189832.jpg",
    "Crystal": "1000189834.jpg",
    "SMP": "1000189836.jpg"
};

// Kit Menyunun Yaradılması
const kitMenu = document.getElementById('kitMenu');
Object.keys(kitData).forEach(kit => {
    kitMenu.innerHTML += `
        <div class="kit-card" onclick="openKit('${kit}')">
            <img src="${kitData[kit]}" alt="${kit}">
            <h3>${kit}</h3>
        </div>
    `;
});

let players = JSON.parse(localStorage.getItem('pvpPlayers')) || [];

function toggleAdminPanel() {
    const panel = document.getElementById('adminPanel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

function savePlayer() {
    const newPlayer = {
        name: document.getElementById('pName').value,
        region: document.getElementById('pRegion').value,
        kit: document.getElementById('pKit').value,
        tier: document.getElementById('pTier').value
    };

    if(!newPlayer.name) return alert("Ad yazın!");
    
    players.push(newPlayer);
    localStorage.setItem('pvpPlayers', JSON.stringify(players));
    alert("Oyunçu əlavə edildi!");
    toggleAdminPanel();
}

function openKit(kitName) {
    document.getElementById('kitMenu').style.display = 'none';
    document.getElementById('rankingSection').style.display = 'block';
    document.getElementById('currentKitTitle').innerText = kitName + " Sıralaması";
    
    // Tierləri təmizlə
    for(let i=1; i<=5; i++) document.getElementById(`t${i}-list`).innerHTML = "";

    // Oyunçuları yerləşdir
    players.filter(p => p.kit === kitName).forEach(p => {
        let tNum = p.tier.match(/\d/)[0]; // HT1 -> 1
        document.getElementById(`t${tNum}-list`).innerHTML += `
            <div class="player-item">
                <span>${p.name}</span>
                <span style="color:#4ade80">${p.region}</span>
                <b class="${p.tier.includes('1') ? 'gold' : ''}">${p.tier}</b>
            </div>
        `;
    });
}

function backToMenu() {
    document.getElementById('kitMenu').style.display = 'grid';
    document.getElementById('rankingSection').style.display = 'none';
}
