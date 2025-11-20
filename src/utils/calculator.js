import betriebskostenData from '../data/betriebskosten.json';
import grundpreisData from '../data/grundpreis.json';
import zuschlaege from '../data/zuschlaege.json';
import schwankungen from '../data/schwankungen.json';
import abweichungenData from '../data/abweichungen.json';

/**
 * Arbeitsschritt 1: Get Betriebskosten
 */
export const getBetriebskosten = () => {
  return betriebskostenData.gesamt;
};

/**
 * Arbeitsschritt 2: Calculate Grundpreis based on Wohnfläche and Baujahr
 */
export const getGrundpreis = (wohnflaeche, baujahr) => {
  if (!wohnflaeche || !baujahr) return null;

  // Find the correct row based on wohnflaeche
  const row = grundpreisData.preise.find(
    (r) => wohnflaeche >= r.wohnflaeche_min && wohnflaeche <= r.wohnflaeche_max
  );

  if (!row) return null;

  // Get the price for the specific baujahr category
  return row[baujahr] || null;
};

/**
 * Arbeitsschritt 3: Calculate Zu- und Abschläge
 */
export const calculateZuschlaege = (features) => {
  let total = 0;
  const details = [];

  // Wohnlage (required)
  if (features.wohnlage) {
    const wert = zuschlaege.wohnlage[features.wohnlage]?.wert || 0;
    if (wert !== 0) {
      total += wert;
      details.push({
        kategorie: 'Wohnlage',
        label: zuschlaege.wohnlage[features.wohnlage]?.label,
        wert: wert,
      });
    }
  }

  // Gebäudetyp (optional)
  if (features.gebaeude) {
    const wert = zuschlaege.gebaeude[features.gebaeude]?.wert || 0;
    total += wert;
    details.push({
      kategorie: 'Gebäude',
      label: zuschlaege.gebaeude[features.gebaeude]?.label,
      wert: wert,
    });
  }

  // Haustyp (optional)
  if (features.haustyp) {
    const wert = zuschlaege.haustyp[features.haustyp]?.wert || 0;
    if (wert !== 0) {
      total += wert;
      details.push({
        kategorie: 'Haustyp',
        label: zuschlaege.haustyp[features.haustyp]?.label,
        wert: wert,
      });
    }
  }

  // Heizung (optional)
  if (features.heizung) {
    const wert = zuschlaege.heizung[features.heizung]?.wert || 0;
    if (wert !== 0) {
      total += wert;
      details.push({
        kategorie: 'Heizung',
        label: zuschlaege.heizung[features.heizung]?.label,
        wert: wert,
      });
    }
  }

  // Sanitär (multiple selection possible)
  if (features.sanitaer && Array.isArray(features.sanitaer)) {
    features.sanitaer.forEach((item) => {
      const wert = zuschlaege.sanitaer[item]?.wert || 0;
      total += wert;
      details.push({
        kategorie: 'Sanitär',
        label: zuschlaege.sanitaer[item]?.label,
        wert: wert,
      });
    });
  }

  // Küche (multiple selection possible)
  if (features.kueche && Array.isArray(features.kueche)) {
    features.kueche.forEach((item) => {
      const wert = zuschlaege.kueche[item]?.wert || 0;
      total += wert;
      details.push({
        kategorie: 'Küche',
        label: zuschlaege.kueche[item]?.label,
        wert: wert,
      });
    });
  }

  // Fußboden (optional)
  if (features.fussboden) {
    const wert = zuschlaege.fussboden[features.fussboden]?.wert || 0;
    if (wert !== 0) {
      total += wert;
      details.push({
        kategorie: 'Fußboden',
        label: zuschlaege.fussboden[features.fussboden]?.label,
        wert: wert,
      });
    }
  }

  // Terrasse/Balkon
  if (features.terrasse_balkon) {
    const wert = zuschlaege.terrasse_balkon.wert;
    total += wert;
    details.push({
      kategorie: 'Außenbereich',
      label: zuschlaege.terrasse_balkon.label,
      wert: wert,
    });
  }

  // Weitere Merkmale (multiple selection possible)
  if (features.weitere && Array.isArray(features.weitere)) {
    features.weitere.forEach((item) => {
      const wert = zuschlaege.weitere[item]?.wert || 0;
      total += wert;
      details.push({
        kategorie: 'Weitere Merkmale',
        label: zuschlaege.weitere[item]?.label,
        wert: wert,
      });
    });
  }

  return { total, details };
};

