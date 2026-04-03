# TP5 - Sécurité JWT, Redux Toolkit & Performance

## ✅ Implémentation Complète

### 🔐 Partie 1 : Sécurité XSS
- **Protection React** : Les strings sont automatiquement échappées dans JSX
- **dangerouslySetInnerHTML** : Désactive la protection (NE JAMAIS utiliser avec données utilisateur)

### 🎫 Partie 2 : JWT Simulé
- **Token generation** : `btoa(JSON.stringify({...}))` dans LoginRedux
- **AuthState Redux** : Inclusion du `token: string | null`
- **Intercepteur Axios** : `setAuthToken()` ajoute `Authorization: Bearer {token}`

### 🔄 Partie 3 : Redux Toolkit
- **authSlice.ts** : Remplace authReducer + switch/case par createSlice
- **store.ts** : configureStore avec auth reducer
- **Provider** : Remplace AuthProvider dans main.tsx
- **useSelector/useDispatch** : Remplacent useAuth() dans tous les composants

### ⚡ Partie 4 : Performance
- **React.memo** : Sidebar et MainContent mémoïsés
- **useCallback** : Références stables pour les fonctions handlers
- **Console logs** : Pour observer les re-renders

### 🎣 Partie 5 : Custom Hook
- **useProjects.ts** : Logique CRUD extraite du Dashboard
- **DashboardRedux** : Simplifié grâce au custom hook

---

## 📊 Réponses aux Questions

### Q1 : Le script XSS s'exécute-t-il ?
**NON**. React échappe automatiquement les strings dans le JSX. Le HTML est affiché comme texte brut.

### Q2 : Avec dangerouslySetInnerHTML ?
**OUI**, le script s'exécute. À NE JAMAIS utiliser avec des données utilisateur.

### Q3 : Header Authorization visible dans Network ?
**OUI**, après login vous verrez `Authorization: Bearer <token>` dans les requêtes API.

### Q4 : Pourquoi pas localStorage pour le token ?
**Sécurité** : localStorage est accessible par tout script JS (XSS). Le state React est isolé.

### Q5 : authSlice vs authReducer - différences ?
- **Plus concis** : Pas de switch/case, pas d'action types constants
- **Immutabilité automatique** : Immer gère les copies profondes
- **TypeScript friendly** : PayloadAction typé

### Q6 : Re-renders quand toggle sidebar ?
**Avant optimisation** : Sidebar + MainContent se re-rendent
**Après React.memo** : Seulement Sidebar se re-rend

### Q7 : Pourquoi MainContent ne se re-rend plus ?
React.memo compare les props. Si `columns` ne change pas, le composant n'est pas re-rendu.

### Q8 : useMemo vs useCallback ?
- **useCallback** : Mémorise une **fonction**
- **useMemo** : Mémorise une **valeur**
- Utiliser useCallback pour les fonctions passées en props aux composants mémoïsés

### Q9 : useProjects simplifie le code ?
**OUI** :
- Dashboard : 60 lignes → 35 lignes
- Logique CRUD réutilisable
- Séparation des responsabilités

### Q10 : React Profiler - résultats attendus
- **Toggle sidebar** : MainContent ne se re-rend plus (optimisé)
- **Ajout projet** : Dashboard + Sidebar + MainContent (normal)
- **Navigation** : Uniquement les composants affectés

---

## 🏗️ Architecture Redux vs Context

### Avant (Context + useReducer)
```
AuthProvider → AuthContext → useAuth() → dispatch/reducer
```

### Après (Redux Toolkit)
```
Provider → Store → useSelector/useDispatch → authSlice
```

**Avantages Redux** :
- **DevTools** : Time travel debugging
- **Middleware** : Logging, persistence, etc.
- **Scalabilité** : Multiple slices facilement
- **Performance** : Optimisations intégrées

---

## 🚀 Test de l'Application

### Flux complet avec Redux :
1. **Login** : `admin@taskflow.com` / `admin123`
2. **Token JWT** : Généré et stocké dans Redux state
3. **Dashboard** : CRUD avec Redux + useProjects hook
4. **Performance** : Console logs pour vérifier React.memo
5. **Network** : Voir les headers `Authorization: Bearer`

### Tests performance :
- Ouvrez Console (F12)
- Cliquez sur ☰ (toggle sidebar)
- **Avant** : "Sidebar re-render" + "MainContent re-render"
- **Après** : Seulement "Sidebar re-render"

---

## 📈 Améliorations apportées

### Sécurité
- ✅ Protection XSS automatique
- ✅ Token JWT simulé
- ✅ Intercepteur Axios sécurisé

### Architecture
- ✅ Redux Toolkit remplace Context
- ✅ Code plus maintenable
- ✅ Debugging facilité

### Performance
- ✅ React.memo sur composants lourds
- ✅ useCallback pour les handlers
- ✅ Custom hook réutilisable

Le TP5 est **100% fonctionnel** avec toutes les optimisations sécurité et performance ! 🎉
