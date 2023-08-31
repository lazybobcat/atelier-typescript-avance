/*
1d - "unknown"

Comme pour "any", on peut assigner n'importe quel type à une variable de type "unknown".
Contrairement à "any", on ne peut pas utiliser une variable de type "unknown" sans la typer.

Afin de pouvoir utiliser une variable de type "unknown", on doit d'abord vérifier ou imposer son type avec :
- "typeof" pour vérifier le type d'une variable primitive (string, number, boolean, function, ...)
- "instanceof" pour vérifier le type d'une instance d'objet
- "as" pour imposer un type à une variable

Il est possible d'éviter "unknown" en utilisant les types génériques que nous verrons plus tard.
*/

// On écrit une bibliothèque permettant d'afficher une fenêtre modale.
// On ne sait pas à l'avance quel sera le type de "data" qui sera passé à la fenêtre modale.
{
  class Modale {
    constructor(public data: unknown) {}
  }

  type Entité = {
    id: number;
    name: string;
  };

  const monEntité: Entité = { id: 1, name: 'Entité 1' };
  const confirmation = new Modale(monEntité);

  confirmation.data.name; // Erreur : 'confirmation.data' est de type 'unknown'.
  // (confirmation.data as { name: string }).name; // On peut utiliser "as" si on est sûr de ce que l'on fait.
}

/*
"as" et "unknown" sont deux outils permettant de contourner le typage de TypeScript.
Parfois à mauvais escient.
*/

class InfosPrivées {
  private numeroCarteBleue = '1234 5678 9012 3456';
}

const infos = new InfosPrivées();
const numéroCarte = (infos as unknown as { numeroCarteBleue: string })
  .numeroCarteBleue; // Aie, on accède à une propriété privée !

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';

it("Devrait être possible d'accéder à une propriété privée", () => {
  expect(numéroCarte).toEqual('1234 5678 9012 3456');
});
