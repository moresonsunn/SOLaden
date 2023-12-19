function tageDifferenz(datum1, datum2) {
  // Millisekunden pro Tag
  var millisekundenProTag = 24 * 60 * 60 * 1000;

  // Differenz in Tagen berechnen
  var differenzInTage = Math.floor((datum2 - datum1) / millisekundenProTag);

  return differenzInTage;
}

// Beispieldaten: 1. Januar 2023 und 15. Januar 2023
var startDatum = new Date(2023, 0, 1); // Monate sind 0-basiert (Januar = 0)
var endDatum = new Date(2023, 0, 15);

// Differenz in Tagen berechnen
var differenzInTage = tageDifferenz(startDatum, endDatum);

// Ausgabe der Differenz
console.log('Anzahl der Tage zwischen den Daten: ' + differenzInTage + ' Tage');