/*
Generics / 2a. Generics
=======================

Les types génériques permettent de créer des composants réutilisables.
Ils permettent de créer des composants qui peuvent fonctionner avec une variété de types plutôt qu'avec un seul type.
*/

type Horse = {
  name: string;
  color: string;
};

/*
Et si on pouvait faire un store d'autre chose que des "Horse" ?

Changer HorseStore pour qu'il puisse stocker n'importe quel type.
*/
class HorseStore {
  private horses: Horse[] = [];

  add(horse: Horse): void {
    this.horses.push(horse);
  }

  all(): Horse[] {
    return this.horses;
  }
}

const horseStore = new HorseStore();
horseStore.add({ name: 'Tornado', color: 'brown' });
horseStore.add({ name: 'Spirit', color: 'white' });
horseStore.add({ name: 'Jolly Jumper', color: 'white' });

/*
Il est possible de contraindre le type générique avec le mot clé "extends".
De cette façon, on peut s'assurer que le type générique possède bien une propriété donnée.
*/
function print<TData extends { name: string }>(data: TData): string {
  return data.name;
}

/*
A noter que Typescript est capable "d'inférer" le type générique si il est utilisé dans
les paramètres ou en retour d'une fonction.
*/
{
  type Person = {
    name: string;
    age: number;
  };
  const paul: Person = { name: 'Paul', age: 42 };
  const david: Person = { name: 'David', age: 37 };

  print<Person>(paul); // type générique précisé
  print(david); // type générique inféré
}

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';

it('Le store devrait contenir des chevaux', () => {
  expect(horseStore.all()).toHaveLength(3);
});
