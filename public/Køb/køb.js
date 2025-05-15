import { db } from '../firebase/firebase.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const tilbagePil = document.getElementById('tilbagePil');
        tilbagePil.addEventListener('click', () => {
            window.location.href = '../Vælg tidspunkt/tidspunkt.html';
        });

 /* Hent produkter fra local storage */
 const kurvProdukter = JSON.parse(localStorage.getItem('kurv_produkter'));
 let samletPris = Number(localStorage.getItem('kurv_samletPris'));

 /* Funktion til at kurv i localStorage */
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
     
     /* Opdater visning af samlet pris */
     samletPrisVisning.textContent = samletPris;
 }

 /* Vis hvert produkt i kurven */
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
     produkterContainer.appendChild(produktDiv);
 });

 opdaterKurv();

 /* Funktion til at gennemføre bestillingen og oprette en ordre i databasen */
 const nuværendeBruger = JSON.parse(localStorage.getItem('nuværendeBruger'));
 const valgtTidspunkt = localStorage.getItem('valgtTidspunkt');
 const gennemførBestillingKnap = document.getElementById('gennemfør-bestilling-knap');
 const betalingsmetodeSelect = document.getElementById('betalingsmetode');
 const ordreVarer = kurvProdukter.map(item => ({
     ret: item.ret,
     kvantitet: item.kvantitet
 }));
     gennemførBestillingKnap.addEventListener('click', async () => {
         const valgtBetalingsmetode = betalingsmetodeSelect.value;
         await addDoc(collection(db, 'ordre'), {
            Afhentet: false,
            Navn: nuværendeBruger.navn,
             BrugerID: nuværendeBruger.uid,
             KlarTidspunkt: valgtTidspunkt,
             Betalingsmetode: valgtBetalingsmetode,
             Ordre: ordreVarer,
             Pris: samletPris,
         });
 
         /* Ryd kurv fra localStorage */
         localStorage.removeItem('kurv_produkter');
         localStorage.removeItem('kurv_samletPris');
         localStorage.removeItem('kurv_samletKvantitet');
 
         /* Omdiriger til home.html */
         window.location.href = '../Home/home.html';

         alert('Bestilling gennemført!');
     });