/*
Unions / 6b. Union ou Enum
===========================

Lorsqu'on veut énumérer une liste de valeurs en Typescript, on peut utiliser une union ou un enum (ou un objet avec que des "const").
Quelles sont les différences ?
*/

/*
Sur cette page, nous allons utiliser une enumération de directions en exemple
*/
enum DirectionEnum {
  Left = 'left',
  Right = 'right',
  Top = 'top',
  Bottom = 'bottom',
}
const leftDirection: DirectionEnum = DirectionEnum.Left;

/*
Union, alternative à un enum. On sépare la valeur par des "|" (penser "ou").
*/
{
  // Exemple d'union
  type Direction = 'left' | 'right' | 'top' | 'bottom';
  //   ^?
  const direction: Direction = 'left';

  it('Devrait utiliser une union', () => {
    expect(direction).toBe('left');
    expect(leftDirection).toBe('left');
  });
}

/*
Les soucis avec Enum :
*/
{
  {
    /* PROBLEME 1 : par défaut, chaque clé est assignée à un number */
    enum DirectionEnum {
      Left,
      Right,
      Top,
      Bottom,
    }
    const foo = (direction: DirectionEnum) => {};

    /*
    Avant Typescript 5.0, ce code était valide ! On pouvait passer n'importe quel nombre pour une valeur de l'enum
    (https://www.typescriptlang.org/play?ts=4.9.5#code/N4KABGCmB2CuC2YAiBLATpAxgFxQe2gFE5FQIIAZSAM2wBpxyAlFAcwAt7GIAVPABwbkwAITzZseeELABfANwhGmAgGdsYanjxgAvGAAUAE3RZcBAFzJTOfERIBKPQD4wwBUogB6L2ACCAG4AhtAaPACe-JCqmGgo-BoArAB0AAx0YJiQmXhG2QCX2EEoGsEANih5YBaMWngGACwATA6KskA)
    */
    foo(42);
  }

  /* PROBLEME 2 : la transpilation peut générer beaucoup de code */
  /*
  Javascript n'a pas de type "enum" nativement, le transpileur est donc obligé de créer du code compliqué qui va alourdir
  le bundle final. Voici le code transpilé en Javascript :
  */
  //   let DirectionEnum;
  //   (function (DirectionEnum) {
  //     DirectionEnum[(DirectionEnum['Left'] = 0)] = 'Left';
  //     DirectionEnum[(DirectionEnum['Right'] = 1)] = 'Right';
  //     DirectionEnum[(DirectionEnum['Top'] = 2)] = 'Top';
  //     DirectionEnum[(DirectionEnum['Bottom'] = 3)] = 'Bottom';
  //   })(DirectionEnum || (DirectionEnum = {}));

  {
    /* PROBLEME 3 : On ne peut pas étendre un enum, mais on peut étendre une union */
    // ça n'existe pas :
    // enum DirectionEnum2 = DirectionEnum & { Diagonal = 'diagonal' };

    /*
    On peut étendre une union :
    */
    type DirectionUnion = 'left' | 'right' | 'top' | 'bottom';
    type IdleOrDirectionUnion = 'idle' | DirectionUnion;

    type pretty = Prettify<IdleOrDirectionUnion>;
    //   ^?
  }

  {
    /* PROBLEME 4 : On ne peut pas restreindre un enum (sans passer par une union...) */
    /*
    On peut passer Top ou Bottom alors qu'on ne voudrait pas :
    */
    const déplacementHorizontal = (direction: DirectionEnum) => {};
    // ??? const déplacementHorizontal = (direction: DirectionEnum.Left | DirectionEnum.Right) => {};

    // Avec des unions :
    type DirectionHorizontal = 'left' | 'right';
    type DirectionVertical = 'top' | 'bottom';
    type DirectionUnion = DirectionHorizontal | DirectionVertical;
    const déplacementHorizontal2 = (direction: DirectionHorizontal) => {};
    //                                         ^?

    /*
    Note : on peut aussi utiliser l'outils Extract<DirectionUnion, 'left' | 'right'> que nous verrons plus tard.
    */
  }
}

/*
Les avantages d'un Enum :
*/
{
  {
    /* Itération */
    /*
    Attention, c'est une boucle "for...in" et non "for...of", car on itère sur les clés de l'enum
    */
    for (const direction in DirectionEnum) {
      //       ^?
      const value = DirectionEnum[direction as keyof typeof DirectionEnum]; // On récupère la valeur de l'enum à partir de la clé
      //    ^?

      it("Devrait itérer sur les valeurs de l'enum", () => {
        expect(value).toEqual(direction.toLocaleLowerCase());
      });
    }

    /*
    On peut aussi le faire avec une union, mais il faut tricher en commençant avec un tuple :
    */
    const directions = ['left', 'right', 'top', 'bottom'] as const;
    type DirectionUnion = (typeof directions)[number];
    //   ^?

    for (const direction of directions) {
      // ...
    }
  }

  {
    /* Conditions simples */
    const isHorizontal = (direction: DirectionEnum) => {
      return (
        direction === DirectionEnum.Left || direction === DirectionEnum.Right
      );
    };

    /*
    On peut utiliser les valeurs littérales dans nos vérifications
    */
    const isHorizontalBis = (direction: DirectionEnum) => {
      return direction === 'left' || direction === 'toto';
    };
  }
}

/*
In fine, c'est avant tout une question de préférence ou de convention d'équipe.
Je suggèrerait d'utiliser une union par défaut (plus clair à mon avis), et d'utiliser un enum si on a besoin d'itérer sur les valeurs.
Nous allons également voir ensuite ce qu'il est possible de faire avec des unions qu'il serait impossible de faire avec des enums.
*/

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';
import { Prettify } from '..';
