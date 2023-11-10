<h1 style="font-size: 11px; margin-bottom: 1rem;">
Generics
</h1>

```typescript
function longest<TType extends { length: number }>(a: TType, b: TType) {
  return a.length >= b.length ? a : b;
}
```

## Introduction

Les types génériques permettent de réutiliser du code dans différents contextes et d'éviter de passer par <code>any</code> ou <code>unknown</code> tout en imposant des contraintes sur les types.

Pour ceux qui ont fait du C/C++, c'est le même concept que les templates.

## Sommaire

<ol style="list-style-type: lower-alpha">
    <li>Generics</li>
</ol>

## Après ce chapitre je saurai

- &Eacute;crire un type ou une fonction générique
- Préciser que le type générique doit avoir une forme donnée
