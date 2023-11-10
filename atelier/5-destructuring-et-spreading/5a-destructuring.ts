/*
Destructuring et spreading / 5a. destructuring
===============================================

La destructuration permet de décomposer un objet ou un tableau ou un tuple en plusieurs variables.
*/

/*
Décomposition d'un tableau
*/
{
  const array: number[] = [1, 2, 3, 4, 5];
  const [first, second] = array;
  //     ^?

  const [, , third, , fifth] = array; // ici on ignore les éléments 1, 2 et 4
  //         ^?

  /*
  On peut aussi récupérer le reste des éléments :
  */
  const [elem1, ...rest] = array;
  //               ^?

  /*
  On peut aussi échanger des variables :
  */
  const inverse = ([x, y]: [number, number]) => {
    [x, y] = [y, x]; // <- ici on échange les valeurs

    return [x, y];
  };
  const [vx, vy] = inverse([1, 2]);

  it('Devrait décomposer un tableau', () => {
    expect(first).toBe(1);
    expect(elem1).toBe(1);
    expect(second).toBe(2);
    expect(third).toBe(3);
    expect(fifth).toBe(5);
    expect(rest).toEqual([2, 3, 4, 5]);
    expect(vx).toBe(2);
    expect(vy).toBe(1);
  });
}

/*
Destructuration d'un tuple (identique à un tableau, mais typage correct et longueur fixe)
*/
{
  const tuple: [number, string, boolean] = [7, 'hello', true];
  const [a, b, c] = tuple; // a: number, b: string, c: boolean
  //        ^?

  const [, , , d] = tuple;

  it('Devrait décomposer un tuple', () => {
    expect(a).toBe(7);
    expect(b).toBe('hello');
    expect(c).toBe(true);
    expect(d).toBe(undefined);
  });
}

/*
Destruction d'un objet
*/
{
  type Entity = {
    id: number;
    name: string;
  };
  const obj1 = { id: 42, name: 'John Doe', age: 42 };
  const obj2 = { id: 71, sides: 3 };

  const { id, name } = obj1; // Ici on extrait les attributs "id" et "name" de l'objet "obj1"

  // On peut aussi décomposer un objet dans les arguments d'une fonction
  const saveEntity = ({ id }: Entity) => {};
  const displayEntityName = ({ name }: Entity) => {};

  saveEntity(obj1);
  displayEntityName(obj1);

  it('Devrait décomposer un objet', () => {
    expect(id).toBe(42);
    expect(name).toBe('John Doe');
  });
}

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';
