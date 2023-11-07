<h1 style="font-size: 11px; margin-bottom: 1rem;">
Introduction et notations
</h1>

```typescript
const foo = (arg: string): number => 42;
```

## Introduction

Dans cet atelier je vais utiliser des commentaires afin de désactiver les erreurs Typescript sur certaines lignes afin de laisser les tests unitaires s'éxécuter (<code>// @ts-expect-error</code>). Nous verrons ensemble comment corriger ces erreurs.

Nous ferons également un rappel sur l'écriture raccourcie des fonctions et des types que j'utiliserai dans le reste du code.

## Sommaire

<ol style="list-style-type: lower-alpha">
    <li><code>tsconfig.json</code></li>
    <li>Notation des fonctions</li>
    <li>Interfaces et Types</li>
    <li>Types anonymes</li>
</ol>

## Après ce chapitre je saurai

- Où se situent les configurations de Typescript
- Activer le mode de compilation "stricte"
- Lire et écrire des fonctions sous toutes leurs formes
- Les différences entre <code>interface</code>, <code>class</code> et <code>type</code>
