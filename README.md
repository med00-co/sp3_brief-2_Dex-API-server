# Mon Dex — Dex API Server (Yu-Gi-Oh!)

Projet YouCode — Sprint 3, Brief 2.
Évolution de mon Dex du Sprint 2 : `data.js` et le LocalStorage sont remplacés par une API locale **json-server**.

## Fonctionnalités

### Partie 1 — Dex connecté à l'API
- Affichage des créatures depuis `GET /creatures` (état « Chargement… » et message d'erreur clair)
- Filtre par attribut, envoyé à l'API (`?attribute=`)
- Recherche côté serveur (`?q=`), combinable avec le filtre
- Mémorisation du dernier filtre dans le **LocalStorage**

### Partie 2 — Trier, consulter et ajouter
- Tri par nom ou par numéro (`?_sort=` et `&_order=`), combinable avec la recherche et le filtre
- Fiche détaillée avec `GET /creatures/:id` (message « Créature introuvable » si 404)
- Ajout d'une créature avec `POST /creatures`
- Validation du formulaire (`validateCreature`) avec un message sous chaque champ erroné
- Brouillon du formulaire conservé dans le **SessionStorage** (effacé à l'ajout, au reset et à la fermeture de l'onglet)

### Partie 3 — à venir
- Modification (`PUT`) et suppression (`DELETE`)
- États de l'interface et finition

## Technologies
- HTML5, Tailwind CSS
- JavaScript (modules ES), Fetch API, async/await
- json-server 0.17.4

## Prérequis
- Node.js
- Une extension de serveur local (par exemple Live Server), car les modules ES ne fonctionnent pas en `file://`

## Installation

```bash
npm install
```

## Lancer le projet

1. Lancer l'API (laisser ce terminal ouvert) :

```bash
npx json-server --watch db.json --port 3000
```

L'API répond sur `http://localhost:3000`.

2. Compiler Tailwind (adapter la commande à `package.json`) :

```bash
npm run dev
```

3. Ouvrir `index.html` avec Live Server.

> Le projet se montre en local : l'API tourne sur l'ordinateur, il n'est donc pas hébergé sur GitHub Pages.

## Structure du projet

```
├── index.html
├── db.json
├── js/
│   ├── api.js
│   ├── rules.js
│   ├── storage.js
│   ├── ui.js
│   └── main.js
└── src/
    ├── input.css
    └── output.css
```

| Fichier | Rôle |
|---|---|
| `api.js` | Le seul fichier qui appelle `fetch` : `request(method, route, body)` et les fonctions d'appel (`getCreatures`, `getCreature`, `createCreature`, `updateCreature`, `deleteCreature`) |
| `rules.js` | Les règles, sans DOM : `validateCreature(data)` |
| `storage.js` | Le dernier filtre (LocalStorage) et le brouillon du formulaire (SessionStorage), jamais les créatures |
| `ui.js` | L'affichage : grille, fiche, formulaire, messages |
| `main.js` | Le point de départ : les écouteurs, qui appellent `api.js` puis `ui.js` |

## Routes de l'API utilisées

| Méthode | Route | Usage |
|---|---|---|
| GET | `/creatures` | Liste des créatures |
| GET | `/creatures?attribute=Fire&q=dark&_sort=name&_order=asc` | Filtre, recherche et tri combinés |
| GET | `/creatures/:id` | Fiche d'une créature |
| POST | `/creatures` | Ajouter une créature |

## Choix techniques
- **Attribut = type** : dans l'univers Yu-Gi-Oh!, le type d'une créature correspond à son attribut ; le paramètre utilisé est donc `attribute`.
- **Gestion des erreurs** : chaque appel est dans un `try/catch` et vérifie `response.ok`. Une erreur serveur (avec statut) et une erreur réseau (json-server arrêté, sans statut) donnent des messages différents.
- **Sécurité** : les données de l'API sont affichées avec `createElement` et `textContent`.
- **Validation** : les règles sont dans `rules.js`, sans accès au DOM. Les valeurs du formulaire sont converties en nombres avant l'envoi.
- **Stats ATK/DEF** : bornes de 0 à 4000, adaptées aux cartes Yu-Gi-Oh!.




## Auteur

**Mohamed Id irrami**  
*YouCode 2026-2027 — Sprint 3*

Projet réalisé dans le cadre de la formation YouCode.