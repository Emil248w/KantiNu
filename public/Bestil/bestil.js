import { db } from '../firebase/firebase.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

/* Hent alle dokumenter fra "mad" i databasen */
async function hentMadCollection() {
        const madCollection = collection(db, 'mad');
        const madSnapshot = await getDocs(madCollection); /* Henter  alle dokumenter fra "mad"*/
        const madList = madSnapshot.docs.map(doc => ({      /*Konvereterer dokumenterne til et array af objekter*/
            id: doc.id,
            ...doc.data()        /* Henter data fra hvert dokument */
        }));
        
        visKategorier(madList);
}

/*Vis kategorierne fra "mad"*/
function visKategorier(Kategorier) {
    const container = document.querySelector('.kategori-container');
    
    Kategorier.forEach(kategori => {
        const kategoriDiv = document.createElement('div'); /*Laver en div til hver kategori*/
        kategoriDiv.className = 'kategori-item';
        
        const img = document.createElement('img'); /* Tilføjer billede til hver kategori */
        img.src = kategori.billede.replace('public/', '../');
        img.className = 'kategori-billede';
        
        const titel = document.createElement('h2'); /* Tilføjer titel til hver kategori */
        titel.textContent = kategori.kategori;
        titel.className = 'kategori-titel';
        
        kategoriDiv.appendChild(img);
        kategoriDiv.appendChild(titel);
        container.appendChild(kategoriDiv);

        kategoriDiv.addEventListener('click', async () => {         /* Når der klikkes på en kategori, hentes retter fra den kategori */
                /* Henter retter under collectionen */
                const retterCollection = collection(db, 'mad', kategori.id, 'retter');
                const retterSnapshot = await getDocs(retterCollection); /* Henter  alle dokumenter fra "mad"*/
                const retterList = retterSnapshot.docs.map(doc => ({      /*Konvereterer dokumenterne til et array af objekter*/
                    id: doc.id,
                    ...doc.data()        /* Henter data fra hvert dokument */
                }));

                /* Gemmer retterne i local storage */
                localStorage.setItem('valgtKategoriRetter', JSON.stringify({
                    kategori: kategori.kategori,
                    retter: retterList
                }));

                window.location.href = '../Bestil - Valgt Kategori/valgt.html';
        });
    });
}

hentMadCollection();

/* Gå til kurv knap */
const gåTilKurvDiv = document.getElementById('gåTilKurvBtn');
gåTilKurvDiv.addEventListener('click', () => {
    window.location.href = '../Kurv/kurv.html';
});
function opdaterGåTilKurv() {
    let samletPris = Number(localStorage.getItem('kurv_samletPris')) || 0;
    let samletKvantitet = Number(localStorage.getItem('kurv_samletKvantitet')) || 0;
    gåTilKurvDiv.innerHTML = `Gå Til Kurv - ${samletPris} kr.`;
    gåTilKurvDiv.hidden = samletKvantitet === 0;
}
opdaterGåTilKurv();

/* Tilføj klik til tilbage pil */
const tilbagePil = document.getElementById('tilbagePil');
tilbagePil.addEventListener('click', () => {
    window.location.href = '../Home/home.html';
});