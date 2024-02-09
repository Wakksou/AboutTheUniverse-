let tableau = document.querySelector('.scrollable-table tbody');
// RECUPERER LES PLANETES
let planetes = []; 

let fetchPromises = [];

for (let i = 1; i <= 6; i++) {
    fetchPromises.push(
        fetch("https://swapi.dev/api/planets/?page=" + i)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(planete => {
                let planeteData = {
                    nom: planete.name,
                    terrain: planete.terrain,
                    population: planete.population,
                    diametre: planete.diameter,
                    gravite: planete.gravity,
                    climat: planete.climate
                    };
                planetes.push(planeteData);
            });
        })
    );
}

Promise.all(fetchPromises).then(() => {
    // Ici, toutes les planètes ont été chargées
    planetes.forEach(planete => {
        ajouterLigneAuTableau(planete.nom, planete.terrain);
    });
    document.getElementById("resultats").innerHTML = planetes.length + " Résultat(s)";
}).catch(error => console.error('Erreur lors du chargement des planètes:', error));


let derniereLigneSelectionnee = null;

function ajouterLigneAuTableau(nom, terrain) {
    let ligne = document.createElement('tr');
    ligne.className = 'infos';

    let celluleNom = document.createElement('td');
    celluleNom.textContent = nom;
    ligne.appendChild(celluleNom);

    let celluleTerrain = document.createElement('td');
    celluleTerrain.textContent = terrain;
    ligne.appendChild(celluleTerrain);

    ligne.addEventListener('click', function() {
        let article2 = document.querySelector('.article2');
        if (derniereLigneSelectionnee) {
            // Réinitialiser la couleur de la dernière ligne sélectionnée
            derniereLigneSelectionnee.style.backgroundColor = ''; // Ou la couleur par défaut
            derniereLigneSelectionnee.style.color = ''; // Ou la couleur par défaut
        }

        // Mettre à jour la couleur de la ligne actuellement sélectionnée
        this.style.backgroundColor = 'blue';
        this.style.color = 'white';
        derniereLigneSelectionnee = this;
        article2.style.visibility = 'visible';
        afficherDetailsPlanete(nom);
    });

    tableau.appendChild(ligne);
}

// FILTRER PAR NOMBRE
let categoryType = document.getElementById("create-listing-category-type");
categoryType.addEventListener('change', function () {
    let categoryTypeOption = categoryType.options[categoryType.selectedIndex].value;
    switch (categoryTypeOption) {
        case 'filtre' : 
        triage(planetes , 0);
        break;
        case 'filtre1':
            triage(planetes , 100000);
        break;
        case 'filtre2':
            triage(planetes , 1000000);
        break;
        case 'filtre3':
            triage(planetes , 100000000);
        break;
    }
});

async function triage(planetes , population) {
    viderTableau();
    compteur = 0; // Compteur pour les planètes qui correspondent au critère
    for (i=0 ; i<=planetes.length ; i ++){
        if (!isNaN(planetes[i].population) && planetes[i].population < population) {
            // console.log("Planète: " + planetes[i].nom + ", Population: " + planetes[i].population);
            ajouterLigneAuTableau(planetes[i].nom , planetes[i].terrain)
            compteur++;
        }
        if (population === 0){
            ajouterLigneAuTableau(planetes[i].nom , planetes[i].terrain)
            compteur++;
        }
        document.getElementById("resultats").innerHTML = compteur + " R&eacute;sultat(s)";
    }
};

function viderTableau() {
    while (tableau.firstChild) {
        tableau.removeChild(tableau.firstChild);
    }
}


// INFO PLANETES
function afficherDetailsPlanete(nomPlanete) {
    let planete = planetes.find(p => p.nom === nomPlanete);
    if (planete) {
        document.getElementById("nom").innerHTML = planete.nom;
        document.getElementById("climat").innerHTML = planete.climat;
        document.getElementById("diametre").innerHTML = planete.diametre;
        document.getElementById("gravite").innerHTML = planete.gravite;
        document.getElementById("terrain").innerHTML = planete.terrain;
        document.getElementById("population").innerHTML = planete.population;
        if ( planete.nom == "unknown"){
            document.getElementById("nom").innerHTML = "inconnu";
        }
        if ( planete.climat == "unknown"){
            document.getElementById("climat").innerHTML = "inconnu";
        }
        if ( planete.diametre == "unknown"){
            document.getElementById("diametre").innerHTML = "inconnu";
        }
        if ( planete.gravite == "unknown"){
            document.getElementById("gravite").innerHTML = "inconnu";
        }
        if ( planete.terrain == "unknown"){
            document.getElementById("terrain").innerHTML = "inconnu";
        }
        if ( planete.population == "unknown"){
            document.getElementById("population").innerHTML = "inconnu";
        }
    } else {
        document.getElementById("nom").innerHTML = "Planète non trouvée";
    }
}

function EcouteurClick(cellule) {
    cellule.addEventListener('click', function() {
        // Réinitialiser la dernière cellule sélectionnée
        if (derniereCelluleSelectionnee) {
            derniereCelluleSelectionnee.classList.remove('cellule-selectionnee');
            derniereCelluleSelectionnee.classList.add('cellule');
        }

        // Mettre à jour la cellule actuellement sélectionnée
        cellule.classList.remove('cellule');
        cellule.classList.add('cellule-selectionnee');
        derniereCelluleSelectionnee = cellule;
    });
}