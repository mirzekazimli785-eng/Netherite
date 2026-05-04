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

const kitMenu = document.getElementById('kitMenu');

// Kitləri ekrana çıxarmaq
function loadMenu() {
    kitMenu.innerHTML = "";
    Object.keys(kitData).forEach(kit => {
        kitMenu.innerHTML += `
            <div class="kit-card" onclick="openKit('${kit}')">
                <img src="${kitData[kit]}" alt="${kit}" onerror="this.src='https://via.placeholder.com/60?text=Logo'">
                <h3>${kit}</h3>
            </div>
        `;
    });
}

// Səhifə yüklənəndə menyunu aç
window.onload = loadMenu;

let players = JSON.parse(localStorage.getItem('pvpPlayers')) || [];

function toggleAdminPanel() {
    const panel = document.getElementById('adminPanel');
    panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
}

function savePlayer() {
    const name = document.getElementById('pName').value;
    const region = document.getElementById('pRegion').value;
    const kit = document.getElementById('pKit').value;
    const tier = document.getElementById('pTier').value;

    if(!name) { alert("Zəhmət olmasa oyunçu adını yazın!"); return; }
    
    players.push({name, region, kit, tier});
    localStorage.setItem('pvpPlayers', JSON.stringify(players));
    alert("Oyunçu əlavə edildi!");
    document.getElementById('pName').value = "";
    toggleAdminPanel();
}

function openKit(kitName) {
    document.getElementById('kitMenu').style.display = 'none';
    document.getElementById('rankingSection').style.display = 'block';
    document.getElementById('currentKitTitle').innerText = kitName;
    
    for(let i=1; i<=5; i++) document.getElementById(`t${i}-list`).innerHTML = "";

    players.filter(p => p.kit === kitName).forEach(p => {
        let tNum = p.tier.replace(/\D/g, ""); // HT1 -> 1
        if(tNum >= 1 && tNum <= 5) {
            document.getElementById(`t${tNum}-list`).innerHTML += `
                <div class="player-item">
                    <span>${p.name}</span>
                    <small style="color:#4ade80">${p.region}</small>
                    <b class="${p.tier.includes('1') ? 'gold' : ''}">${p.tier}</b>
                </div>
            `;
        }
    });
}

function backToMenu() {
    document.getElementById('kitMenu').style.display = 'grid';
    document.getElementById('rankingSection').style.display = 'none';
                                                   }
