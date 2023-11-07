/*
Utility types / 9c. Readonly
============================

Readonly est un "utility type" qui permet de créer un nouveau type en rendant tous les attributs d'un type existant en lecture seule.
*/

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

type PrettyReadonlyTodo = Prettify<Readonly<Todo>>;
//   ^?

const todo: Readonly<Todo> = {
  id: 1,
  title: 'Todo 1',
  description: 'Description 1',
  completed: false,
};

/*
On ne peut pas modifier un attribut en lecture seule
*/
todo.completed = true;

/* _____________ Test Cases _____________ */
import { it } from 'vitest';
import { Equal, Expect, Prettify } from '..';

it('Readonly<Todo> devrait être identique à un type avec tous les attributs de Todo en readonly', () => {
  interface Expected {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly completed: boolean;
  }
  const value: Readonly<Todo> = {
    title: 'Todo 1',
    completed: false,
    description: 'Description 1',
    id: 1,
  };

  type cases = [Expect<Equal<Expected, Readonly<Todo>>>];
});
