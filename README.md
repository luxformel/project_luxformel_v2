# Luxformel — Website

## English

### Purpose

Luxformel is a static educational website focused on STEM subjects (Chemistry, Mathematics, Physics, Electrical Engineering, Computer Science, Technology, Measurement, and more). It collects formulas, explanations, tables and reference material for students and educators.

### Structure

- Root contains static HTML pages (index.html, sitemap, changelog, etc.).
- Main content folders: `Chemie/`, `Mathe/`, `Physik/`, `Elektrotechnik/`, `Informatik/`, `Technologie/`, `Messtechnik/`, `Archiv/`, `Divers/`, etc.
- Assets: `css/`, `javascript/`, `img/`, `fonts/`, `icons/`, `favicons/`, `pwa/`.
- Documentation: `Documentation/` and site-specific pages under each subject folder.

### Run locally

Because the site is static, you can serve it with a simple HTTP server. From the project root run:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Alternatively use any static-file server or your preferred development server.

### Development notes

- Client scripts are in `javascript/` (header/footer, navigator, splash text, settings).
- Styles are in `css/` and theme files are in `themes/`.
- The site uses progressive enhancement and minimal JS — most pages are plain HTML.
- Keep paths relative when editing local files; many pages reference assets using root-based paths (e.g., `/css/...`).

### Contributing

If you want to contribute content or fixes, fork the repo, make changes, and create a pull request. For large content additions, open an issue first to discuss structure and placement.

### License & Contact

No license file is included in the repository. For reuse or redistribution, please contact the site owner.

Contact: the site owner (maintainer) — see repository metadata or project settings for details.

---

## Lëtzebuergesch (Luxembourgish)

### Zweck

Luxformel ass eng statesch Educatiounssite fir STEM-Fächer (Chemie, Math, Physik, Elektrotechnik, Informatik, Technologie, Messtechnik, asw.). D'Site sammelt Formelen, Erklärungen, Tabellen an Referenzmaterial fir Schüler a Lehrpersonal.

### Struktur

- D'Root enthält statesch HTML-Säiten (index.html, sitemap, changelog, asw.).
- Haaptinhalt-Folder: `Chemie/`, `Mathe/`, `Physik/`, `Elektrotechnik/`, `Informatik/`, `Technologie/`, `Messtechnik/`, `Archiv/`, `Divers/`, asw.
- Assets: `css/`, `javascript/`, `img/`, `fonts/`, `icons/`, `favicons/`, `pwa/`.
- Dokumentatioun an Themen-Säiten sinn am `Documentation/` an anere Sujet-Ordner.

### Lokal lafen

Fir lokal ze testen kënnt Dir en einfachen HTTP-Server benotzen. Am Projet-Root lafen:

```bash
python -m http.server 8000
# dann opmaachen: http://localhost:8000
```

Oder benotzt e Server-Tool dat Dir léiwer hutt.

### Entwécklung

- JavaScript-Dateien sinn am `javascript/` (header, footer, navigator, splashText, settings).
- CSS-Dateien sinn am `css/` an d'Themen am `themes/`.
- D'Site benotzt progressiv Verbesserung an dacks nëmmen e bëssen JS — vill Säiten si einfach HTML.
- Benotzt relativ/richteg Weeër beim Editéieren; e puer Ressourcen ginn iwwer Root-baséiert Weeër referenzéiert (z. B. `/css/...`).

### Matmaachen

Wann Dir wëllt matmaachen, fork d'Repo, maacht Är Ännerungen a create eng Pull Request. Fir grouss Inhaltsännerungen, diskutéiert w.e.g. éischt via en Issue.

### Lizenz & Kontakt

Et gëtt keng explizit Lizenz-Datei an dëser Repo. Fir Wiederverwendung oder Verdeele kontaktéiert w.e.g. den Site-Owner.

Kontakt: Maintainer / Site-Owner — kuckt an d'Repository-Metadaten oder d'Projektastellungen fir méi Informatiounen.
