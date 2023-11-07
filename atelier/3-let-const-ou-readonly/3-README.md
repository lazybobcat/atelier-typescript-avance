<h1 style="font-size: 11px; margin-bottom: 1rem;">
<code>let</code>, <code>const</code> ou <code>readonly</code>
</h1>

```typescript
const duchesse = {
  nom: 'Duchesse',
  vies: 9,
} as const;
```

## Introduction

![meme let const et var](../../images/meme_let-const.jpg)

## Sommaire

<ol style="list-style-type: lower-alpha">
    <li><code>let</code></li>
    <li><code>const</code></li>
    <li><code>readonly</code></li>
    <li><code>as const</code></li>
</ol>

## Après ce chapitre je saurai

- Quand utiliser <code>const</code> et quand utiliser <code>let</code>
- Les pièges posés par <code>const</code> avec les objets et tableaux
- Eviter ces pièges en utilisant <code>as const</code>
- Marquer des propriétés d'un objet avec <code>readonly</code> pour les rendre constantes
