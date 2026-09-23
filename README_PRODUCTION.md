# Kalorienrechner - Kalorie & Makronährstoff Rechner

Ein modernes, benutzerfreundliches Werkzeug zur Berechnung von Kalorien und Makronährstoffen mit vollständiger Offline-Unterstützung.

## ✨ Features

- **📊 Makronährstoff-Berechnung**: Berechnen Sie schnell Kalorien, Protein, Kohlenhydrate und Fette
- **🍽️ Umfangreiche Lebensmittel-Datenbank**: 30+ vorinstallierte Lebensmittel in 6 Kategorien
- **➕ Benutzerdefinierte Lebensmittel**: Fügen Sie Ihre eigenen Lebensmittel zur Datenbank hinzu
- **📱 Progressive Web App (PWA)**: Funktioniert online UND offline
- **🌙 Dark Mode**: Automatische Anpassung an Systemeinstellungen
- **📦 Installierbar**: Installieren Sie die App auf Ihrem Telefon wie eine native App
- **⚡ Blitzschnell**: Keine externen Abhängigkeiten, optimierte Performance
- **♿ Zugänglich**: Vollständige Tastatur- und Screen-Reader-Unterstützung
- **📡 Offline-First**: Funktioniert auch ohne Internetverbindung
- **💾 Lokale Speicherung**: Alle Daten bleiben privat auf Ihrem Gerät

## 🚀 Schnelleinstieg

### Online-Version
1. Öffnen Sie die [Live-Demo](https://yourusername.github.io/kalorienrechner)
2. Kategorie und Lebensmittel wählen
3. Menge eingeben und berechnen!

### Offline-Installation

#### Auf Android:
1. Öffnen Sie die App im Chrome-Browser
2. Tippen Sie auf das Menü (⋮) → "Zum Startbildschirm hinzufügen"
3. Die App wird als natives Symbol hinzugefügt

#### Auf iOS:
1. Öffnen Sie die App in Safari
2. Tippen Sie auf Teilen → "Zum Startbildschirm"
3. App öffnet sich vollbildschirmig wie eine native App

#### Auf dem Desktop:
1. Öffnen Sie die App im Chrome/Edge
2. Klicken Sie auf das Installationssymbol in der Adressleiste
3. App wird als Fensteranwendung installiert

## 🛠️ Lokal entwickeln

### Voraussetzungen
- Beliebiger lokaler Webserver (oder einfach `npx http-server`)
- Git

### Setup

```bash
# Repository klonen
git clone https://github.com/yourusername/kalorienrechner.git
cd kalorienrechner

# Mit Python 3 (einfachste Methode)
python3 -m http.server 8000

# Oder mit Node.js http-server
npx http-server

# Dann öffnen Sie http://localhost:8000 im Browser
```

## 📁 Projektstruktur

```
kalorienrechner/
├── index.html              # Hauptanwendung (HTML, CSS, JavaScript)
├── sw.js                   # Service Worker für Offline-Unterstützung
├── manifest.webmanifest    # PWA-Metadaten
├── icons/                  # App-Symbole
│   ├── icon-192.png       # Android Icon
│   ├── icon-512.png       # Große Icon-Variante
│   └── apple-touch-icon.png # iOS Home-Screen Icon
├── .github/
│   └── workflows/
│       └── pages.yml      # GitHub Pages Deployment
└── README.md              # Diese Datei
```

## 🔧 Konfiguration

### Theme-Farben anpassen

In `index.html`, suchen Sie nach der CSS-Sektion `:root`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    /* ... weitere Variablen ... */
}
```

### Service Worker Cache-Version aktualisieren

In `sw.js`:

```javascript
const CACHE_VERSION = 'kalorienrechner-v2'; // Erhöhen Sie die Version
```

### Lebensmittel-Datenbank erweitern

In `index.html`, innerhalb der JavaScript-Sektion, erweitern Sie das `foodDatabase`-Objekt:

```javascript
'Neue Kategorie': [
    { 
        name: 'Lebensmittelname', 
        kcal: 100,      // Kalorien pro 100g
        protein: 5,     // Protein in g
        carbs: 10,      // Kohlenhydrate in g
        fats: 3,        // Fette in g
        density: 1.0    // Dichte für Volumen-Konvertierung
    }
]
```

## 🌐 Hosting & Deployment

### GitHub Pages (Kostenlos & Einfach)

1. Pushen Sie Ihren Code zu GitHub:
```bash
git add .
git commit -m "Initial commit: Kalorienrechner PWA"
git push -u origin main
```

2. Repository-Einstellungen → Pages → Wählen Sie "main" branch
3. Ihre App ist jetzt live unter `https://yourusername.github.io/kalorienrechner`

### Vercel (Kostenlos & Schnell)

1. Importieren Sie Repository von GitHub
2. Bestätigen Sie Standard-Einstellungen
3. Deployment ist abgeschlossen!

### Eigener Server

