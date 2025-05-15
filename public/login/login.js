import { auth, db } from '../firebase/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

/* Vent på at firebase authentication er klar */
let authInitialized = false;
auth.onAuthStateChanged(() => {
    authInitialized = true;
});

/* Login formular */
const loginFormular = document.getElementById('login-formular');
loginFormular.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const adgangskode = document.getElementById('login-adgangskode').value;

    if (!email || !adgangskode) {
        alert('Udfyld venligst både email og adgangskode');
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, adgangskode);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        if (userDoc.exists()) {
            /* Gem brugerens oplysninger i local storage */
            const brugerObj = {
                uid: userCredential.user.uid,
                navn: userDoc.data().fuldtNavn,
                email: userDoc.data().email
            };
            localStorage.setItem('nuværendeBruger', JSON.stringify(brugerObj));
        }
    
        window.location.href = '../Home/home.html';

        /* Ryd kurv fra local storage */
        localStorage.removeItem('kurv_produkter');
        localStorage.removeItem('kurv_samletPris');
        localStorage.removeItem('kurv_samletKvantitet');
        
        loginFormular.reset();
    } catch (error) {
        alert('De intastede oplysninger er ikke korrekte');
    }
});


/* Opretelses formular */
const opretelsesFormular = document.getElementById('opretelses-formular');
let loader = false;

opretelsesFormular.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!authInitialized) {
        alert('Vent venligst mens systemet indlæses...');
        return;
    }

    if (loader) return; /* Undgå at en formular bliver insendt flere gange */
    loader = true;

    try {   
        const navn = document.getElementById('opret-navn').value;
        const email = document.getElementById('opret-email').value;
        const adgangskode = document.getElementById('opret-adgangskode').value;
        const bekræftAdgangskode = document.getElementById('opret-bekræft-adgangskode').value;
        
        if (!navn || !email || !adgangskode || !bekræftAdgangskode) {
            alert('Alle felter skal udfyldes');
            return;
        }
        
        if (adgangskode !== bekræftAdgangskode) {
            alert('Adgangskoderne matcher ikke');
            return;
        }
        
        if (adgangskode.length < 6) {
            alert('Adgangskoden skal være mindst 6 tegn');
            return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, adgangskode);

        await setDoc(doc(db, 'users', userCredential.user.uid), {
            fuldtNavn: navn,
            email: email,
            admin: false,
            createdAt: new Date().toISOString()
        });
        
        alert('Din bruger er blevet oprettet! Du kan nu logge ind.');
        opretelsesFormular.reset();
        
    } finally {
        loader = false;
    }
});

/* Skift mellem login og opretelses formular */
document.getElementById('vis-login').addEventListener('click', () => {
    document.getElementById('login-formular').classList.remove('skujlt');
    document.getElementById('opretelses-formular').classList.add('skujlt');
    document.getElementById('vis-login').style.borderBottom = '2px solid #1c5491';
    document.getElementById('vis-signup').style.borderBottom = '2px solid #ccc';
});

document.getElementById('vis-signup').addEventListener('click', () => {
    document.getElementById('opretelses-formular').classList.remove('skujlt');
    document.getElementById('login-formular').classList.add('skujlt');
    document.getElementById('vis-signup').style.borderBottom = '2px solid #1c5491';
    document.getElementById('vis-login').style.borderBottom = '2px solid #ccc';
});

/* Sæt login formular til aktiv */
document.getElementById('vis-login').style.borderBottom = '2px solid #1c5491';