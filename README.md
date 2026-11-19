# Mon Dex - Yu-Gi-Oh! (API)

Application web de gestion d'un Dex de créatures Yu-Gi-Oh!, connectée à une API locale via `json-server`.  
Ce projet remplace les données statiques et le `LocalStorage` par une véritable API REST.

---

## Fonctionnalités (Partie 1)

- **Affichage dynamique :** Récupération et affichage de la liste des créatures depuis l'API.
- **Filtrage par attribut :** Tri des créatures (`Fire`, `Water`, `Dark`, `Earth`, `Wind`, `Light`, `Divine`).
- **Recherche textuelle :** Recherche instantanée via paramètre de requête (`?q=`).
- **Filtrage combiné :** Association simultanée du filtre par attribut et de la recherche textuelle.
- **Gestion des états UI :**
  - Indicateur de chargement pendant les requêtes API.
  - Messages d'erreur explicites (ex. : serveur API arrêté) ou d'absence de résultats.
- **Persistance :** Mémorisation du dernier filtre sélectionné dans le `LocalStorage`.

---

## Prérequis

- **Node.js** (version 18 ou supérieure recommandée)
- **Serveur local** (extension *Live Server* sur VS Code ou équivalent)

---

## Installation et Lancement

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/med00-co/sp3_brief-2_Dex-API-server.git
   cd sp3_brief-2_Dex-API-server
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Démarrer le serveur API (`json-server` v0.17.4) :**
   ```bash
   npx json-server --watch db.json --port 3000
   ```
   > L'API sera accessible à l'adresse : `http://localhost:3000`

4. **Lancer l'interface front-end :**
   - Ouvrir le dossier du projet avec **Live Server** (ou tout autre serveur HTTP local).

---

## Structure du projet

| Fichier | Rôle |
| :--- | :--- |
| `js/api.js` | Centralise `request()` (unique point d'appel `fetch`) et les méthodes API (`getCreatures`, `getCreature`, `createCreature`, etc.). |
| `js/rules.js` | Contient la logique et les règles de validation métier (découplées du DOM). |
| `js/storage.js` | Gère le `LocalStorage` (dernier filtre) et le `SessionStorage` (brouillon de formulaire). |
| `js/ui.js` | Gère le rendu de l'interface : grille des créatures, états de chargement et messages d'alerte. |
| `js/main.js` | Point d'entrée de l'application : initialisation, écouteurs d'événements et orchestration. |

---

## Routes API utilisées (Partie 1)

| Méthode | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/creatures` | Récupère la liste complète des créatures. |
| `GET` | `/creatures?attribute=Dark` | Filtre les créatures par attribut. |
| `GET` | `/creatures?q=magician` | Effectue une recherche textuelle globale. |
| `GET` | `/creatures?attribute=Dark&q=magician` | Combine le filtre d'attribut et la recherche textuelle. |

---

## Choix techniques

- **Centralisation réseau :** Tous les appels HTTP transitent exclusivement par la fonction `request()` dans `js/api.js`.
- **Sécurité et manipulation du DOM :** Création sécurisée des éléments via `document.createElement` et `textContent` (aucun `innerHTML` utilisé pour les données dynamiques).
- **Asynchronisme et robustesse :** Utilisation de `async/await`, blocs `try/catch` et vérification systématique de `response.ok`.
- **Persistance utilisateur :** Sauvegarde automatique du dernier filtre actif dans le `LocalStorage`.

---

## Auteur

**Mohamed Id irrami**  
*YouCode 2026-2027 — Sprint 3*