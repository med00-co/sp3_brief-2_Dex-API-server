# Mon Dex — Dex API Server (Yu-Gi-Oh!)

Projet YouCode — Sprint 3, Brief 2 : *Le Dex et mes équipes*.

Évolution de mon Dex du Sprint 2 : `data.js` et le LocalStorage sont remplacés par une API locale **json-server**. L'application lit, ajoute, modifie et supprime les créatures (cartes Yu-Gi-Oh!) via `fetch`, avec `async/await`, `try/catch` et la vérification de `response.ok`.

## Fonctionnalités

### Partie 1 — Le Dex connecté à l'API
- Affichage des créatures avec `GET /creatures` (message « Chargement… » et message clair si l'API ne répond pas)
- Filtre par attribut envoyé à l'API (`?attribute=`) ; « Tous » affiche toutes les créatures
- Recherche côté serveur (`?q=`), combinable avec le filtre, avec un message quand aucune créature ne correspond
- Mémorisation du dernier filtre dans le **LocalStorage**

### Partie 2 — Trier, consulter et ajouter
- Tri par nom ou par numéro (`?_sort=` et `&_order=`), combinable avec la recherche et le filtre
- Fiche détaillée avec `GET /creatures/:id` : image, attribut, étoiles, ATK/DEF, description ; message « Créature introuvable » si l'API répond 404
- Ajout d'une créature avec `POST /creatures`
- Validation avant l'envoi (`validateCreature`) avec un message sous chaque champ erroné
- Brouillon du formulaire d'ajout dans le **SessionStorage** : il revient après un rechargement, il est effacé à l'ajout et à la réinitialisation, et il disparaît à la fermeture de l'onglet

### Partie 3 — Modifier, supprimer et finition
- Modification avec `PUT /creatures/:id` : le formulaire s'ouvre rempli avec les valeurs de la créature, la même validation s'applique
- Suppression avec `DELETE /creatures/:id` après confirmation
- États de l'interface : bouton désactivé pendant l'envoi, message de succès ou d'erreur, puis rechargement de la grille depuis l'API en gardant la recherche, le filtre et le tri
- Cas d'erreur testés : json-server arrêté, créature introuvable (404)

### Bonus
- « Mes équipes » (`/teams`) : non réalisé.

## Technologies
- HTML5, Tailwind CSS
- JavaScript (modules ES), Fetch API, async/await
- LocalStorage et SessionStorage
- json-server **0.17.4**

## Prérequis
- Node.js et npm
- Un serveur local pour la page (par exemple l'extension Live Server), car les modules ES ne fonctionnent pas en `file://`

## Installation

```bash
git clone https://github.com/med00-co/sp3_brief-2_Dex-API-server
cd sp3_brief-2_Dex-API-server
npm install
```

## Lancer le projet

1. Lancer l'API (laisser ce terminal ouvert pendant l'utilisation) :

```bash
npx json-server --watch db.json --port 3000
```

L'API répond sur `http://localhost:3000`. Il faut bien la version **0.17.4** : les filtres et les tris en dépendent.

2. Compiler Tailwind (adapter la commande à `package.json`) :

```bash
npm run dev
```

3. Ouvrir `index.html` avec Live Server.

> L'API tourne sur l'ordinateur : le projet se montre en local (pas sur GitHub Pages). Le fichier `db.json` fait partie du rendu.

## Structure du projet

```
├── index.html
├── db.json
├── package.json
├── README.md
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
| `js/api.js` | Le seul fichier qui appelle `fetch` : `request(method, route, body)` et les fonctions d'appel `getCreatures(params)`, `getCreature(id)`, `createCreature(data)`, `updateCreature(id, data)`, `deleteCreature(id)` |
| `js/rules.js` | Les règles, sans DOM : `validateCreature(data)` |
| `js/storage.js` | Le dernier filtre (LocalStorage) et le brouillon du formulaire (SessionStorage), jamais les créatures elles-mêmes |
| `js/ui.js` | L'affichage : grille, fiche, formulaire, messages |
| `js/main.js` | Le point de départ : les écouteurs, qui appellent `api.js` puis `ui.js` |

## Routes de l'API utilisées

| Méthode | Route | Usage |
|---|---|---|
| GET | `/creatures` | Liste des créatures |
| GET | `/creatures?attribute=Fire&q=dark&_sort=name&_order=asc` | Filtre, recherche et tri combinés |
| GET | `/creatures/:id` | Fiche d'une créature |
| POST | `/creatures` | Ajouter une créature |
| PUT | `/creatures/:id` | Modifier (remplacer) une créature |
| DELETE | `/creatures/:id` | Supprimer une créature |

## Gestion des erreurs
- Chaque appel passe par `request()`, qui vérifie `response.ok` et lance une erreur contenant le statut HTTP.
- Chaque appel est dans un `try/catch` côté `main.js`.
- Trois cas sont distingués :
  - **404** : « Créature introuvable » ;
  - **autre erreur HTTP** : message avec le code ;
  - **pas de statut** (json-server arrêté) : « Impossible de joindre l'API. Vérifie que json-server est lancé. »
- Pendant un envoi, le bouton est désactivé puis réactivé dans un `finally`.

## Choix techniques
- **Attribut = type** : dans l'univers Yu-Gi-Oh!, le type d'une créature correspond à son attribut ; le paramètre utilisé est donc `attribute`.
- **`id` et `numero`** : `id` est attribué par json-server ; `numero` est le numéro de la carte affiché dans l'interface et utilisé pour le tri.
- **Validation sans DOM** : les règles sont dans `rules.js`. Les valeurs du formulaire sont validées en texte, puis converties en nombres avant l'envoi.
- **Statistiques ATK/DEF** : bornes de 0 à 4000, adaptées aux cartes Yu-Gi-Oh! (les bornes sont des constantes en haut de `rules.js`).
- **Stockage** : seuls le dernier filtre et le brouillon sont stockés ; les créatures viennent toujours de l'API.
- **Un seul `fetch`** : tous les appels réseau passent par `api.js`.
- **Affichage sécurisé** : les données de l'API sont affichées avec `createElement` et `textContent`.

## Difficultés rencontrées
- Distinguer une erreur réseau (sans statut) d'une erreur HTTP : `fetch` ne rejette pas la promesse sur un 404, d'où la vérification de `response.ok`.
- Garder la recherche, le filtre et le tri ensemble : un seul objet `params` est partagé et envoyé à l'API.
- Éviter que le clic sur « Modifier » ou « Supprimer » ouvre aussi la fiche : gestion des clics par délégation d'événements, en traitant les boutons avant la carte.
- Ne pas mélanger le brouillon d'ajout et le formulaire de modification.

## Améliorations possibles
- La partie bonus « Mes équipes ».
- Pagination avec `_page` et `_limit`.
- Recherche avec debounce.



## Auteur

**Mohamed Id irrami**  
*YouCode 2026-2027 — Sprint 3*

Projet réalisé dans le cadre de la formation YouCode.