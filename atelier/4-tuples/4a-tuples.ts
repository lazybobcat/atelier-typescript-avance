/*
4a - Les tuples

Les tuples sont des types de tableaux pour lesquels on connait exactemment quels types il contient et à quelle position.

Comme pour "readonly" et "as const", les tuples sont des assertions et ne servent qu'à la compilation.
*/

/*
A la compilation on sait très exactement que MonTuple est décrit tel que :
    - à l'index 0, il y a un nombre
    - à l'index 1, il y a une chaîne de caractères
    - à l'index 2, il y a un booléen
*/
type MonTuple = [number, string, boolean];

{
  const données: MonTuple = [1, 'hello', true];
  const hello = données[1].toLocaleUpperCase(); // Typescript sait que données[1] est de type "string"
  //    ^?
}

{
  const données: MonTuple = [1, 'hello', true];
  // @ts-expect-error : MonTuple a une longueur de 3, on ne peut pas accéder à un 4e élément
  const error = données[3]; // Typescript sait que données[3] n'existe pas
}

/*
Les tuples peuvent avoir des éléments facultatifs mais ils doivent être placés en dernier
*/
{
  type Vecteur2dOu3d = [number, number, number?];
  const coord1: Vecteur2dOu3d = [1, 2];
  const coord2: Vecteur2dOu3d = [1, 2, 3];

  it('Devrait avoir une longueur de définie à la compilation', () => {
    expect(coord1.length).toEqual(2);
    //            ^?
    expect(coord2.length).toEqual(3);
  });
}

/*
Les tuples peuvent avoir un nombre d'éléments variable
*/
{
  type StringThenNumbers = [string, ...number[]];
  const numbers: StringThenNumbers = ['primes', 1, 3, 5, 7, 11, 13, 17, 19];
}

// L'utilisation la plus courante d'un tuple est avec l'opérateur RxJs "combineLatest" qui en renvoie un (https://www.learnrxjs.io/learn-rxjs/operators/combination/combinelatest).

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';
