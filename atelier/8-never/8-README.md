<h1 style="font-size: 11px; margin-bottom: 1rem;">
<code>never</code>
</h1>

```typescript
type FooBar = 'foo' | 'bar' | never; // ???
```

## Introduction

![meme never](../../images/meme_never.png)

Ce code ne devrait <code>never</code>\* être atteint. Jusqu'à ce qu'il le soit...

\*_never = jamais_

## Sommaire

<ol style="list-style-type: lower-alpha">
    <li><code>never</code></li>
</ol>

## Après ce chapitre je saurai

- Utiliser <code>never</code> lors de la réduction de type
- Utiliser <code>never</code> pour ne plus jamais oublier un <code>case</code> dans un <code>switch</code>
