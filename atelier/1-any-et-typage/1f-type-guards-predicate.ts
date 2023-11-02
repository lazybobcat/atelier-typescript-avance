/*
1f - Type guards avec "predicate"

On peut également définir nos propres "type guards". Un "type guard" est une fonction qui retourne un prédicat de type (type predicate).
Afin d'informer Typescript que nous avons réduit la variable à un type plus spécifique, on utilise le mot-clé "is" suivi du type pour définir notre prédicat.
*/

type Chat = {
  espece: string;
  miauler: () => string;
};
type Chien = {
  espece: string;
  aboyer: () => string;
};
type Vache = {
  espece: string;
  mugir: () => string;
};
type Animal = Chat | Chien | Vache;

const estUnChat = (animal: Animal) => animal.espece === 'chat';
const estUnChien = (animal: Animal) => animal.espece === 'chien';

const berlioz = { espece: 'chat', miauler: () => 'Miaou' };
const faireDuBruit = (animal: Animal): string => {
  if (estUnChat(animal)) {
    return animal.miauler(); // Comment peut-on résoudre cette erreur ? en utilisant "is" dans la fonction "estUnChat"
  }
  if (estUnChien(animal)) {
    return animal.aboyer();
  }

  return '?';
};

/*
Astuce : le type guard "is" est extêmement utile avec RxJs. Si un observable peut retourner un type donné ou undefined,
on peut utiliser "filter" pour filtrer les valeurs undefined mais Typescript ne sait pas que le type est différent de undefined,
vous obligeant à utiliser des conditions ou "as" dans le reste du pipe. Sauf si vous utilisez "is" dans votre type guard.
*/
const fluxDAnimaux = (): Observable<Animal | undefined> => {
  return of(
    { espece: 'chat', miauler: () => 'Miaou' },
    undefined,
    { espece: 'chien', aboyer: () => 'Ouaf' },
    { espece: 'vache', mugir: () => 'Meuh' },
    undefined,
    undefined,
  );
};
fluxDAnimaux().pipe(
  filter(animal => animal !== undefined),
  tap(animal => console.log(animal.espece)),
  tap(animal => faireDuBruit(animal)),
  // ... autres opérateurs utilisant "animal" sans avoir à utiliser "as"
);

/* _____________ Test Cases _____________ */
import { Observable, filter, of, tap } from 'rxjs';
import { expect, it } from 'vitest';

it("estUnChat doit vérifier qu'on a un chat", () => {
  const animal1 = { espece: 'chat', miauler: () => 'Miaou' };
  const animal2 = { espece: 'chien', aboyer: () => 'Ouaf' };
  expect(estUnChat(animal1)).toBeTruthy();
  expect(estUnChat(animal2)).toBeFalsy();
});

it("estUnChien doit vérifier qu'on a un chien", () => {
  const animal1 = { espece: 'chat', miauler: () => 'Miaou' };
  const animal2 = { espece: 'chien', aboyer: () => 'Ouaf' };
  expect(estUnChien(animal1)).toBeFalsy();
  expect(estUnChien(animal2)).toBeTruthy();
});

it('faireDuBruit doit retourner le bon bruit', () => {
  const animal1 = { espece: 'chat', miauler: () => 'Miaou' };
  const animal2 = { espece: 'chien', aboyer: () => 'Ouaf' };
  expect(faireDuBruit(animal1)).toEqual('Miaou');
  expect(faireDuBruit(animal2)).toEqual('Ouaf');
});
