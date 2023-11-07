/*
Xg- Extract

Extract est un "utility type" qui permet de créer une nouvelle union en ne gardant que les membres d'une ancienne union qui correspondent à un type donné.
C'est en quelque sorte l'opposé de Exclude.
*/

{
  type Couleurs = 'rouge' | 'vert' | 'bleu' | 'jaune' | 'rose';

  type RGB = Extract<Couleurs, 'rouge' | 'vert' | 'bleu'>;

  type Pretty = Prettify<RGB>;
  //   ^?
}

{
  type Forme =
    | { type: 'cercle'; r: number }
    | { type: 'rectangle'; x: number; y: number }
    | { type: 'carré'; x: number }
    | { type: 'trapèze'; x: number; y: number; h: number }
    | { type: 'triangle'; b: number; h: number };

  type Quadrilatere = Extract<
    Forme,
    { type: 'rectangle' } | { type: 'carré' } | { type: 'trapèze' }
  >;

  type Pretty = Prettify<Quadrilatere>;
  //   ^?

  const aire = (forme: Quadrilatere): number => {
    switch (forme.type) {
      case 'rectangle':
        return forme.x * forme.y;
      case 'carré':
        return forme.x * forme.x;
      case 'trapèze':
        return ((forme.x + forme.y) * forme.h) / 2;
    }
  };
  const carré: Forme = { type: 'carré', x: 10 };
  const cercle: Forme = { type: 'cercle', r: 10 };

  aire(carré);
  // @ts-expect-error : cercle n'est pas un Quadrilatere
  aire(cercle);
}

/* _____________ Test Cases _____________ */
import { it } from 'vitest';
import { Equal, Expect, Prettify } from '..';

it('Exclude<Couleurs, ...> devrait être identique à une union avec tous les membres sauf ceux exclus', () => {
  type Couleurs = 'rouge' | 'vert' | 'bleu' | 'jaune';
  type Expected = 'rouge' | 'vert' | 'bleu';

  type cases = [
    Expect<Equal<Expected, Extract<Couleurs, 'rouge' | 'vert' | 'bleu'>>>,
  ];
  // @ts-expect-error : les types sont différents
  type errors = [Expect<Equal<Expected, Couleurs>>];
});
