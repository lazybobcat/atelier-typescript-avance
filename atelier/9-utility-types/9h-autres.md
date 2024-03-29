<h1 style="font-size: 11px; margin-bottom: 1rem;">
Utility types / 9h. Autres types et en apprendre plus
</h1>

D'autres utility types sont disponibles sur [https://www.typescriptlang.org/docs/handbook/utility-types.html](https://www.typescriptlang.org/docs/handbook/utility-types.html)

Vous pouvez aussi définir vos propres types. Voici par exemple le `Prettify<>` et `StartsWith<>` utilisés dans cette présentation :

```typescript
export type Prettify<T> = {
  [K in keyof T]: T[K];
};

export type StartsWith<
  T extends string,
  U extends string,
> = T extends `${U}${string}` ? T : never;
```

Ou par exemple l'implémentation d'un type du premier élément d'un tuple/array :

```typescript
type First<T extends unknown[]> = T extends [] ? never : T[0];
```

## Liens pour en apprendre plus

Les tutoriels vidéo de Matt Pocock sur TotalTypescript sont parfait pour commencer : [https://www.totaltypescript.com/](https://www.totaltypescript.com/). Les tutoriels "débutant" sont gratuits (je mets "débutant" entre guillemets parce qu'il faut déjà avoir un bon niveau en Typescript).

Si vous aimez les types et le challenge, il y en a environ 170 de difficulté facile à extrême sur ce dépôt Github : [https://github.com/type-challenges/type-challenges](https://github.com/type-challenges/type-challenges). Même si vous ne faites pas les challenges, c'est une bonne source de types sympas.
