/*
Never / 8a. never
=================

Never est un type on ne peut rien assigner, à part never lui-même.
Il est utilisé pour représenter des cas impossibles à la compilation.
*/

/*
On ne peut rien assigner à un type "never" :
*/
{
  const foo: never = 1;
}

/*
Une fonction peut retourner "never" si elle ne retourne jamais rien (même pas void).
*/
{
  const fail = (message: string): never => {
    throw new Error(message);
  };
}

/*
"never" est également utilisé lorsque Typescript détermine qu'il n'y a plus de valeurs possibles dans une union ou un enum.
*/
{
  const foo = (x: 'carnivore' | 'herbivore') => {
    if (x === 'carnivore') {
      return 'viande';
    } else if (x === 'herbivore') {
      return 'salade';
    } else {
      x; //=>
    }
  };
}

/*
Alors à quoi ça sert ?
En combinant les règles ci-dessus, on peut créer un guard qui vérifie qu'on a bien traité tous les cas d'une union.
*/
{
  /*
  J'ai défini une union dans un fichier typescript à l'autre bout de mon projet, et je veux y ajouter "hexagone" :
  */
  type Shape = 'rectangle' | 'cercle' | 'triangle';

  /*
  Si on passe n'importe quel type de variable (à part never) à cette fonction, il y aura une erreur à la compilation.
  On aura aussi une erreur à l'éxécution grâce au "throw new Error".
  */
  const exhaustiveMatchGuard = (_: never): never => {
    throw new Error('This should be impossible to reach');
  };

  /*
  Dans un autre fichier, je veux utiliser cette union, mais je veux être sûr de ne pas oublier un cas :
  */
  const foo = (shape: Shape) => {
    switch (shape) {
      case 'rectangle':
        // ...
        break;

      case 'cercle':
        // ...
        break;

      case 'triangle':
        // ...
        break;

      default:
        /*
        Si j'ajoute un nouveau cas dans l'union Shape, Typescript me préviendra ici.
        Erreur : L'argument de type 'string' n'est pas attribuable au paramètre de type 'never'.
        */
        exhaustiveMatchGuard(shape);
    }
  };
}

/*
Si on ajoute "never" à une union, il est ignoré.
C'est pratique, par exemple,  lorsqu'on veut construire des types à partir d'autres, mais qu'on ne souhaitent pas que certaines valeurs soient possibles.
*/
{
  type UnionAvecNever = 'foo' | 'bar' | never;
  //   ^?
  type UnionSansNever = 'foo' | 'bar';
  //   ^?

  /*
  On peut utiliser "never" pour créer un type qui exclut certains types d'une union :
  */
  type MyExclude<T, U> = T extends U ? never : T;
  type Shape = 'rectangle' | 'cercle' | 'triangle';
  type ShapeSansCercle = MyExclude<Shape, 'cercle'>; // <=> 'rectangle' | never | 'triangle'
  //   ^?
}
