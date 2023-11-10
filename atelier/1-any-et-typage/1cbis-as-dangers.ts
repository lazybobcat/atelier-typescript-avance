/*
Any et typage / 1c. "as"
=========================

/!\ Attention, "as" dit à Typescript que l'objet est du type indiqué. Il ne vérifie pas que c'est le cas.
Il faut donc être sûr de ce que l'on fait. "as" comme "assertion" et pas "cast".
*/

/*
/!\ Attention : on peut faire n'importe quoi avec "as", commme vous pouvez le voir ci-dessous.
La documentation de Typescript dit à propos de ce code : "This isn’t the sort of code you would want in your codebase however."
et suggère d'utiliser des "type guard", que nous verrons plus tard.
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
