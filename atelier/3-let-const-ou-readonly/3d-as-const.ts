/*
Let, const ou readonly / 3d. as const
=====================================

Un autre moyen de rendre un objet ou un tableau immuable est d'utiliser l'assertion "as const".
*/

/*
"as const" change le type d'une variable pour n'autoriser qu'une valeur donnée.
*/
{
  let nom = 'Duchesse' as const; // Survolez "nom", le type est "Duchesse" et non "string"
  //  ^?

  nom = 'Berlioz';

  nom = 'Duchesse';
}

/*
Utiliser "as const" sur un objet rend tous ses attributs "readonly".
*/
{
  const duchesse = { nom: 'Duchesse', vies: 9 } as const;
  //    ^?

  /*
  L'attribut "vies" ne peut pas être modifié après l'initialisation
  */
  duchesse.vies = 10;
}

/*
Utiliser "as const" sur un tableau le rend readonly, ses valeurs ne peuvent pas être modifiées et sont connues à la compilation.
*/
{
  const données = [1, 'hello', true] as const; // type "readonly [1, "hello", true]"
  //    ^?
}

/*
Attention, "readonly" et "as const" sont des assertions et ne servent qu'à la compilation.
Une fois le code transpilé en Javascript, il n'y a plus de type et le code généré est le même que si on n'avait pas utilisé "readonly" ou "as const".
*/
{
  /*
  L'attribut "name" et "vies" ne peuvent pas être modifiés après l'initialisation.
  */
  const duchesse = { nom: 'Duchesse', vies: 9 } as const;

  duchesse.nom = 'Berlioz';

  /*
  Pourtant dans ce test, le nom a bien été changé !
  */
  it("Devrait changer le nom quand mêmme, si on triche un peu en ignorant l'erreur", () => {
    expect(duchesse.nom).toEqual('Berlioz');
  });
}

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';
