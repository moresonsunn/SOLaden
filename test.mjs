function formatiereDatum(date) {
  var tag = date.getDate();
  var monat = date.getMonth() + 1; // Monate sind von 0 bis 11 indiziert
  var jahr = date.getFullYear();

  // Füge führende Nullen hinzu, wenn nötig
  tag = (tag < 10) ? "0" + tag : tag;
  monat = (monat < 10) ? "0" + monat : monat;

  return tag + "." + monat + "." + jahr;
}

function berechneAktuelleWoche() {
  var heute = new Date();
  var aktuellerTag = heute.getDay();
  var tageBisSonntag = 6 - aktuellerTag;

  var startDerWoche = new Date(heute);
  startDerWoche.setDate(heute.getDate() - aktuellerTag);

  var endeDerWoche = new Date(heute);
  endeDerWoche.setDate(heute.getDate() + tageBisSonntag);

  console.log("Start der Woche: " + formatiereDatum(startDerWoche));
  console.log("Ende der Woche: " + formatiereDatum(endeDerWoche));
}
