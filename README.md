# GitHub Repositories Dashboard

Eine Dashboard-Anwendung zur Anzeige öffentlicher Repositories der [aboutsource](https://github.com/aboutsource/) GitHub-Organisation.

---

## TODO

- write tests
- move cache to Redis
- apply Domain Driven Design

---

## 📋 Akzeptanzkriterien

### Kernfunktionen

| #   | Anforderung                                                                                                          | Status |
| --- | -------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | Dashboard zeigt beim Seitenaufruf **alle öffentlichen GitHub-Repositories** von `https://github.com/aboutsource/` an | ✅     |
| 2   | Jedes Repository zeigt nur den **letzten Commit** mit der Commit-Nachricht                                           | ✅     |
| 3   | Weitere Details (z.B. Commit-Autor) werden erst angezeigt, wenn das **Akkordeon-Element aufgeklappt** wird           | ✅     |
| 4   | Repositories sind **nach dem letzten Änderungszeitpunkt sortiert** (neueste zuerst)                                  | ✅     |

### Zuverlässigkeit & UX

| #   | Anforderung                                                                                      | Status |
| --- | ------------------------------------------------------------------------------------------------ | ------ |
| 5   | Dashboard bleibt **verfügbar, auch wenn GitHub offline/nicht erreichbar** ist                    | ✅     |
| 6   | Zeige **möglichst aktuelle zwischengespeicherte Daten** während Ausfällen an                     | ✅     |
| 7   | Änderungen auf GitHub werden bei **Seitenaktualisierung** sichtbar, sofern GitHub erreichbar ist | ✅     |

---

## 🛠 Technologie-Stack

**Entscheidung:** Next.js mit TypeScript

**Begründung:** Begrenzte Entwicklungszeit + frühere Erfahrung mit Next.js statt Vue

| Technologie         | Zweck         |
| ------------------- | ------------- |
| **Next.js**         | Framework     |
| **TypeScript**      | Typsicherheit |
| **GitHub REST API** | Datenabruf    |
| **Postman**         | API-Tests     |

---

## Barrierefreiheit

Auch wenn ich noch lerne, lege ich stets Wert darauf, meine Anwendungen barrierefrei zu gestalten. Ich habe bereits grundlegende Funktionen implementiert, darunter:

- Semantisches HTML
- ARIA-Attribute für interaktive Komponenten
- Unterstützung der Tastaturnavigation
- Korrekte Überschriftenstruktur
- Ausreichender Farbkontrast

---

## 📝 Implementierungsplan

- [x] Anforderungsanalyse — Akzeptanzkriterien lesen und verstehen
- [x] Technologie-Entscheidung — Next.js statt Vue gewählt (Zeitdruck + Vertrautheit)
- [x] Projekt-Einrichtung — Next.js mit TypeScript initialisieren
- [x] UI-Grundgerüst — Saubere Struktur, Logo, Header, Layout-Gerüst
- [x] API-Integration — GitHub REST API-Endpunkte in Postman testen
- [ ] Funktions-Implementierung
  - [x] Repository-Auflistung
  - [x] Anzeige des letzten Commits
  - [x] Akkordeon-Komponenten
  - [x] Sortierlogik
  - [x] Offline-Caching-Strategie
- [ ] Testing & Polierung
  - [x] Fehlerbehandlung
  - [x] Responsives Design
  - [x] Barrierefreiheit überprüfen

---

## 🔌 GitHub API-Endpunkte

| Endpunkt                                       | Zweck                                    |
| ---------------------------------------------- | ---------------------------------------- |
| `GET /orgs/{org}/repos`                        | Alle öffentlichen Repositories auflisten |
| `GET /repos/{owner}/{repo}/commits?per_page=1` | Letzten Commit pro Repo abrufen          |

---

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
