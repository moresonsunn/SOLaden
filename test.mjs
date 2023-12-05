function aktuellesJahr() {
    const heute = new Date();
    const jahr = heute.getFullYear();
    return jahr;
  }
  
  // Beispielaufruf der Funktion
const aktuellesJahrErgebnis = aktuellesJahr();
console.log(aktuellesJahrErgebnis);