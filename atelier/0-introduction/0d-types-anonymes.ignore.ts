/*
1d - Types anonymes

Dans cette présentation, j'utiliserai régulièrement des types "anonymes".
*/

type Person = {
  name: string;
  age: number;
};

// Je ne le type pas "Person" car je n'ai que besoin de la propriété "name".
// De plus, je peux vouloir afficher le "name" d'un objet qui n'est pas de type "Person" mais qui possède une propriété "name".
function printName(data: { name: string }): void {
  // ...
}

const paul = { name: 'Paul', age: 42 };
printName(paul);
