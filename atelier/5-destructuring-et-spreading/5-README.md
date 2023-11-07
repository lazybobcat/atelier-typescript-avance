<h1 style="font-size: 11px; margin-bottom: 1rem;">
Destructuring et spreading
</h1>

```typescript
const setViewMode = (state: ComponentState, viewMode: 'read' | 'edit') => ({
  ...state,
  viewMode,
});
```

## Introduction

Dans ce chapitre je vais utiliser la "destructu..." la "destructurati..." le destructuring pour assigner les valeurs des attributs d'un objet ou d'un tableau directement dans des variables.

Je vais également utiliser l'opérateur spread (<code>...</code>) pour copier et modifier les éléments d'un tableau ou d'un objet à la volée. On rappellera également son utilisation pour un nombre variables de paramètres.

## Sommaire

<ol style="list-style-type: lower-alpha">
    <li>Destructuring</li>
    <li>Spreading</li>
</ol>

## Après ce chapitre je saurai

- Décomposer un objet ou un tableau en différentes variables
- Utiliser l'opérateur "spread" pour cloner un objet ou passer un nombre variable de paramètres
