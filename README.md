# D-sign Print

Site vitrine + back-office pour **D-sign Print**, une entreprise camerounaise de design graphique et d'impression.

Le site public présente les prestations, le portfolio de réalisations, un blog, et permet à un visiteur de demander un
devis ou de contacter l'entreprise en quelques clics (avec un accès direct WhatsApp, essentiel au Cameroun). Le
back-office permet à l'équipe de gérer tout ce contenu sans toucher au code : services, réalisations, articles,
témoignages clients, demandes de devis, messages de contact, paramètres de l'entreprise et comptes utilisateurs.

> 💳 Aucun moyen de paiement en ligne n'est intégré (choix volontaire). Les devis sont négociés et réglés hors ligne
> (espèces, Mobile Money, virement...).

---

## Sommaire

- [Stack technique](#stack-technique)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Démarrage rapide](#démarrage-rapide)
  - [Avec Docker (recommandé)](#avec-docker-recommandé)
  - [Sans Docker](#sans-docker)
  - [Variables d'environnement](#variables-denvironnement)
  - [Créer le premier compte admin](#créer-le-premier-compte-admin)
- [Structure du dépôt](#structure-du-dépôt)
- [Faire évoluer le projet](#faire-évoluer-le-projet)
- [Pistes d'amélioration](#pistes-damélioration)

---

## Stack technique

| | |
|---|---|
| **Backend** | Node.js, Express 4, TypeScript (ESM), MongoDB + Mongoose, JWT (access + refresh en cookies), Zod, Cloudinary, Multer, Nodemailer |
| **Frontend** | React 19, Vite, TypeScript, React Router 7, TanStack Query, React Hook Form + Zod, Tailwind CSS 4, shadcn/ui (Base UI) |
| **Infra** | Docker / docker-compose (MongoDB + serveur + client) |

Architecture backend en couches : `routes → controllers → services → repositories → models`, avec des interfaces de
repository (`interfaces/repositories`) pour garder la logique métier découplée de Mongoose.

Architecture frontend en **features** (`src/features/<domaine>`), chaque feature regroupant ses `types`, `services`
(appels API), `hooks` (TanStack Query), `schemas` (validation Zod des formulaires), `components` et `pages`.

## Fonctionnalités

### Site public
- Page d'accueil (hero, prestations, réalisations mises en avant, témoignages, appel à l'action)
- Liste et détail des **services** (prestations)
- Galerie **portfolio** filtrable par catégorie
- **Blog** (liste + articles détaillés)
- Formulaire de **demande de devis** (avec upload de fichiers/maquettes)
- Formulaire de **contact**
- Bouton **WhatsApp** flottant sur tout le site
- Pied de page avec coordonnées, horaires et réseaux sociaux — alimentés dynamiquement depuis le back-office

### Back-office (`/admin`, rôles `admin` / `editor`)
- Tableau de bord avec statistiques (services, réalisations, articles, témoignages en attente, messages non lus,
  devis par statut)
- Gestion des services, réalisations, articles de blog, témoignages (avec modération avant publication)
- Suivi des demandes de devis (changement de statut, notes internes)
- Boîte de réception des messages de contact
- Gestion des utilisateurs du back-office (réservé aux administrateurs)
- Paramètres de l'entreprise (coordonnées, réseaux sociaux, horaires — utilisés partout sur le site public)

## Architecture

```
d-sign-print/
├── server/                # API Express (TypeScript)
│   └── src/
│       ├── models/         # Schémas Mongoose
│       ├── repositories/   # Accès aux données (implémentent interfaces/repositories)
│       ├── services/       # Logique métier
│       ├── controllers/    # Gestion req/res
│       ├── routes/         # Définition des routes Express
│       ├── validators/     # Schémas Zod par ressource
│       ├── middlewares/    # auth, validation, upload, gestion d'erreurs
│       ├── constants/      # Enums partagés (rôles, catégories, statuts...)
│       └── utils/          # JWT, cookies, slugify, pagination, Cloudinary...
│
└── client/                # Application React (Vite)
    └── src/
        ├── features/        # Un dossier par domaine métier (voir ci-dessous)
        ├── components/      # ui/ (shadcn), layout/ (Navbar, Footer, AdminLayout), shared/, pages/
        ├── contexts/        # AuthContext, ThemeContext
        ├── router/          # Déclaration des routes
        └── lib/             # axios, query client, upload, utils
```

Chaque feature suit la même convention :

```
features/<domaine>/
├── types/        # Types TypeScript du domaine
├── services/      # Appels API (axios)
├── hooks/         # useQuery / useMutation (TanStack Query)
├── schemas/        # Validation Zod des formulaires
├── components/     # Formulaires et éléments réutilisables
└── pages/          # Pages publiques et/ou admin
```

## Démarrage rapide

### Prérequis
- Node.js ≥ 20
- Docker et docker-compose (recommandé) **ou** une instance MongoDB locale
- Un compte [Cloudinary](https://cloudinary.com/) gratuit (obligatoire pour l'upload d'images : portfolio, blog,
  témoignages, pièces jointes de devis)

### Avec Docker (recommandé)

```bash
git clone <url-du-repo>
cd d-sign-print

cp server/.env.example server/.env
# éditer server/.env : au minimum renseigner CLOUDINARY_*, JWT_SECRET, JWT_REFRESH_SECRET, COOKIE_SECRET

docker-compose up --build
```

- Client : http://localhost:5173
- API : http://localhost:5000/api
- MongoDB : `localhost:27017`

### Sans Docker

**Backend**
```bash
cd server
cp .env.example .env   # puis éditer les valeurs
npm install
npm run seed:admin      # crée le premier compte administrateur
npm run dev              # http://localhost:5000
```

**Frontend** (dans un autre terminal)
```bash
cd client
cp .env.example .env.local   # ou .env — VITE_API_URL=http://localhost:5000/api
npm install
npm run dev              # http://localhost:5173
```

### Variables d'environnement

Toutes les variables sont documentées dans `server/.env.example` et `client/.env.example`. Les plus importantes :

| Variable | Description |
|---|---|
| `MONGODB_URI` | Chaîne de connexion MongoDB |
| `JWT_SECRET` / `JWT_REFRESH_SECRET` | Secrets de signature des tokens (≥ 10 caractères) |
| `COOKIE_SECRET` | Secret de signature des cookies |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Identifiants Cloudinary (upload d'images) |
| `SMTP_*` | Identifiants d'envoi d'email (notifications, non branché par défaut sur les devis/contacts — voir [pistes d'amélioration](#pistes-damélioration)) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Identifiants du compte admin créé par `npm run seed:admin` |
| `VITE_API_URL` (client) | URL de base de l'API consommée par le frontend |

### Créer le premier compte admin

```bash
cd server
npm run seed:admin
```

Utilise `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` définis dans `.env`. Connectez-vous ensuite sur
`/login` avec ces identifiants, puis créez d'autres comptes depuis **Utilisateurs** dans le back-office.

## Structure du dépôt

Voir [Architecture](#architecture) ci-dessus. Les points d'entrée utiles pour se repérer rapidement :

- `server/src/app.ts` — assemblage de tous les routers Express
- `client/src/router/index.tsx` — toutes les routes de l'application (publiques + admin)
- `client/src/constants/routes.constant.ts` — chemins centralisés (à utiliser plutôt que des URLs en dur)

## Faire évoluer le projet

Pour ajouter une nouvelle ressource CRUD (ex : "FAQ", "Newsletter"...), le plus simple est de dupliquer un module
existant proche en complexité et d'adapter :

**Backend** — reproduire pour votre ressource les 6 fichiers du module `portfolio` (ou plus simple, `testimonial`) :
`models/X.model.ts`, `types/x.types.ts`, `interfaces/repositories/IXRepository.ts`, `repositories/x.repository.ts`,
`services/x.service.ts`, `validators/x.validator.ts`, `controllers/x.controller.ts`, `routes/x.routes.ts`, puis monter
le router dans `app.ts`.

**Frontend** — créer `features/x/` avec les 5 sous-dossiers (`types`, `services`, `hooks`, `schemas`,
`components`/`pages`), en copiant le module `testimonials` comme modèle (c'est le plus simple des modules avec
modération). Ajouter les routes dans `router/index.tsx` et les liens de navigation dans `AdminLayout.tsx`.

Pour l'upload d'images dans un nouveau formulaire, réutilisez le composant `components/shared/ImageUploader.tsx` et
l'endpoint générique `POST /api/uploads/image?folder=<nom>` (déjà branché sur Cloudinary).

## Pistes d'amélioration

Idées non implémentées, à considérer selon les besoins réels une fois le site en production :

- **Paiement en ligne** (Mobile Money / carte) — volontairement exclu de cette version
- **Notifications email automatiques** à la réception d'un devis ou d'un message de contact (Nodemailer est déjà
  configuré côté serveur mais pas encore branché sur ces événements)
- **Espace client** avec suivi de commande (mentionné en phase de réflexion produit, non développé ici)
- **Internationalisation FR/EN** — le contenu est actuellement rédigé en français uniquement
- **Découpage du bundle frontend** (`React.lazy` par route) — le bundle de production dépasse actuellement 500 Ko ;
  fonctionnel mais à optimiser pour les connexions plus lentes
- **Tests automatisés** (aucun test unitaire/E2E n'est présent actuellement)
- **Configuration ESLint côté serveur** — un script `lint` existe dans `package.json` mais aucun fichier
  `eslint.config.*` n'est encore présent
- Mettre à jour `multer` vers sa version 2.x (la 1.x utilisée est fonctionnelle mais signalée comme dépréciée)
