/*
0c. Interfaces et Types

Si on a une fonction prenant en paramètre un objet avec les propriétés "first"
et "second", on peut typer cet objet soit avec une interface, soit avec un
type :
*/

// interface MyCustomParam {}

// type MyCustomParam = {};

function addition(values: any): number {
  return values.first + values.second;
}




/*
Le choix est essentiellement matière de préférence, tant que vous restez cohérent dans toute
l'application.

Cependant il y a une chose très importante avec les interface, c'est qu'elles peuvent se surcharger
elles sont nommée pareil. Ce qui peut être très pratique, ou source de bugs. Par exemple :
*/

interface Fruit {
  nom: string;
}

// Pensez vous que "banane" peut contenir l'attribut "vitamines ?"
// const banane: Fruit = { nom: 'banane', vitamines: ['B6', 'B9'] };

interface Fruit {
  vitamines: string[];
}

const pomme: Fruit = { nom: 'pomme', vitamines: ['B', 'E', 'A'] };

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';

it('Les deux notations de fonctions sont équivalentes', () => {
  expect(addition({ first: 10, second: 32 })).toEqual(42);
});
