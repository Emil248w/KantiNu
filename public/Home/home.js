const nuværendeBruger = JSON.parse(localStorage.getItem('nuværendeBruger'));
const welcomeText = document.getElementById('welcomeText');
const valgtKantine = document.getElementById('valgtKantine');
const profilbillede = document.getElementById('profilbillede');
const profilDropdown = document.getElementById('profilDropdown');
const logudOption = document.getElementById('logudOption');
const kantineDropdown = document.getElementById('kantineDropdown');

/* Henter nuværende time */
const currentHour = new Date().getHours();
let velkomst;

/* Ændre velkomstbesked afhængig af tidspunktet */
if (currentHour < 12) {
    velkomst = 'Godmorgen';
}
else if (currentHour < 18) {
    velkomst = 'God eftermiddag';
} else {
    velkomst = 'God aften';
}

if (nuværendeBruger && nuværendeBruger.navn) /*Check om en bruger er logget ind*/ {
    /*Vis velkomstbesked med brugerens navn og indstil profilbillede*/
    welcomeText.textContent = `${velkomst} ${nuværendeBruger.navn}!`;
    profilbillede.textContent = nuværendeBruger.navn.charAt(0).toUpperCase();
} else {
    welcomeText.textContent = `${velkomst} Gæst!`;
    profilbillede.textContent = 'G';
}
valgtKantine.textContent = 'Niels Brock NVG ↓';

/* Åbner dropdown hvis du klikker på profilbilledet */
profilbillede.addEventListener('click', () => {
    profilDropdown.classList.toggle('show');
});

/* Lukker dropdown hvis du klikker ved siden af den */
document.addEventListener('click', (event) => {
    if (!profilDropdown.contains(event.target) && !profilbillede.contains(event.target)) {
        profilDropdown.classList.remove('show');
    }
});

/* Log ud */
logudOption.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '../login/login.html';
});

/* Åbner dropdown hvis du klikker på skift-kantine */
valgtKantine.addEventListener('click', () => {
    kantineDropdown.classList.toggle('show');
});

/* Lukker dropdown hvis du klikker ved siden af den */
document.addEventListener('click', (event) => {
    if (!kantineDropdown.contains(event.target) && !valgtKantine.contains(event.target)) {
        kantineDropdown.classList.remove('show');
    }
});