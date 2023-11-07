/*
Utility types / 9b. Pick
========================

Pick est un "utility type" qui permet de créer un nouveau type en ne gardant que certains attributs d'un type existant.
C'est en quelque sorte l'opposé de Omit.
*/

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

type Entity = Pick<Todo, 'id'>;
//   ^?

/*
On peut également prendre plusieurs attributs en passant une union.
*/
type TodoPreview = Pick<Todo, 'title' | 'completed'>;
//   ^?

/* _____________ Test Cases _____________ */
import { assertType, it } from 'vitest';
import { Equal, Expect } from '..';

it("TodoPreview devrait être identique à un type avec les mêmes attributs que Todo sauf 'id' et 'description'", () => {
  interface Expected {
    title: string;
    completed: boolean;
  }
  const value: TodoPreview = {
    title: 'Todo 1',
    completed: false,
  };

  type cases = [Expect<Equal<Expected, TodoPreview>>];
  // @ts-expect-error : les types sont différents
  type errors = [Expect<Equal<Expected, Entity>>];

  assertType<Expected>(value);
});
