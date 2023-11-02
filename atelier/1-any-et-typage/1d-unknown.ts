/*
1d - "unknown"

Comme pour "any", on peut assigner n'importe quel type à une variable de type "unknown".
Contrairement à "any", on ne peut pas utiliser une variable de type "unknown" sans être sûr de son type.

Afin de pouvoir utiliser une variable de type "unknown", on doit d'abord vérifier ou imposer son type avec :
- "typeof" pour vérifier le type d'une variable primitive (string, number, boolean, function, ...)
- "instanceof" pour vérifier le type d'une instance d'objet (si le type est une classe uniquement)
- "as" pour imposer un type à une variable

Il est possible d'éviter "unknown" en utilisant les types génériques que nous verrons plus tard.
*/

/*
On écrit une bibliothèque permettant d'afficher une fenêtre modale.
On ne sait pas à l'avance quel sera le type de "data" qui sera passé à la fenêtre modale.
*/
class Modale {
  constructor(public data: unknown) {}
}

const monEntité: Entité = { id: 1, name: 'Entité 1' };
const confirmation = new Modale(monEntité);

// @ts-expect-error : on ne peut pas accéder à une propriété d'un type "unknown"
confirmation.data.name;
// (confirmation.data as { name: string }).name; // On peut utiliser "as" si on est sûr de ce que l'on fait.

// Voir 2-generics pour une meilleure méthode.

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';

it("Devrait pouvoir accéder au name d'une donnée qui a l'attribut 'name'", () => {
  expect((confirmation.data as { name: string }).name).toEqual('Entité 1');
  expect((confirmation.data as { age: number }).age).toBeUndefined();
});
