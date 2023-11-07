/*
5b - spreading

Le spreading permet de placer les éléments d'un array ou d'un objet dans un autre array ou objet.
*/

// Spreading dans un tableau ou un tuple
{
  const first = [1, 2];
  const second = [3, 4];

  const both = [0, ...first, ...second];
  //    ^?

  it('Devrait étendre un tableau', () => {
    expect(both).toEqual([0, 1, 2, 3, 4]);
  });
}

// Spreading dans un objet
{
  type SearchOptions = {
    query: string;
    page: number;
    pageSize: number;
  };

  const defaultSearch: SearchOptions = {
    query: '',
    page: 1,
    pageSize: 10,
  };

  {
    const queryStr = 'taper google dans google';
    const search = { ...defaultSearch, query: queryStr };

    it('Devrait étendre un objet', () => {
      expect(search).toEqual({
        query: 'taper google dans google',
        page: 1,
        pageSize: 10,
      });
    });
  }

  {
    // On peut simplifier le code ci-dessus en nommant la variable comme l'attribut "query" du type SearchOptions
    const query = 'taper google dans google';
    const search = { ...defaultSearch, query };
  }

  // C'est très pratique lorsqu'on ne veut pas modifier un objet en entrée d'une fonction par erreur et en retourner un nouveau
  {
    const badFoo = (options: SearchOptions) => {
      options.query = 'foo';

      return options;
    };

    const options: SearchOptions = { query: 'bar', page: 1, pageSize: 10 };
    const result = badFoo(options);

    it("Devrait modifier l'objet en entrée", () => {
      expect(options.query).toEqual('foo');
      expect(result.query).toEqual('foo');
    });
  }
  {
    const goodFoo = (options: SearchOptions) => {
      return { ...options, query: 'foo' }; // on fait une copie de options
    };

    const options: SearchOptions = { query: 'bar', page: 1, pageSize: 10 };
    const result = goodFoo(options);

    it("Devrait modifier l'objet en entrée", () => {
      expect(options.query).toEqual('bar');
      expect(result.query).toEqual('foo');
    });
  }
}

/* _____________ Test Cases _____________ */
import { expect, it } from 'vitest';
