/*
1d - Types anonymes

Dans cette présentation, j'utiliserai régulièrement des types "anonymes".
*/

type Person = {
  name: string;
  age: number;
};

/*
Je peux vouloir afficher le "name" de tout objet qui possède une propriété "name" (et pas que de type "Person").*
Donc je ne le type pas "Person", j'utilise un type "anonyme".
Si ce type est amené à être utilisé plusieurs fois ou si il est complexe, il peut être judicieux de le typer avec une interface ou un type.
*/
function printName(data: { name: string }): void {
  // ...
}

const paul = { name: 'Paul', age: 42 };
printName(paul);
