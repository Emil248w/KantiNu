import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { getAuth, connectAuthEmulator } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

console.log('Starting Firebase initialization...');

const firebaseConfig = {
    apiKey: "AIzaSyC4Q-uR370PZx_wm99X9cK-T9r0Q8RpNJg",
    authDomain: "kantine-app-92977.firebaseapp.com",
    projectId: "kantine-app-92977",
    storageBucket: "kantine-app-92977.appspot.com",
    messagingSenderId: "118119411445",
    appId: "1:118119411445:web:44b49ce1bb951250e31fbc"
};

let auth;
let db;
let app;

try {
    console.log('Initializing Firebase app...');
    app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized successfully');

    console.log('Getting Auth instance...');
    auth = getAuth(app);
    console.log('Auth instance obtained');

    console.log('Getting Firestore instance...');
    db = getFirestore(app);
    console.log('Firestore instance obtained');
} catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
}

export { app, db, auth };