/*
0b. Functions et Arrow functions

On peut simplifier l'écriture des fonctions en "arrow functions" ayant une syntaxe moins verbeuse.

Ces deux fonctions sont équivalentes :
*/

function classicHello(name: string): string {
  return `Hello ${name}`;
}

// Cette fonction peut même être raccourcie davantage
const arrowHello = (name: string): string => {
  return `Hello ${name}`;
};

/*
Cette fonction peut même être raccourcie davantage :

const arrowHello = (name: string): string => `Hello ${name}`;
      ^             ^              ^                ^
      nom           paramètres     type de retour   corps de la fonction (return implicite)
*/

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';

it('Les deux notations de fonctions sont équivalentes', () => {
  expect(classicHello('World')).toEqual(arrowHello('World'));
});
