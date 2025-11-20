import jsPDF from 'jspdf';

export const generatePDF = (result, inputData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Hilfsfunktion für zentrierten Text
  const addCenteredText = (text, y, size = 12) => {
    doc.setFontSize(size);
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (pageWidth - textWidth) / 2, y);
  };

  // Header
  doc.setFillColor(17, 109, 255);
  doc.rect(0, 0, pageWidth, 35, 'F');
  doc.setTextColor(255, 255, 255);
  addCenteredText('Muenchner Mietspiegelrechner 2025', 15, 18);
  addCenteredText('Berechnungsergebnis', 25, 12);

  // Reset Textfarbe
  doc.setTextColor(0, 0, 0);
  yPos = 45;

  // Datum
  doc.setFontSize(10);
  doc.text(`Berechnet am: ${new Date().toLocaleDateString('de-DE')}`, 15, yPos);
  yPos += 10;

  // Hauptergebnis
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Ortsuebliche Vergleichsmiete', 15, yPos);
  yPos += 10;

  const wohnflaeche = parseFloat(inputData.wohnflaeche) || 0;
  const mieteUnten = (parseFloat(result.miete_unten) * wohnflaeche).toFixed(2);
  const mieteOben = (parseFloat(result.miete_oben) * wohnflaeche).toFixed(2);

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text(`Von ${mieteUnten} EUR bis ${mieteOben} EUR pro Monat`, 15, yPos);
  yPos += 6;
  doc.setFontSize(10);
  doc.text(`(${result.miete_unten} EUR/m\u00B2 bis ${result.miete_oben} EUR/m\u00B2)`, 15, yPos);
  yPos += 6;
  doc.text(`Nettokaltmiete ohne Betriebskosten fuer ${wohnflaeche} m\u00B2`, 15, yPos);
  yPos += 15;

  // Eingabedaten
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Eingabedaten', 15, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');

  doc.text(`Wohnflaeche: ${inputData.wohnflaeche} m\u00B2`, 15, yPos);
  yPos += 6;
  doc.text(`Baujahr: ${inputData.baujahr}`, 15, yPos);
  yPos += 6;
  doc.text(`Wohnlage: ${inputData.wohnlage}`, 15, yPos);
  yPos += 12;

  // Berechnungsdetails
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Berechnungsdetails', 15, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');

  doc.text(`Grundpreis: ${result.grundpreis} EUR/m\u00B2`, 15, yPos);
  yPos += 8;

  // Zu- und Abschläge
  if (result.zuschlaege_details && result.zuschlaege_details.length > 0) {
    doc.setFont(undefined, 'bold');
    doc.text('Zu- und Abschlaege:', 15, yPos);
    yPos += 6;
    doc.setFont(undefined, 'normal');

    result.zuschlaege_details.forEach((item) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      const sign = item.wert > 0 ? '+' : '';
      doc.text(
        `  ${item.kategorie}: ${item.label} (${sign}${item.wert.toFixed(2)} EUR/m\u00B2)`,
        15,
        yPos
      );
      yPos += 6;
    });

    yPos += 2;
    doc.setFont(undefined, 'bold');
    const sign = parseFloat(result.zuschlaege_summe) > 0 ? '+' : '';
    doc.text(
      `Summe Zu- und Abschlaege: ${sign}${result.zuschlaege_summe} EUR/m\u00B2`,
      15,
      yPos
    );
    yPos += 8;
    doc.setFont(undefined, 'normal');
  }

  // Nettomiete
  doc.setFont(undefined, 'bold');
  doc.text(`Nettomiete (Durchschnitt): ${result.nettomiete} EUR/m\u00B2`, 15, yPos);
  yPos += 8;
  doc.setFont(undefined, 'normal');

  // Schwankungsbreite
  doc.text(
    `Schwankungsbreite unten: -${result.schwankung.unten.toFixed(2)} EUR/m\u00B2`,
    15,
    yPos
  );
  yPos += 6;
  doc.text(
    `Schwankungsbreite oben: +${result.schwankung.oben.toFixed(2)} EUR/m\u00B2`,
    15,
    yPos
  );
  yPos += 12;

  // Zusätzliche Informationen
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Zusaetzliche Informationen', 15, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');

  doc.text(
    `Durchschnittliche Betriebskosten: ${result.betriebskosten.toFixed(2)} EUR/m\u00B2`,
    15,
    yPos
  );
  yPos += 6;
  doc.text(
    `(${(result.betriebskosten * wohnflaeche).toFixed(2)} EUR gesamt)`,
    15,
    yPos
  );
  yPos += 8;

  const warmmieteUnten = (
    (parseFloat(result.miete_unten) + result.betriebskosten) *
    wohnflaeche
  ).toFixed(2);
  const warmmieteOben = (
    (parseFloat(result.miete_oben) + result.betriebskosten) *
    wohnflaeche
  ).toFixed(2);

  doc.text('Warmmiete (inkl. Betriebskosten) ca.:', 15, yPos);
  yPos += 6;
  doc.text(`${warmmieteUnten} EUR bis ${warmmieteOben} EUR pro Monat`, 15, yPos);
  yPos += 12;

  // Disclaimer
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  const disclaimer =
    'Hinweis: Diese Berechnung basiert auf dem Muenchner Mietspiegel 2025 und dient nur als Orientierung. Fuer rechtsverbindliche Auskuenfte konsultieren Sie bitte einen Fachanwalt oder Mieterverein.';

  const splitDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - 30);
  doc.text(splitDisclaimer, 15, yPos);

  // Footer
  yPos = doc.internal.pageSize.getHeight() - 15;
  doc.setFontSize(8);
  doc.text('Erstellt mit dem Muenchner Mietspiegelrechner 2025', 15, yPos);
  doc.text(
    `Seite 1 von ${doc.internal.getNumberOfPages()}`,
    pageWidth - 40,
    yPos
  );

  // PDF speichern
  const filename = `Mietspiegel_Berechnung_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};
