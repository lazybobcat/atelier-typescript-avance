/*
2a - Generics

Les types génériques permettent de créer des composants réutilisables.
Ils permettent de créer des composants qui peuvent fonctionner avec une variété de types plutôt qu'avec un seul type.
*/

type Horse = {
  name: string;
  color: string;
};

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
function print<T extends { name: string }>(data: T): string {
  return data.name;
}

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';

it('Le store devrait contenir des chevaux', () => {
  expect(horseStore.all()).toHaveLength(3);
});
