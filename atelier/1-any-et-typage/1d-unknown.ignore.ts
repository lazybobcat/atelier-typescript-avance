/*
Any et typage / 1d. "unknown"
==============================

Comme pour "any", on peut assigner n'importe quel type à une variable de type "unknown".
Contrairement à "any", on ne peut pas utiliser une variable de type "unknown" sans être sûr de son type.

Afin de pouvoir utiliser une variable de type "unknown", on doit d'abord vérifier ou imposer son type avec :
- "typeof" pour vérifier le type d'une variable primitive (string, number, boolean, function, ...)
- "instanceof" pour vérifier le type d'une instance d'objet (si le type est une classe uniquement)
- "in" pour vérifier si un attribut est présent dans un objet
- "as" pour imposer un type à une variable

Il est possible d'éviter "unknown" en utilisant les types génériques que nous verrons plus tard.
*/

/*
"unknown" est plus sûr que "any" car on ne peut pas utiliser une
variable de type "unknown" sans être sûr de son type.
*/
{
  // Erreur : "data" est de type "unknown"
  const foo = (data: unknown) => data.name;
  //                             ^?

  const bar = (data: unknown): string | undefined => {
    // On "réduit" le typde de "data" à un type plus spécifique
    if (typeof data === 'string') {
      return data.toLocaleUpperCase();
      //     ^?
    }
  };
}
