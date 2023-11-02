/*
3c - readonly

Le mot-clé "readonly" permet de déclarer un attribut de classe, interface ou type comme ne pouvant pas être modifié.
*/

type Chat = {
  readonly nom: string; // "nom" ne pourra pas être modifié après l'initialisation
  vies: number;
};

{
  // L'attribut "name" ne peut pas être modifié après l'initialisation
  const duchesse: Chat = { nom: 'Duchesse', vies: 9 };

  // @ts-expect-error : on ne peut pas réassigner un attribut "readonly"
  duchesse.name = 'Berlioz';

  // Mais on peut changer "vies"
  duchesse.vies = 10;
}

{
  // Pour les tableaux, on peut utiliser "ReadonlyArray<number>" ou "readonly number[]" pour déclarer un tableau dont les valeurs ne peuvent pas être modifiées.
  const nombres: ReadonlyArray<number> = [1, 2, 3, 4]; // En suvolant "nombres", on voit que c'est un type "readonly number[]"
  //    ^?

  // @ts-expect-error : on ne peut pas modifier un tableau "readonly"
  nombres.push(5);
  // @ts-expect-error : on ne peut pas modifier un tableau "readonly"
  nombres[0] = 10;
}

/*
Attention, "readonly" et "as const" sont des assertions et ne servent qu'à la compilation.
Une fois le code transpilé en Javascript, il n'y a plus de type et le code généré est le même que si on n'avait pas utilisé "readonly" ou "as const".
*/
{
  // L'attribut "name" ne peut pas être modifié après l'initialisation
  const duchesse: Chat = { nom: 'Duchesse', vies: 9 };

  // @ts-expect-error : on ne peut pas réassigner un attribut "readonly"
  duchesse.nom = 'Berlioz';

  it("Devrait changer le nom quand mêmme, si on triche un peu en ignorant l'erreur", () => {
    expect(duchesse.nom).toEqual('Berlioz');
  });
}

/*
Alors faut-il utiliser "readonly" ou "const" ?

"const" s'utilise pour les variables et "readonly" pour les attributs de classe, interface ou type.
*/

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';
