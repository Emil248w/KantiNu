const tilbagePil = document.getElementById('tilbagePil');
tilbagePil.addEventListener('click', () => {
    window.location.href = '../Kurv/kurv.html';
});

const fortsætKnap = document.querySelector('.fortsæt-knap');
const tidspunktContainer = document.querySelector('.tidspunkt-container');

/* Tidspunkter man kan vælge */
const tidspunkter = [
    '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45'
];

/* Opret tidspunkter som knapper og tilføj dem til tidspunktContainer */
tidspunkter.forEach(tidspunkt => {
    const tidspunktKnap = document.createElement('button');
    tidspunktKnap.className = 'tidspunkt-knap';
    tidspunktKnap.textContent = tidspunkt;
    tidspunktKnap.addEventListener('click', () => {
        /* Fjern valgt klassen fra alle tidspunkter */
        document.querySelectorAll('.tidspunkt-knap').forEach(knap => {
            knap.classList.remove('valgt');
        });
        /* Tilføj valgt klassen til det tidspunkt der bliver klikket på */
        tidspunktKnap.classList.add('valgt');
        /* Gem valgt det valgte tidspunkt i local storage */
        localStorage.setItem('valgtTidspunkt', tidspunkt);
    });
    tidspunktContainer.appendChild(tidspunktKnap);
});

/* Indsæt tidspunkter før fortsæt knap*/
fortsætKnap.parentNode.insertBefore(tidspunktContainer, fortsætKnap);

fortsætKnap.addEventListener('click', () => {
    const valgtTidspunkt = localStorage.getItem('valgtTidspunkt');
    if (valgtTidspunkt) {
        window.location.href = '../Køb/køb.html';
    } else {
        alert('Vælg venligst et tidspunkt for afhentning');
    }
});

    