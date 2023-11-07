/*
7a - Intersections

C'est un peu l'opposé de Union. On peut créer un nouveau type en combinant plusieurs types ou objets.
*/

{
  type IdentifiedEntity = {
    id: string;
  };

  // Afin d'envoyer des données sur l'API en POST (création, on peut avoir un type sans id)
  type NewBlogPost = {
    title: string;
    content: string;
    published: boolean;
  };

  // Et pour les articles existants, on peut avoir un type avec id. On utilise l'intersection pour combiner les deux types :
  type BlogPost = NewBlogPost & IdentifiedEntity;
  type pretty = Prettify<BlogPost>;
  //   ^?

  // Un service pourrait donc recevoir un article sans id et retourner un article avec id :
  const create = (post: NewBlogPost): Observable<BlogPost> => {
    // simulation d'un appel à l'API :
    return of({
      id: '1',
      ...post,
    });
  };

  it('BlogPost devrait être identique à un type avec les attributs de NewBlogPost et IdentifiedEntity', () => {
    type Expected = {
      id: string;
      title: string;
      content: string;
      published: boolean;
    };

    // @ts-expect-error : les types sont différents
    type errors = [Expect<Equal<Expected, BlogPost>>];
  });
}

/*
On peut également combiner des interfaces et des classes :
*/
{
  {
    interface Colorful {
      color: string;
    }

    interface Circle {
      radius: number;
    }

    type ColorfulCircle = Colorful & Circle;
    type pretty = Prettify<ColorfulCircle>;
    //   ^?
  }

  {
    class Colorful {
      color: string = 'red';
    }

    class Circle {
      radius: number = 10;
    }

    type ColorfulCircle = Colorful & Circle;
    type pretty = Prettify<ColorfulCircle>;
    //   ^?
  }
}

/*
Il s'agit bien d'une intersection et non d'une union.
Si un même attribut est présent dans plusieurs parties de l'intersection, mais que son type est différent
et qu'il n'y a pas d'intersection possible, alors le type de l'attribut dans le résultat sera "never".
Si vous voulez que l'attribut soit conservé ainsi que son type, il faut utiliser une union.
*/
{
  {
    type Chat = {
      alimentation: 'carnivore' | 'herbivore';
      nbPattes: number;
      age: string;
    };
    type Lapin = {
      alimentation: 'carnivore' | 'herbivore';
      nbPattes: number;
      age: number;
    };

    type Chapin = Chat & Lapin;
    type pretty = Prettify<Chapin>;
    //   ^?
  }

  // Si il y a une intersection possible sur le type, alors elle sera conservée :
  {
    type Chat = {
      alimentation: 'carnivore' | 'herbivore';
      nbPattes: number;
      age: string;
    };
    type Lapin = {
      alimentation: 'carnivore' | 'herbivore';
      nbPattes: number;
      age: number | string; // <--
    };

    type Chapin = Chat & Lapin;
    type pretty = Prettify<Chapin>;
    //   ^?
  }
}

/* _____________ Test Cases _____________ */
import { it } from 'vitest';
import { Observable, of } from 'rxjs';
import { Equal, Expect, Prettify } from '..';
