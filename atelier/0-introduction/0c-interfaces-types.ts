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
Le choix est matière de préférence, tant que vous restez cohérent dans toute
l'application.

Les types permettent de déclarer plus que des interfaces alors que les 
interfaces seront toujours des interfaces. Si le type peut changer, alors
"type" est plus indiqué.
*/

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';

it('Les deux notations de fonctions sont équivalentes', () => {
  expect(addition({ first: 10, second: 32 })).toEqual(42);
});
