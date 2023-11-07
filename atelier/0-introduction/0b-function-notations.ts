/*
Introduction / 0b. Functions et Arrow functions
===============================================

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

/*
Avec la syntaxe raccourcie, il ne faut pas oublier les parenthèses autour du retour si c'est un objet,
sinon Typescript va croire que c'est le corps de la fonction et va afficher une erreur.
*/
const createPerson = (name: string, age: number) => ({
  id: Math.random(),
  name,
  age,
});
const paul = createPerson('Paul', 42);
//    ^?

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';

it('Les deux notations de fonctions sont équivalentes', () => {
  expect(classicHello('World')).toEqual(arrowHello('World'));
});
