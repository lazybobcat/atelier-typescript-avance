/*
Let, const ou readonly / 3b. const
==================================

Le mot-clé "const" permet de déclarer une variable dont la valeur ne peut pas être ***réassignée***.
Cela ne veut pas dire que les valeurs référencées par la variable ne peuvent pas être modifiées.
La portée de "const" est une portée de bloc.
*/

{
  const a = 10;
  // @ts-expect-error : on ne peut pas réassigner une variable "const"
  // a = 20;
}

{
  const duchesse = { name: 'Duchesse', vies: 9 };
  // @ts-expect-error : on ne peut pas réassigner une variable "const"
  // duchesse = { name: 'Berlioz', vies: 9 };

  /*
  Mais on peut modifier les propriétés de l'objet référencé par la variable.
  */
  duchesse.name = 'Berlioz';

  it('Devrait avoir changé de nom', () => {
    expect(duchesse.name).toEqual('Berlioz');
  });
}

{
  /*
  C'est la même chose avec les tableaux, car en Javascript/Typescript les tableaux sont passés par référence !
  */
  const nombres = [1, 2, 3, 4]; // type "number[]"
  //    ^?
  nombres.push(5); // valide
  nombres[0] = 10; // valide

  it('Devrait avoir changé les nombres dans le tableau', () => {
    expect(nombres).toEqual([10, 2, 3, 4, 5]);
  });
}

/*
Alors faut-il utiliser "let" ou "const" ?

Comme souvent, la réponse est : ça dépend.
Vous devriez utiliser "const" par défaut afin d'éviter que votre variable ne soit réassignée par erreur.
Vous devriez utiliser "let" si vous avez une bonne raison de le faire.

Et commment éviter qu'un objet ou un tableau ne soit modifié ? -> Voir 3c-readonly.ts et 3d-as-const.ts
*/

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';
