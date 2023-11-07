/*
Generics / 2b. Retour sur "unknown"
===================================

Application des generics pour éviter le type "unknown" (ou "any").
*/

/*
On écrit une bibliothèque permettant d'afficher une fenêtre modale.
On ne sait pas à l'avance quel sera le type de "data" qui sera passé à la fenêtre modale.
*/
class Modale<TData> {
  constructor(public data: TData) {}
}

type Entité = {
  id: number;
  name: string;
};

const monEntité: Entité = { id: 1, name: 'Entité 1' };
const confirmation = new Modale(monEntité);

/*
Plus d'erreur, on a correctement typé "data" :
*/
confirmation.data.name;
