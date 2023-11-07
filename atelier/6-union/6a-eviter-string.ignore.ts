/*
Unions / 6a. Eviter les strings
===============================

Les unions sont utiles lorsqu'on veut passer à une fonction une valeur contenue dans un ensemble fini de valeurs possibles.
*/

/*
Le problème :
*/
{
  const aire = (type: string, x: number, y?: number): number => {
    switch (type) {
      case 'carré':
        return x * (y || 0);

      case 'cercle':
        return Math.PI * (x * x);
    }

    return 0;
  };

  const [base, hauteur] = [10, 5];
  /*
  Valide, mais incorrect. Cependant typescript nous laisse faire :
  */
  const a = aire('triangle', base, hauteur);
}

/*
La solution, utiliser des unions à la place de "string" :
*/
{
  const aire = (type: 'carré' | 'cercle', x: number, y?: number): number => {
    switch (type) {
      case 'carré':
        return x * (y || 0);

      case 'cercle':
        return Math.PI * (x * x);
    }

    /*
    Bonus : on n'a plus besoin de ce return, car Typescript sait que toutes les possibilités ont été traitées.
    */
    // return 0;
  };

  const [base, hauteur] = [10, 5];
  /*
  Impossible dès la compilation :
  */
  const a = aire('triangle', base, hauteur);
}
