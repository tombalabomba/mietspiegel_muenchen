# Münchner Mietspiegelrechner 2025

Ein moderner, benutzerfreundlicher Rechner zur Berechnung der ortsüblichen Vergleichsmiete für Wohnungen in München, basierend auf dem offiziellen Mietspiegel 2025.

## Features

- **Real-time Berechnung**: Ergebnisse werden sofort während der Eingabe aktualisiert
- **Single-Page Design**: Alle Eingabefelder auf einer Seite, keine komplizierte Navigation
- **Mobile-First**: Optimiert für Smartphones und Tablets
- **Intuitive Bedienung**: Klare Struktur mit hilfreichen Tooltips
- **Präzise Kalkulation**: Basiert auf den offiziellen Mietspiegel-Tabellen 1-7
- **Wix-Integration**: Kann einfach in Wix-Websites eingebunden werden

## Installation

### Voraussetzungen

- Node.js (Version 14 oder höher)
- npm oder yarn

### Setup

1. Node.js installieren (falls noch nicht vorhanden):
   - Download von https://nodejs.org/

2. Abhängigkeiten installieren:
   ```bash
   cd mietspiegel-calculator
   npm install
   ```

3. Entwicklungsserver starten:
   ```bash
   npm start
   ```

4. Browser öffnet sich automatisch auf http://localhost:3000

## Projekt-Struktur

```
mietspiegel-calculator/
├── public/
│   └── index.html          # HTML-Template
├── src/
│   ├── components/         # React-Komponenten
│   │   ├── Calculator.jsx  # Haupt-Komponente
│   │   ├── InputSection.jsx # Eingabeformular
│   │   ├── ResultsDisplay.jsx # Ergebnis-Anzeige
│   │   └── Tooltip.jsx     # Hilfe-Tooltips
│   ├── data/               # JSON-Daten aus PDF
│   │   ├── betriebskosten.json
│   │   ├── grundpreis.json
│   │   ├── zuschlaege.json
│   │   ├── schwankungen.json
│   │   ├── abweichungen.json
│   │   └── wohnlagen.json
│   ├── utils/
│   │   └── calculator.js   # Berechnungslogik
│   ├── App.jsx
│   └── index.js
└── package.json
```

## Berechnungslogik

Die Berechnung folgt den 6 Arbeitsschritten des Mietspiegels:

1. **Betriebskosten**: Durchschnittliche Kosten (3,38 €/m²)
2. **Grundpreis**: Matrix aus Wohnfläche × Baujahr
3. **Zu- und Abschläge**:
   - Wohnlage (6 Kategorien)
   - Gebäudetyp
   - Haustyp
   - Heizung
   - Sanitärbereich
   - Küche
   - Fußboden
   - Terrasse/Balkon
   - Weitere Merkmale
4. **Schwankungsbreiten**: Zentral vs. nicht-zentral
5. **Begründete Abweichungen**: Optional
6. **Endberechnung**: Nettomiete mit Spannen

## Deployment

### Produktion Build erstellen:

```bash
npm run build
```

Dies erstellt einen optimierten Build im `build/` Ordner.

### Wix-Integration:

1. Build erstellen
2. Dateien auf einem Webserver hosten
3. In Wix über "Embed Code" als iframe einbinden:

```html
<iframe src="https://ihr-server.de/mietspiegel-calculator"
        width="100%"
        height="800px"
        frameborder="0">
</iframe>
```

Alternativ: Wix Velo verwenden für direkte Integration

## Datenquellen

Alle Berechnungsdaten basieren auf:
- **Mietspiegel München 2025** (offizielle Broschüre)
- Tabellen 1-7
- Wohnlagenkarte

## Technologie-Stack

- **React 18**: UI-Framework
- **JavaScript (ES6+)**: Programmiersprache
- **CSS3**: Styling mit Mobile-First-Ansatz
- **Create React App**: Build-Setup

## Browser-Support

- Chrome (neueste Version)
- Firefox (neueste Version)
- Safari (neueste Version)
- Edge (neueste Version)
- Mobile Browser (iOS Safari, Chrome Android)

## Lizenz

Dieses Projekt ist für den privaten Gebrauch. Die Berechnungsdaten stammen aus dem offiziellen Münchner Mietspiegel 2025.

## Hinweis

Diese Anwendung dient nur zur Orientierung. Für rechtsverbindliche Auskünfte konsultieren Sie bitte einen Fachanwalt oder Mieterverein.

## Kontakt

GitHub: https://github.com/tombalabomba/mietspiegel_muenchen
