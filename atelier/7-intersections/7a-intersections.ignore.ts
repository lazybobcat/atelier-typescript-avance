/*
Intersections / 7a. Intersections
==================================

C'est un peu l'opposé de Union. On peut créer un nouveau type en combinant plusieurs types ou objets.
*/

/*
Dans cet exemple nous devons envoyer à une API des filtres de recherche pour l'affichage d'une
liste d'utilisateur dans un channel donné.
*/
{
  /*
  Données de pagination :
  */
  interface PaginationDTO {
    currentPage: number;
    pageSize: number;
  }

  /*
  Comment créer un type contenant toutes ces informations à la fois ?
  Par héritage ou par composition ?
  */
  {
    interface UserSearchWithPaginationDTO extends PaginationDTO {
      channelCode?: string;
    }
    type pretty = Prettify<UserSearchWithPaginationDTO>;
    //   ^?
  }
  {
    interface UserSearchDTO {
      channelCode?: string;
    }
    type UserSearchWithPaginationDTO = UserSearchDTO & PaginationDTO;
    type pretty = Prettify<UserSearchWithPaginationDTO>;
    //   ^?
  }

  /*
  On obtient le même type avec les deux méthodes. Mais sémantiquement il y a une différence :
    - l'héritage est une relation "est un". UserSearchWithPaginationDTO est-il un PaginationDTO ?
    - la composition est une relation "a un". UserSearchWithPaginationDTO a un
    PaginationDTO et un UserSearchDTO.
  */
}

/*
On peut combiner des types, interfaces et des classes :
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
Si un même attribut est présent dans plusieurs parties de l'intersection, mais que son type est
différent et qu'il n'y a pas d'intersection possible, alors le type de l'attribut dans le 
résultat sera "never".
Si vous voulez que l'attribut soit conservé ainsi que son type, il faut utiliser une union.
*/
{
  {
    interface Colorful {
      color: string;
      id: string;
    }

    interface Circle {
      radius: number;
      id: number;
    }

    type ColorfulCircle = Colorful & Circle;
    type pretty = Prettify<ColorfulCircle>; // type de id = never
    //   ^?
  }

  /*
  Si il y a une intersection possible sur le type, alors elle sera conservée :
  */
  {
    interface Colorful {
      color: string;
      id: string;
    }

    interface Circle {
      radius: number;
      id: string | number;
    }

    type ColorfulCircle = Colorful & Circle;
    type pretty = Prettify<ColorfulCircle>; // type de id = string
    //   ^?
  }
}

/*
> Doit-on utiliser les intersections à la place de l'héritage ?

Non.

> Doit-on utiliser les intersections partout ?

Non.
*/

/* __________________________ */
import { Prettify } from '..';
