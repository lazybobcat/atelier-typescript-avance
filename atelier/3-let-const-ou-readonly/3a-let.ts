/*
3a - let

Le mot-clé "let" permet de déclarer une variable dont la valeur peut changer.
*/

{
  let a = 10;
  a = 20;
  it('Devrait avoir une valeur de 20', () => {
    expect(a).toEqual(20);
  });
}

let a = 1;
{
  // @ts-expect-error : on utilise "a" avant de la déclarer
  // a++;

  // eslint-disable-next-line prefer-const
  let a = 10; // On peut déclarer une variable avec le même nom dans un autre bloc
}
a++;
it('Devrait avoir une valeur de 2', () => {
  expect(a).toEqual(2);
});

{
  // eslint-disable-next-line prefer-const
  let a = 10;
  // @ts-expect-error : On ne peut pas déclarer une variable avec le même nom dans le même bloc
  // let a = 20;
}

{
  const foo = (condition: boolean, x: number): number => {
    if (condition) {
      let x = 10;
      x++;

      return x;
    }

    return x;
  };

  it('Devrait avoir une valeur selon condition', () => {
    expect(foo(true, 20)).toEqual(11);
    expect(foo(false, 20)).toEqual(20);
  });
}

{
  // Que se passe-t-il dans ce cas ci ?
  const foo = (condition: boolean, x: number): number => {
    if (condition) {
      let x = 10;
      x++;
    }

    return x;
  };

  it('Quelle est la valeur de retour ?', () => {
    const value = foo(true, 20);
    // expect(value).toEqual(11);
    // expect(value).toEqual(20);
    // expect(value).toEqual(21);
  });
}

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';
