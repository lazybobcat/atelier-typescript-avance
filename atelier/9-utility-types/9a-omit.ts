/*
Utility types / 9a. Omit
========================

Omit est un "utility type" qui permet de créer un nouveau type en retirant des attributs d'un type existant.
*/

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

type NewTodo = Omit<Todo, 'id'>;
//   ^?

/*
On peut également retirer plusieurs attributs en passant une union.
*/
type TodoPreview = Omit<Todo, 'id' | 'description'>;
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
  type errors = [Expect<Equal<Expected, NewTodo>>];

  assertType<Expected>(value);
});

it("NewTodo devrait être identique à un type avec les mêmes attributs que Todo sauf 'id'", () => {
  interface Expected {
    title: string;
    description: string;
    completed: boolean;
  }
  const value: NewTodo = {
    title: 'Todo 1',
    description: 'Description 1',
    completed: false,
  };

  type cases = [Expect<Equal<Expected, NewTodo>>];
  // @ts-expect-error : les types sont différents
  type errors = [Expect<Equal<Expected, TodoPreview>>];

  assertType<Expected>(value);
});
