<h1 style="font-size: 11px; margin-bottom: 1rem;">
Unions
</h1>

```typescript
type Shape =
  | { type: 'cercle'; rayon: number }
  | { type: 'carré'; côté: number };
```

## Introduction

Lorsqu'on a une liste de valeurs possibles pour un type, on pense tout de suite aux <code>enum</code> ou aux <code>union</code>. Je vais vous montrer pourquoi on peut aller un peu plus loin avec les <code>union</code> et comment elles permettent de réduire un type à un type plus spécifique.

Essayer c'est adopter.

## Sommaire

<ol style="list-style-type: lower-alpha">
    <li>Eviter le type <code>string</code></li>
    <li>Unions VS Enums</li>
    <li>Discriminated unions</li>
    <li>Conversion en union</li>
</ol>

## Après ce chapitre je saurai

- &Eacute;viter d'utiliser un type "string" si un paramètre ou attribut a une liste de valeurs possibles définies
- Les différences entre une <code>union</code> et un <code>enum</code>
- Réduire le type en un type plus spécifique avec une <code>union</code>
- Convertir les clés de différents types en <code>union</code> dynamiquement à la compilation
