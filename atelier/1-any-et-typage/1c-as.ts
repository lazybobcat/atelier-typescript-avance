/*
Any et typage / 1c. "as"
=========================

Une fonction "factory" permet de créer des instances d'objets en fonction d'un paramètre.
Cette fonction retourne un objet de type "Animal" mais en fonction du paramètre "type", elle
peut retourner un objet de type "Chat" ou "Chien".

Comment utiliser le mot-clé "as" pour indiquer à TypeScript que le type de retour de la fonction
est un "Chat" ou un "Chien" ?

/!\ Attention, "as" dit à Typescript que l'objet est du type indiqué. Il ne vérifie pas que c'est le cas.
Il faut donc être sûr de ce que l'on fait. "as" comme "assertion" et pas "cast".
*/

class Animal {}
class Chat extends Animal {
  miauler = (): string => 'Miaou';
}
class Chien extends Animal {
  aboyer = (): string => 'Ouaf';
}
type Race = 'chat' | 'chien';

const fabriquerUnAnimal = (type: Race): Animal => {
  switch (type) {
    case 'chat':
      return new Chat();
    case 'chien':
      return new Chien();
  }
};

/*
"toulouse" devrait être un "Chat" et "médor" devrait être un "Chien".
Au survol de la variable, TypeScript nous indique que le type est "Animal".
De ce fait, on ne peut pas appeler les méthodes "miauler" et "aboyer" sur ces variables.
On peut compléter ce code avec "as" afin de dire à TypeScript que le type est "Chat" ou "Chien".
*/
const toulouse = fabriquerUnAnimal('chat');
const médor = fabriquerUnAnimal('chien');
//    ^?

/*
/!\ Attention : on peut faire n'importe quoi avec "as", commme vous pouvez le voir ci-dessous.
La documentation de Typescript dit à propos de ce code : "This isn’t the sort of code you would want in your codebase however."
et suggère d'utiliser des "type guard", que nous verrons plus tard.
*/

class InfosPrivées {
  private numeroCarteBleue = '1234 5678 9012 3456';
}

const infos = new InfosPrivées();
const numéroCarte = (infos as unknown as { numeroCarteBleue: string })
  .numeroCarteBleue; // Aie, on accède à une propriété privée !

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';

it('Toulouse devrait être un chat', () => {
  expect(toulouse).toHaveProperty('miauler');
  expect(toulouse.miauler()).toEqual('Miaou');
});

it('Médor devrait être un chien', () => {
  expect(médor).toHaveProperty('aboyer');
  expect(médor.aboyer()).toEqual('Ouaf');
});

it("Devrait être possible d'accéder à une propriété privée", () => {
  expect(numéroCarte).toEqual('1234 5678 9012 3456');
});