/**
 * Arbeitsschritt 4: Get Schwankungsbreiten
 */
export const getSchwankungsbreiten = (wohnlage) => {
  if (!wohnlage) return null;

  const istZentral = wohnlage.startsWith('zentral');
  const schwankung = istZentral ? schwankungen.zentral : schwankungen.nicht_zentral;

  return schwankung;
};

/**
 * Arbeitsschritt 5: Calculate begründete Abweichungen (optional)
 */
export const calculateAbweichungen = (abweichungenSelected) => {
  let total = 0;
  const details = [];

  if (abweichungenSelected && typeof abweichungenSelected === 'object') {
    Object.keys(abweichungenSelected).forEach((key) => {
      const value = abweichungenSelected[key];
      if (value !== 0 && value !== null && value !== undefined) {
        const merkmal = abweichungenData.merkmale[key];
        if (merkmal) {
          total += value;
          details.push({
            label: merkmal.label,
            wert: value,
          });
        }
      }
    });
  }

  return { total, details };
};

/**
 * Arbeitsschritt 6: Calculate final rent
 */
export const calculateRent = (inputData) => {
  const { wohnflaeche, baujahr, wohnlage, features, abweichungen } = inputData;

  // Validate required fields
  if (!wohnflaeche || !baujahr || !wohnlage) {
    return null;
  }

  // Step 1: Betriebskosten (not included in final calculation, just for reference)
  const betriebskosten = getBetriebskosten();

  // Step 2: Grundpreis
  const grundpreis = getGrundpreis(wohnflaeche, baujahr);
  if (!grundpreis) {
    return { error: 'Ungültige Wohnfläche oder Baujahr' };
  }

  // Step 3: Zuschläge (add wohnlage to features)
  const featuresWithWohnlage = {
    ...features,
    wohnlage: wohnlage
  };
  const { total: zuschlaegeSumme, details: zuschlaege_details } =
    calculateZuschlaege(featuresWithWohnlage || {});

  // Step 4: Schwankungsbreiten
  const schwankung = getSchwankungsbreiten(wohnlage);

  // Step 5: Begründete Abweichungen (optional)
  const { total: abweichungenSumme, details: abweichungen_details } =
    calculateAbweichungen(abweichungen || {});

  // Step 6a: Durchschnittliche ortsübliche Miete
  const nettomiete = grundpreis + zuschlaegeSumme;

  // Step 6b: Mit Spannen
  const miete_unten = nettomiete + schwankung.unten;
  const miete_oben = nettomiete + schwankung.oben;

  // Step 7: Mit begründeten Abweichungen
  const miete_mit_abweichungen_unten = miete_unten + abweichungenSumme;
  const miete_mit_abweichungen_oben = miete_oben + abweichungenSumme;

  return {
    betriebskosten,
    grundpreis: grundpreis.toFixed(2),
    zuschlaege_summe: zuschlaegeSumme.toFixed(2),
    zuschlaege_details,
    nettomiete: nettomiete.toFixed(2),
    schwankung,
    miete_unten: miete_unten.toFixed(2),
    miete_oben: miete_oben.toFixed(2),
    abweichungen_summe: abweichungenSumme.toFixed(2),
    abweichungen_details,
    miete_mit_abweichungen_unten: miete_mit_abweichungen_unten.toFixed(2),
    miete_mit_abweichungen_oben: miete_mit_abweichungen_oben.toFixed(2),
    gesamtmiete_kalt_min: (parseFloat(miete_unten) + abweichungenSumme).toFixed(2),
    gesamtmiete_kalt_max: (parseFloat(miete_oben) + abweichungenSumme).toFixed(2),
    gesamtmiete_warm_min: (parseFloat(miete_unten) + abweichungenSumme + betriebskosten).toFixed(2),
    gesamtmiete_warm_max: (parseFloat(miete_oben) + abweichungenSumme + betriebskosten).toFixed(2),
  };
};
