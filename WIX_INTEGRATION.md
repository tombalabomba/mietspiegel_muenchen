# Wix Integration Guide

## Übersicht

Dieser Guide erklärt, wie Sie den Münchner Mietspiegelrechner in Ihre Wix-Website integrieren.

## Methode 1: iframe Embed (Einfachste Methode)

### Schritt 1: Build erstellen und hosten

1. Build erstellen:
   ```bash
   npm run build
   ```

2. Den `build/` Ordner auf einen Webserver hochladen (z.B. Netlify, Vercel, oder Ihr eigener Server)

### Schritt 2: In Wix einbinden

1. In Wix Editor öffnen
2. Klicken Sie auf **"Add" (+)** → **"Embed Code"** → **"Embed HTML"**
3. Fügen Sie folgenden Code ein:

```html
<iframe
  src="https://ihr-server.de/mietspiegel-calculator"
  width="100%"
  height="1200px"
  frameborder="0"
  scrolling="auto"
  style="border: none; overflow: hidden;">
</iframe>
```

4. Passen Sie die Höhe nach Bedarf an
5. Speichern und veröffentlichen

## Methode 2: Wix Blocks (Fortgeschritten)

### Vorteile:
- Bessere Integration ins Wix-Design
- Keine externe Hosting nötig
- Schnellere Ladezeiten

### Schritte:

1. Öffnen Sie **Wix Blocks** (https://dev.wix.com/docs/develop-websites/articles/wix-blocks/getting-started/about-wix-blocks)
2. Erstellen Sie ein neues Widget
3. Kopieren Sie Ihre React-Komponenten ins Widget
4. Veröffentlichen Sie das Widget
5. Fügen Sie das Widget zu Ihrer Seite hinzu

## Methode 3: Netlify/Vercel (Empfohlen)

### Mit Netlify:

1. **GitHub Repository verbinden:**
   - Gehen Sie zu https://app.netlify.com/
   - Klicken Sie auf "New site from Git"
   - Verbinden Sie Ihr GitHub Repository

2. **Build-Einstellungen:**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Klicken Sie auf "Deploy site"

3. **Domain erhalten:**
   - Netlify gibt Ihnen eine kostenlose URL (z.B. `your-app.netlify.app`)
   - Optional: Eigene Domain verbinden

4. **In Wix einbinden:**
   - Verwenden Sie die Netlify-URL im iframe (siehe Methode 1)

### Mit Vercel:

1. **Vercel CLI installieren:**
   ```bash
   npm install -g vercel
   ```

2. **Projekt deployen:**
   ```bash
   cd mietspiegel-calculator
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project? No
   - Project name: mietspiegel-calculator
   - Directory: ./
   - Build command: `npm run build`
   - Output directory: `build`

4. **Production deployment:**
   ```bash
   vercel --prod
   ```

5. **In Wix einbinden:**
   - Verwenden Sie die Vercel-URL im iframe

## Responsive Design Optimierung für Wix

### CSS-Anpassungen für iframe:

Fügen Sie in Ihrer Wix-Seite folgendes Custom CSS hinzu:

```css
/* Desktop */
@media (min-width: 1024px) {
  iframe.mietspiegel {
    height: 1200px;
    max-width: 1400px;
    margin: 0 auto;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  iframe.mietspiegel {
    height: 1600px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  iframe.mietspiegel {
    height: 2000px;
  }
}
```

## Performance-Tipps

1. **Lazy Loading:**
   - Laden Sie den Calculator nur, wenn der Benutzer zur entsprechenden Sektion scrollt

2. **Caching:**
   - Netlify/Vercel kümmern sich automatisch um Caching
   - Build-Dateien werden über CDN ausgeliefert

3. **Komprimierung:**
   - Der Production Build ist bereits optimiert
   - Aktivieren Sie Gzip-Komprimierung auf Ihrem Server

## Testing

Bevor Sie live gehen:

1. **Desktop-Browser testen:**
   - Chrome, Firefox, Safari, Edge

2. **Mobile testen:**
   - iPhone (Safari)
   - Android (Chrome)

3. **Wix Preview nutzen:**
   - Testen Sie die Integration im Wix Preview-Modus
   - Prüfen Sie alle Breakpoints

## Troubleshooting

### iframe zeigt nichts an:
- Überprüfen Sie die URL
- Prüfen Sie Console auf Fehler (F12)
- Stellen Sie sicher, dass CORS richtig konfiguriert ist

### Höhe passt nicht:
- Erhöhen Sie den `height` Wert im iframe
- Oder verwenden Sie JavaScript für dynamische Höhe

### Mobile Darstellung:
- Stellen Sie sicher, dass der Calculator responsive ist
- Testen Sie verschiedene Bildschirmgrößen

## Support

Bei Fragen:
- GitHub Issues: https://github.com/tombalabomba/mietspiegel_muenchen/issues
- Wix Support: https://support.wix.com/

## Nächste Schritte

1. ✅ Node.js installieren
2. ✅ `npm install` ausführen
3. ✅ `npm start` zum Testen
4. ✅ `npm run build` für Production
5. ⬜ Auf Netlify/Vercel deployen
6. ⬜ In Wix einbinden
7. ⬜ Testen und live gehen!
