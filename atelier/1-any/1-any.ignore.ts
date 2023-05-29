/*
1. any

Selon la documentation de Typescript elle-même : il ne faut jamais utiliser le
type "any" (à l'exception de lorsque l'on travaille avec une bibliothèque
javascript qui ne serait pas typée). Le type "any" est simplement une notation
pour typescript qui désactive toutes les vérifications de typage.

J'ajouterai également que l'on peut l'utiliser dans les rares cas où l'on 
souhaite réellement autoriser n'importe quel type (mais attention à ne pas 
s'en servir dans le code !)

Quel est le problème avec "any" ?
*/

class Dummy {
  name: string = 'Dummy';
}

function helloWorld(dummy: any): any {
  return dummy.name;
}

// Typescript l'autorise :
const r = helloWorld('test');
r.test();
