/*
1a. "any" implicite

On veut créer une fonction prenant deux paramètres "a" et "b" et qui effectue leur addition.
*/

export const addition = (a, b) => {
  return a + b;
};

/*
Le code fonctionne correctement si on passe des nombres, mais puisqu'on a configuré
"strict: true" dans la configuration de typescript, il nous affiche tout de même une erreur :

Parameter 'a' implicitly has an 'any' type.
Parameter 'b' implicitly has an 'any' type.
*/

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';

it("Devrait faire l'addition des deux nombres", () => {
  expect(addition(1, 1)).toEqual(2);
  expect(addition(30, 12)).toEqual(42);
});
