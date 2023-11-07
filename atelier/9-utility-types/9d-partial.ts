/*
Utility types / 9d. Partial
===========================

Partial est un "utility type" qui permet de créer un nouveau type en rendant tous les attributs d'un type existant optionnels.
*/

interface Todo {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}

type PrettyPartialTodo = Prettify<Partial<Todo>>;
//   ^?

/*
"patch" va contenir un ou plusieurs attributs de Todo.
*/
const patchTodo = (todo: Readonly<Todo>, patch: Partial<Todo>): Todo => {
  return { ...todo, ...patch };
};

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';
import { Equal, Expect, Prettify } from '..';

it('Devrait patcher une Todo', () => {
  let todo: Todo = {
    id: 1,
    title: 'Todo 1',
    description: 'Description 1',
    completed: false,
  };

  todo = patchTodo(todo, { completed: true });

  expect(todo).toEqual({
    id: 1,
    title: 'Todo 1',
    description: 'Description 1',
    completed: true,
  });
});

it('Partial<Todo> devrait être identique à un type avec tous les attributs de Todo mais facultatifs', () => {
  interface Expected {
    id?: number;
    title?: string;
    description?: string;
    completed?: boolean;
  }
  const value: Partial<Todo> = {
    title: 'Todo 1',
    completed: false,
  };

  type cases = [Expect<Equal<Expected, Partial<Todo>>>];
  // @ts-expect-error : les types sont différents
  type errors = [Expect<Equal<Expected, Todo>>];
});
