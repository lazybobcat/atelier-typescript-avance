/*
Xe - Required

Required est un "utility type" qui permet de créer un nouveau type en rendant tous les attributs d'un type existant obligatoires.
C'est en quelque sorte l'opposé de Partial.
*/

interface Todo {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
}

type PrettyPartialTodo = Prettify<Required<Todo>>;
//   ^?

/* _____________ Test Cases _____________ */
import { it } from 'vitest';
import { Equal, Expect, Prettify } from '..';

it('Partial<Todo> devrait être identique à un type avec tous les attributs de Todo mais facultatifs', () => {
  interface Expected {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }

  type cases = [Expect<Equal<Expected, Required<Todo>>>];
  // @ts-expect-error : les types sont différents
  type errors = [Expect<Equal<Expected, Todo>>];
});
