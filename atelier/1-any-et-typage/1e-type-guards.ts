/*
1e - Type guards

Un "type guard" est un opérateur ou une fonction spéciale qui permet de vérifier le type d'une variable.
Typescript utilise des opérateurs de Javascript comme "typeof", "instanceof" et "in" pour vérifier le type d'une variable.
On dit que Typescript "réduit" le type d'une variable à un type plus spécifique (en anglais : "narrow").
*/

type Chat = {
  identifiant: string;
};
class Chien {
  identifiant: { codePays: string; numéro: number } = {
    codePays: 'fr',
    numéro: 6723723678,
  };
  aboyer = (): string => 'Ouaf';
}
// Ici je mélange "type" et "class" pour l'exemple. Utilisez l'un ou l'autre selon vos besoins.
type Animal = Chat | Chien;
type Race = 'chat' | 'chien';

const fabriquerUnAnimal = (type: Race): Animal => {
  switch (type) {
    case 'chat':
      return { identifiant: 'CT-7567' };
    case 'chien':
      return new Chien();
  }
};

/*
Le type guard "instanceof" permet de vérifier si une variable est une instance d'une classe donnée.
*/
{
  const médor = fabriquerUnAnimal('chien');
  // ...
  if (médor instanceof Chien) {
    médor.aboyer();
  }

  it("'instanceof' devrait nous assurer qu'il s'agit d'un chien", () => {
    expect(médor instanceof Chien).toBeTruthy();
    expect(médor instanceof String).toBeFalsy();
  });
}

/*
Le type guard "typeof" permet de vérifier le type d'une variable primitive (string, number, boolean, function, undefined, object, ...).
*/
{
  const médor = fabriquerUnAnimal('chien') as Chien;
  const rex = fabriquerUnAnimal('chat') as Chat;
  // ...
  const identifiantLisible = (animal: Animal): string | undefined => {
    if (typeof animal.identifiant === 'string') {
      return animal.identifiant;
    }
    if (typeof animal.identifiant === 'object') {
      return `${animal.identifiant.codePays.toLocaleUpperCase()}-${
        animal.identifiant.numéro
      }`;
    }
  };

  it("'typeof' devrait nous permettre de récupérer un identifiant lisible", () => {
    expect(identifiantLisible(médor)).toEqual('FR-6723723678');
    expect(identifiantLisible(rex)).toEqual('CT-7567'); // qui a la ref ?
  });
}

/*
Le Type guard "in" permet de vérifier si une propriété existe dans un objet.
*/
{
  // Exemple à ne pas reproduire chez soi...
  const allerDansLEspace = (animal: {
    name: string;
    vivant: boolean;
  }): void => {
    if (
      'vies' in animal &&
      typeof animal.vies === 'number' &&
      animal.vies > 0
    ) {
      animal.vies--;
    } else {
      // RIP
      animal.vivant = false;
    }
  };

  it("'in' devrait nous permettre de vérifier si la propriété 'vies' existe", () => {
    const leïka = { name: 'Leïka', vivant: true };
    const thomasOMalley = { name: "Thomas O'Malley", vies: 9, vivant: true };

    allerDansLEspace(leïka);
    expect(leïka.vivant).toBeFalsy();

    allerDansLEspace(thomasOMalley);
    expect(thomasOMalley.vies).toEqual(8);
    expect(thomasOMalley.vivant).toBeTruthy();
  });
}

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';
