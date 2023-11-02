/*
3d - as const

Un autre moyen de rendre un objet ou un tableau immuable est d'utiliser l'assertion "as const".
*/

/*
"as const" change le type d'une variable pour n'autoriser qu'une valeur donnée.
*/
{
  let nom = 'Duchesse' as const; // Survolez "nom", le type est "Duchesse" et non "string"
  //  ^?

  //@ts-expect-error : on ne peut assigner que "Duchesse" à "nom"
  nom = 'Berlioz';

  nom = 'Duchesse';
}

/*
Utiliser "as const" sur un objet rend tous ses attributs "readonly".
*/
{
  // L'attribut "name" ne peut pas être modifié après l'initialisation
  const duchesse = { nom: 'Duchesse', vies: 9 } as const;
  //    ^?

  //@ts-expect-error : on ne peut pas réassigner un attribut "readonly"
  duchesse.vies = 10;
}

/*
Utiliser "as const" sur un tableau le rend readonly, ses valeurs ne peuvent pas être modifiées et sont connues à la compilation.
*/
{
  const données = [1, 'hello', true] as const; // En suvolant "nombres", on voit que c'est un type "readonly [1, "hello", true]"
  //    ^?
}

/*
Attention, "readonly" et "as const" sont des assertions et ne servent qu'à la compilation.
Une fois le code transpilé en Javascript, il n'y a plus de type et le code généré est le même que si on n'avait pas utilisé "readonly" ou "as const".
*/
{
  // L'attribut "name" ne peut pas être modifié après l'initialisation
  const duchesse = { nom: 'Duchesse', vies: 9 } as const;

  // @ts-expect-error : on ne peut pas réassigner un attribut "readonly"
  duchesse.nom = 'Berlioz';

  it("Devrait changer le nom quand mêmme, si on triche un peu en ignorant l'erreur", () => {
    expect(duchesse.nom).toEqual('Berlioz');
  });
}

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';
