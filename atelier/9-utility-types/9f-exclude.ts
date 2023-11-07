/*
Utility types / 9f. Exclude
===========================

Exclude est un "utility type" qui permet de créer une nouvelle union en excluant d'une anciene union tout ce dont on ne veut pas.
*/

{
  type Couleurs = 'rouge' | 'vert' | 'bleu' | 'jaune' | 'rose';

  type RGB = Exclude<Couleurs, 'jaune' | 'rose'>;

  type Pretty = Prettify<RGB>;
  //   ^?
}

{
  type Forme =
    | { type: 'cercle'; r: number }
    | { type: 'rectangle'; x: number; y: number }
    | { type: 'triangle'; b: number; h: number };

  type PasDeCercle = Exclude<Forme, { type: 'cercle' }>;

  type Pretty = Prettify<PasDeCercle>;
  //   ^?

  const aire = (forme: PasDeCercle): number => {
    switch (forme.type) {
      case 'rectangle':
        return forme.x * forme.y;
      case 'triangle':
        return (forme.b * forme.h) / 2;
    }
  };
  const carré: Forme = { type: 'rectangle', x: 10, y: 10 };
  const cercle: Forme = { type: 'cercle', r: 10 };

  aire(carré);
  // @ts-expect-error : cercle n'est pas un PasDeCercle
  aire(cercle);
}

/* _____________ Test Cases _____________ */
import { it } from 'vitest';
import { Equal, Expect, Prettify } from '..';

it('Exclude<Couleurs, ...> devrait être identique à une union avec tous les membres sauf ceux exclus', () => {
  type Couleurs = 'rouge' | 'vert' | 'bleu' | 'jaune';
  type Expected = 'rouge' | 'vert' | 'bleu';

  type cases = [Expect<Equal<Expected, Exclude<Couleurs, 'jaune'>>>];
  // @ts-expect-error : les types sont différents
  type errors = [Expect<Equal<Expected, Couleurs>>];
});