```bash
# Kopieren Sie alle Dateien auf Ihren Server
scp -r . user@server:/var/www/kalorienrechner

# Stellen Sie sicher, dass HTTPS aktiviert ist (wichtig für Service Worker!)
# Konfigurieren Sie Ihren Webserver (nginx/Apache) für .webmanifest MIME-Type
```

#### MIME-Type Konfiguration (nginx):

```nginx
types {
    text/plain webmanifest;
}
```

## 📊 Performance & Optimierung

- **Lighthouse Score**: Ziel 95+ (PWA, Performance, Accessibility, Best Practices)
- **Bundle Size**: < 50KB (nicht komprimiert)
- **Offline Support**: 100% funktional ohne Internetverbindung
- **Load Time**: < 2 Sekunden (auch 3G)

Testen Sie mit Google Lighthouse:
1. Öffnen Sie DevTools (F12)
2. Gehen Sie zu Lighthouse
3. Führen Sie eine Audit durch

## 🐛 Troubleshooting

### Service Worker wird nicht registriert
- Stellen Sie sicher, dass Sie HTTPS verwenden (oder localhost)
- Überprüfen Sie DevTools → Application → Service Workers

### Offline-Funktionalität funktioniert nicht
- Service Worker muss vollständig installiert sein
- Laden Sie die Seite mindestens einmal online
- Überprüfen Sie die Cache Storage in DevTools

### App wird nicht installiert
- Sicherstellen Sie HTTPS (mit Ausnahme von localhost)
- manifest.webmanifest muss vorhanden und gültig sein
- Laden Sie die Seite neu und warten Sie ~5 Sekunden

## 🎨 Anpassung & Branding

### App-Name & Beschreibung
Bearbeiten Sie `manifest.webmanifest`:
```json
{
  "name": "Ihr App-Name",
  "short_name": "Kurzer Name",
  "description": "Ihre Beschreibung"
}
```

### Custom Icons erstellen
1. Erstellen Sie ein 512x512 PNG
2. Speichern Sie als `icons/icon-512.png` und `icons/icon-192.png`
3. Für iOS: `icons/apple-touch-icon.png` (180x180)

**Tipp**: Verwenden Sie [PWA Image Generator](https://www.pwabuilder.com/imageGenerator)

## 📝 Lebensmittel-Datenbank

Die App enthält vorinstallierte Lebensmittel in folgenden Kategorien:

- **Getränke**: Wasser, Tee, Kaffee, Milch
- **Milchprodukte**: Joghurt, Käse, Frischkäse
- **Öle & Aufstriche**: Olivenöl, Erdnussbutter, Kokosöl
- **Getreide & Backen**: Mehl, Haferflocken, Brot
- **Obst & Gemüse**: Äpfel, Bananen, Brokkoli, Möhren, Tomaten, Spinat
- **Fleisch & Eier**: Hähnchen, Rindfleisch, Schweinefleisch, Eier, Lachs

**Daten-Quelle**: Durchschnittliche Nährwerte (pro 100g/100ml)

## 🔐 Datenschutz

- Alle Daten werden **lokal auf Ihrem Gerät** gespeichert
- Es werden **keine Daten** an externe Server übertragen
- **Keine Tracker** oder Analytics
- Vollständig kostenlos und Open Source

## 🤝 Beitragen

Haben Sie einen Fehler gefunden oder eine Idee?

1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/MyFeature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add MyFeature'`)
4. Pushen Sie den Branch (`git push origin feature/MyFeature`)
5. Öffnen Sie einen Pull Request

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe LICENSE-Datei für Details.

## 🎯 Roadmap

- [ ] Multi-Sprachen-Unterstützung (EN, ES, FR, IT)
- [ ] Tägliches Tracking & Statistiken
- [ ] Mahlzeiten-Planung
- [ ] Barcode-Scanner für Lebensmittel
- [ ] Cloud-Synchronisierung (optional)
- [ ] Mobile App (React Native)
- [ ] Rezept-Generator nach Makro-Zielen

## 💡 Tipps & Tricks

### Schnelle Einheiten-Umrechnung
- 1ml Öl ≈ 0,91g (automatisch konvertiert)
- 1ml Milch ≈ 1,03g
- 1ml Joghurt ≈ 1,02g

### Keyboard-Shortcuts
- `Ctrl+Enter`: Schnelle Berechnung

### Favoriten speichern
Die letzte Auswahl wird automatisch gespeichert. Benutzerdefinierte Lebensmittel werden dauerhaft gespeichert.

## 📞 Support

- Öffnen Sie ein [GitHub Issue](https://github.com/yourusername/kalorienrechner/issues)
- Diskutieren Sie in den [GitHub Discussions](https://github.com/yourusername/kalorienrechner/discussions)

---

**Viel Spaß mit dem Kalorienrechner!** 🎉

Entwickelt mit ❤️ für Gesundheit & Fitness

Zuletzt aktualisiert: 2024
