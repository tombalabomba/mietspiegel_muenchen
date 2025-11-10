# Getting Started - Münchner Mietspiegelrechner 2025

## 🚀 Schnellstart

Ihr Mietspiegelrechner ist fertig! Hier ist, was Sie jetzt tun müssen:

## ✅ Was bereits erledigt ist:

- ✅ Vollständige React-Anwendung erstellt
- ✅ Alle Mietspiegel-Daten aus dem PDF extrahiert (Tabellen 1-7)
- ✅ Berechnungslogik implementiert (6 Arbeitsschritte)
- ✅ Single-Page UI mit Real-time Berechnung
- ✅ Mobile-responsive Design
- ✅ Tooltips und Hilfe-Texte
- ✅ Wix-Integration vorbereitet

## 📋 Nächste Schritte

### 1. Node.js installieren (falls noch nicht vorhanden)

Laden Sie Node.js herunter und installieren Sie es:
**Download:** https://nodejs.org/ (LTS-Version empfohlen)

### 2. Terminal öffnen und zu Ihrem Projekt navigieren

```bash
cd "/Users/thomashartmann/Dropbox/BGAW (1)/Marketing/Mietspiegel rechner/mietspiegel-calculator"
```

### 3. Abhängigkeiten installieren

```bash
npm install
```

Dies lädt alle benötigten React-Pakete herunter (dauert ca. 2-3 Minuten).

### 4. Entwicklungsserver starten

```bash
npm start
```

Der Browser öffnet sich automatisch auf **http://localhost:3000**

### 5. Calculator testen

Sie können jetzt:
- ✅ Wohnfläche eingeben
- ✅ Baujahr auswählen
- ✅ Wohnlage wählen
- ✅ Alle Features auswählen
- ✅ Ergebnis in Echtzeit sehen

### 6. Production Build erstellen

Wenn alles funktioniert:

```bash
npm run build
```

Dies erstellt einen optimierten Build im `build/` Ordner.

## 🌐 Deployment Optionen

### Option A: Netlify (Empfohlen - Kostenlos)

1. Gehen Sie zu https://app.netlify.com/
2. Klicken Sie auf "New site from Git"
3. Verbinden Sie Ihr GitHub Repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Deploy!

**Ergebnis:** Sie erhalten eine URL wie `https://mietspiegel-muenchen.netlify.app`

### Option B: Vercel (Auch kostenlos)

```bash
npm install -g vercel
vercel
```

Folgen Sie den Anweisungen auf dem Bildschirm.

## 🔗 Wix Integration

Sobald Sie eine URL haben (von Netlify oder Vercel):

1. Wix Editor öffnen
2. **Add (+)** → **Embed Code** → **Embed HTML**
3. Folgenden Code einfügen:

```html
<iframe
  src="IHRE-NETLIFY-ODER-VERCEL-URL"
  width="100%"
  height="1200px"
  frameborder="0"
  style="border: none;">
</iframe>
```

4. Höhe nach Bedarf anpassen
5. Speichern und veröffentlichen

**Detaillierte Anleitung:** Siehe `WIX_INTEGRATION.md`

## 📁 Projekt-Struktur

```
mietspiegel-calculator/
├── src/
│   ├── components/         # React-Komponenten
│   │   ├── Calculator.jsx  # Haupt-Komponente
│   │   ├── InputSection.jsx
│   │   ├── ResultsDisplay.jsx
│   │   └── Tooltip.jsx
│   ├── data/              # Alle Mietspiegel-Daten
│   │   ├── betriebskosten.json
│   │   ├── grundpreis.json
│   │   ├── zuschlaege.json
│   │   ├── schwankungen.json
│   │   ├── abweichungen.json
│   │   └── wohnlagen.json
│   ├── utils/
│   │   └── calculator.js  # Berechnungslogik
│   └── App.jsx
├── public/
│   └── index.html
├── README.md              # Vollständige Dokumentation
├── WIX_INTEGRATION.md     # Wix-Integration Guide
└── package.json
```

## 🎨 Features

- **6 Wohnlagenkategorien:** Durchschnittlich, Gut, Best, Zentral × 3
- **11 Baujahr-Perioden:** Von "bis 1918" bis "2022-2023"
- **Wohnfläche:** 20-160 m²
- **Zu- und Abschläge:**
  - Gebäudetyp (Hochhaus, Wohnblock)
  - Haustyp (5 Kategorien)
  - Heizung
  - Sanitärbereich (Mehrfachauswahl)
  - Küche (Mehrfachauswahl)
  - Fußboden
  - Terrasse/Balkon
  - Weitere Merkmale

## 🧪 Testing

Testen Sie verschiedene Szenarien:

**Beispiel 1: Einfache Wohnung**
- Wohnfläche: 50 m²
- Baujahr: 1989-1998
- Wohnlage: Durchschnittliche Lage
- Keine besonderen Features

**Beispiel 2: Luxuswohnung**
- Wohnfläche: 120 m²
- Baujahr: 2022-2023
- Wohnlage: Zentrale beste Lage
- Fußbodenheizung, modernisiertes Bad, guter Boden, Balkon, modernisierte Fenster

**Beispiel 3: Altbau**
- Wohnfläche: 75 m²
- Baujahr: bis 1918
- Wohnlage: Gute Lage
- Guter Altbau, hohe Decken

## 🐛 Troubleshooting

**Problem:** `npm: command not found`
**Lösung:** Node.js ist nicht installiert. Siehe Schritt 1.

**Problem:** `npm install` schlägt fehl
**Lösung:** Löschen Sie `node_modules/` und versuchen Sie erneut:
```bash
rm -rf node_modules
npm install
```

**Problem:** Port 3000 bereits in Verwendung
**Lösung:** Verwenden Sie einen anderen Port:
```bash
PORT=3001 npm start
```

## 📞 Support

- **GitHub Issues:** https://github.com/tombalabomba/mietspiegel_muenchen/issues
- **Email:** (Ihre E-Mail hier)

## 🎯 Checkliste

- [ ] Node.js installiert
- [ ] `npm install` ausgeführt
- [ ] `npm start` funktioniert
- [ ] Calculator getestet
- [ ] Production Build erstellt
- [ ] Auf Netlify/Vercel deployed
- [ ] In Wix integriert
- [ ] Live getestet

## 📚 Weitere Dokumentation

- `README.md` - Vollständige Projekt-Dokumentation
- `WIX_INTEGRATION.md` - Detaillierte Wix-Integration
- Mietspiegel 2025 PDF in: `/Users/thomashartmann/Dropbox/BGAW (1)/Marketing/Mietspiegel rechner/Layout 1.pdf`

---

**Viel Erfolg mit Ihrem Mietspiegelrechner! 🎉**
