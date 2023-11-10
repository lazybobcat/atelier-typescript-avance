/*
Introduction / 0c. Interfaces et Types
=======================================

Si on a une fonction prenant en paramètre un objet avec les propriétés "first"
et "second", on peut typer cet objet soit avec une interface, soit avec un
type :
*/

// interface MyCustomParam {
//   first: number;
//   second: number;
// }

// type MyCustomParam = {
//   first: number;
//   second: number;
// };

function addition(values: any): number {
  return values.first + values.second;
}

/*
Le choix est essentiellement matière de préférence.

Cependant il y a une chose très importante avec les interface, c'est qu'elles peuvent se surcharger
si elles ont le même nom. Ce qui peut être très pratique, ou source de bugs. Par exemple :
*/

interface Fruit {
  nom: string;
}

/*
Pensez vous que "banane" peut contenir l'attribut "vitamines" si il est déclaré avant la surcharge d'interface ?
*/
// const banane: Fruit = { nom: 'banane', vitamines: ['B6', 'B9'] };

interface Fruit {
  vitamines: string[];
}

const pomme: Fruit = { nom: 'pomme', vitamines: ['B', 'E', 'A'] };

/*
Les interfaces peuvent aussi étendre d'une classe ou d'une interface.
*/
class Animal {
  constructor(public nom: string) {}
}

interface Mamifère {
  nombreDePattes: number;
}

interface Chat extends Animal, Mamifère {
  miauler: () => string;
}

const duchesse: Chat = {
  nom: 'Duchesse',
  nombreDePattes: 4,
  miauler: () => 'Miaou',
};

export {};
