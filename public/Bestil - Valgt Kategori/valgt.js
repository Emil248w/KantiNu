/* Tilføj klik til tilbage pil */
const tilbagePil = document.getElementById('tilbagePil');
tilbagePil.addEventListener('click', () => {
    window.location.href = '../Bestil/bestil.html';
});

const valgtKategoriData = JSON.parse(localStorage.getItem('valgtKategoriRetter'));
const retterContainer = document.querySelector('.retter-container');
const kategoriHeader = document.getElementById('kategoriHeader');

/* Vis titel på kategori */
kategoriHeader.textContent = valgtKategoriData.kategori;

/* Vis retter/produkter */
valgtKategoriData.retter.forEach(ret => {
    const retDiv = document.createElement('div');
    retDiv.className = 'ret-item';

    const retBillede = document.createElement('img');
    retBillede.src = ret.billede.replace('public/', '../');
    retBillede.className = 'ret-billede';
    retDiv.appendChild(retBillede);

    const retIndhold = document.createElement('div');
    retIndhold.className = 'ret-indhold';

    const retTitel = document.createElement('h2');
    retTitel.textContent = ret.ret;
    retTitel.className = 'ret-titel';

    const retPris = document.createElement('p');
    retPris.textContent = `${ret.pris} kr.`;
    retPris.className = 'ret-pris';

    retIndhold.appendChild(retTitel);
    retIndhold.appendChild(retPris);
    retDiv.appendChild(retIndhold);

    /* Tilføj knapper container til kvantitets knapper */
    const knapperContainer = document.createElement('div');
    knapperContainer.className = 'knapper-container';

    const kvantitetKnapper = document.createElement('div');
    kvantitetKnapper.className = 'kvantitet-knapper';

    const minusKnap = document.createElement('button');
    minusKnap.textContent = '-';
    minusKnap.className = 'kvantitet-knap-minus';
    
    const kvantitetVis = document.createElement('span');
    kvantitetVis.textContent = '1';
    kvantitetVis.className = 'kvantitet-vis';
    
    const plusKnap = document.createElement('button');
    plusKnap.textContent = '+';
    plusKnap.className = 'kvantitet-knap-plus';

    let kvantitet = 1;
    minusKnap.addEventListener('click', () => {
        if (kvantitet > 1) {
            kvantitet--;
            kvantitetVis.textContent = kvantitet;
        }
    });

    plusKnap.addEventListener('click', () => {
        kvantitet++;
        kvantitetVis.textContent = kvantitet;
    });

    kvantitetKnapper.appendChild(minusKnap);
    kvantitetKnapper.appendChild(kvantitetVis);
    kvantitetKnapper.appendChild(plusKnap);

    /* Tilføj til kurv knap */
    const tilføjKnap = document.createElement('button');
    tilføjKnap.textContent = 'Tilføj til kurv';
    tilføjKnap.className = 'tilføj-knap';
    tilføjKnap.onclick = function() {
        let samletPris = Number(localStorage.getItem('kurv_samletPris')) || 0;
        let samletKvantitet = Number(localStorage.getItem('kurv_samletKvantitet')) || 0;
        samletPris += ret.pris * kvantitet;
        samletKvantitet += kvantitet;
        
        localStorage.setItem('kurv_samletPris', samletPris);
        localStorage.setItem('kurv_samletKvantitet', samletKvantitet);
        
        let kurvProdukter = JSON.parse(localStorage.getItem('kurv_produkter')) || [];
        
        /* Check om produktet allerede findes i kurven */
        const eksisterendeProduktIndex = kurvProdukter.findIndex(produkt => produkt.ret === ret.ret);
        if (eksisterendeProduktIndex !== -1) {
            /* Hvis det gør så opdater kvantiteten */
            kurvProdukter[eksisterendeProduktIndex].kvantitet += kvantitet;
        } else {
            /* Hvis ikke så opret et nyt produkt */
            kurvProdukter.push({
                ret: ret.ret,
                billede: ret.billede,
                pris: ret.pris,
                kvantitet: kvantitet
            });
        }
        localStorage.setItem('kurv_produkter', JSON.stringify(kurvProdukter));
        
        opdaterGåTilKurv();
        tilføjKnap.textContent = 'Tilføjet!';
        setTimeout(() => {
            tilføjKnap.textContent = 'Tilføj til kurv';
        }, 1500);
    };

    knapperContainer.appendChild(kvantitetKnapper);
    knapperContainer.appendChild(tilføjKnap);
    retDiv.appendChild(knapperContainer);

    retterContainer.appendChild(retDiv);
});

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