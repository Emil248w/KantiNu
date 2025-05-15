/* Tilføj klik til tilbage pil */
const tilbagePil = document.getElementById('tilbagePil');
tilbagePil.addEventListener('click', () => {
    window.location.href = '../Bestil/bestil.html';
});

/* Tilføj klik til tidspunkt knap */
const tidspunktKnap = document.getElementById('tidspunktKnap');
tidspunktKnap.addEventListener('click', () => {
    window.location.href = '../Vælg tidspunkt/tidspunkt.html';
});

/* Hent produkter fra local storage */
const kurvProdukter = JSON.parse(localStorage.getItem('kurv_produkter'));
let samletPris = Number(localStorage.getItem('kurv_samletPris'));

/* Funktion til at opdatere samlet pris og localStorage */
function opdaterKurv() {
    let nySamletPris = 0;
    let nySamletKvantitet = 0;
    kurvProdukter.forEach(produkt => {
        nySamletPris += produkt.pris * produkt.kvantitet;
        nySamletKvantitet += produkt.kvantitet;
    });
    samletPris = nySamletPris;
    localStorage.setItem('kurv_samletPris', samletPris);
    localStorage.setItem('kurv_samletKvantitet', nySamletKvantitet);
    localStorage.setItem('kurv_produkter', JSON.stringify(kurvProdukter));
    
    // Opdater visning af samlet pris
    samletPrisVisning.textContent = samletPris;

    // Hvis kurven er tom, genindlæs siden
    if (nySamletKvantitet === 0) {
        window.location.reload();
    }
}

/* Vis hvert produkt */
const produkterContainer = document.getElementById('produkter-container');
const samletPrisVisning = document.getElementById('samletPrisVisning');
kurvProdukter.forEach((produkt, index) => {
    const produktDiv = document.createElement('div');
    produktDiv.className = 'produkt-item';

    const produktBillede = document.createElement('img');
    produktBillede.src = produkt.billede.replace('public/', '../');
    produktBillede.className = 'produkt-billede';
    produktDiv.appendChild(produktBillede);

    const produktIndhold = document.createElement('div');
    produktIndhold.className = 'produkt-indhold';

    const produktTitel = document.createElement('h2');
    produktTitel.textContent = produkt.ret;
    produktTitel.className = 'produkt-titel';

    const produktPris = document.createElement('p');
    produktPris.textContent = `${produkt.pris} kr.`;
    produktPris.className = 'produkt-pris';

    const produktTotal = document.createElement('p');
    produktTotal.textContent = `Total: ${produkt.pris * produkt.kvantitet} kr.`;
    produktTotal.className = 'produkt-total';

    produktIndhold.appendChild(produktTitel);
    produktIndhold.appendChild(produktPris);
    produktIndhold.appendChild(produktTotal);
    produktDiv.appendChild(produktIndhold);

    /* Tilføj container til kvantitets knapper */
    const knapperContainer = document.createElement('div');
    knapperContainer.className = 'knapper-container';

    const kvantitetKnapper = document.createElement('div');
    kvantitetKnapper.className = 'kvantitet-knapper';

    const minusKnap = document.createElement('button');
    minusKnap.textContent = '-';
    minusKnap.className = 'kvantitet-knap-minus';
    
    const kvantitetVis = document.createElement('span');
    kvantitetVis.textContent = produkt.kvantitet;
    kvantitetVis.className = 'kvantitet-vis';
    
    const plusKnap = document.createElement('button');
    plusKnap.textContent = '+';
    plusKnap.className = 'kvantitet-knap-plus';

    /* Tilføj funktion til kvantitet knapper */
    minusKnap.addEventListener('click', () => {
        if (produkt.kvantitet > 1) {
            produkt.kvantitet--;
            kvantitetVis.textContent = produkt.kvantitet;
            produktTotal.textContent = `Total: ${produkt.pris * produkt.kvantitet} kr.`;
            opdaterKurv();
        } else {
            /* Fjern produktet hvis kvantiteten bliver 0 */
            kurvProdukter.splice(index, 1);
            produktDiv.remove();
            opdaterKurv();
        }
    });

    plusKnap.addEventListener('click', () => {
        produkt.kvantitet++;
        kvantitetVis.textContent = produkt.kvantitet;
        produktTotal.textContent = `Total: ${produkt.pris * produkt.kvantitet} kr.`;
        opdaterKurv();
    });

    kvantitetKnapper.appendChild(minusKnap);
    kvantitetKnapper.appendChild(kvantitetVis);
    kvantitetKnapper.appendChild(plusKnap);

    knapperContainer.appendChild(kvantitetKnapper);

    produktDiv.appendChild(knapperContainer);

    produkterContainer.appendChild(produktDiv);
});

opdaterKurv();

/* Funktion til at rydde kurven */
const rydKurvKnap = document.getElementById('rydKurvKnap');
rydKurvKnap.addEventListener('click', () => {
    localStorage.removeItem('kurv_produkter');
    localStorage.removeItem('kurv_samletPris');
    localStorage.removeItem('kurv_samletKvantitet');
    window.location.href = '../Bestil/bestil.html';
});
