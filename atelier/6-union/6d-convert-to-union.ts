/*
6d - Convert to union

Nous avons vu que dans certains cas les unions permettent d'effectuer des opérations
sur les types qui ne sont pas possibles, moins faciles ou sans type-safety avec les enums.

Mais comment faire si on a déjà un enum et qu'on veut le convertir en union ?
*/

/*
Conversion des clés d'un type ou objet en union.
*/
{
  // On peut utiliser "keyof" pour récupérer les clés d'un type ou d'un objet :
  {
    class Vecteur {
      x: number = 0;
      y: number = 0;
    }
    type VecteurKeys = Prettify<keyof Vecteur>;
    //   ^?

    it('Devrait être équivalent à une union', () => {
      type Expected = 'x' | 'y';

      type cases = [Expect<Equal<Expected, VecteurKeys>>];
    });
  }

  {
    interface Vecteur {
      x: number;
      y: number;
    }
    type VecteurKeys = Prettify<keyof Vecteur>;
    //   ^?

    it('Devrait être équivalent à une union', () => {
      type Expected = 'x' | 'y';

      type cases = [Expect<Equal<Expected, VecteurKeys>>];
    });
  }

  {
    type Vecteur = {
      x: number;
      y: number;
    };
    type VecteurKeys = Prettify<keyof Vecteur>;
    //   ^?

    it('Devrait être équivalent à une union', () => {
      type Expected = 'x' | 'y';

      type cases = [Expect<Equal<Expected, VecteurKeys>>];
    });
  }

  // Si on a un object anonyme, il faut d'abord récupérer son type avec "typeof" :
  {
    const position = { x: 10, y: 20 };
    type VecteurKeys = Prettify<keyof typeof position>;
    //   ^?

    it('Devrait être équivalent à une union', () => {
      type Expected = 'x' | 'y';

      type cases = [Expect<Equal<Expected, VecteurKeys>>];
    });
  }
}

/*
Conversion d'un enum en union.
On peut utiliser les opérateurs "keyof typeof <type>" afin de recevoir une union des clés d'un type.
*/
{
  // Pour un type simple :
  type Vecteur = {
    x: number;
    y: number;
  };
  type KeyOfVecteur = Prettify<keyof Vecteur>;
  //   ^?

  // Pour un enum :
  enum DirectionEnum {
    Left = 'left',
    Right = 'right',
    Top = 'top',
    Bottom = 'bottom',
  }

  // Les clés d'un enum sont plus complexes que ce à quoi on s'attendrait :
  type myKeyOf = Prettify<keyof DirectionEnum>;
  //   ^?

  // On peut transformer un enum en objet avec "typeof" :
  type myTypeOf = Prettify<typeof DirectionEnum>;
  //   ^?

  // On peut donc utiliser "typeof" qui va transformer l'emum en objet, puis "keyof" pour récupérer les clés (comme si un enum était un objet) :
  type DirectionKeysUnion = keyof typeof DirectionEnum;
  //   ^?
}

{
  // On peut ainsi facilement restreindre les valeurs possibles d'une fonction par rapport à un enum, en le transformant en union :
  enum ConfigurationKeys {
    SETTINGS_THEME = 'SETTINGS_THEME',
    SETTINGS_LANGUAGE = 'SETTINGS_LANGUAGE',
    SETTINGS_NOTIFICATIONS = 'SETTINGS_NOTIFICATIONS',
    PAGINATION_ITEMS_PER_PAGE = 'PAGINATION_ITEMS_PER_PAGE',
    TABLE_ORDER_BY = 'TABLE_ORDER_BY',
  }
  type ConfigurationKeysUnion = keyof typeof ConfigurationKeys; // union créée à partir des clés de l'enum

  // On souhaite que "SettingsKeysUnion" soit uniquement composé des clés commençant par "SETTINGS_" :
  const updateSetting = (key: SettingsKeysUnion, value: string) => {};

  // Il y a plusieurs façon de récupérer seulement les clés "SETTINGS_"
  {
    // La première solution, la plus simple, est d'utiser Extract pour ne prendre que les clés souhaitées :
    // prettier-ignore
    type SettingsKeysUnion = Extract<ConfigurationKeysUnion, 'SETTINGS_THEME' | 'SETTINGS_LANGUAGE' | 'SETTINGS_NOTIFICATIONS'>;
    //   ^?

    // L'inconvénient c'est qu'il faut mettre à jour le type "SettingsKeysUnion" à chaque fois qu'on ajoute un nouveau SETTINGS.
    // Et si on pouvait le faire automatiquement ?
  }

  // En jouant avec les types de Typescript, on peut faire des choses plus complexes :
  // prettier-ignore
  type SettingsKeysUnion = StartsWith<keyof typeof ConfigurationKeys,'SETTINGS_'>;
  //   ^?
  // prettier-ignore
  type PaginationKeysUnion = StartsWith<keyof typeof ConfigurationKeys, 'PAGINATION_'>;
  //   ^?

  /*
  Pour information, voici le code de "StartsWith" :
  export type StartsWith<
    TString extends string,
    TStart extends string,
  > = TString extends `${TStart}${string}` ? TString : never;
  */

  // On peut maintenant utiliser la fonction updateSetting avec les clés de l'enum "ConfigurationKeys" :
  updateSetting('SETTINGS_THEME', 'dark');
  // On peut quand même utiliser l'enum lors de l'appel si on le souhaite :
  updateSetting(ConfigurationKeys.SETTINGS_THEME, 'dark');

  // On ne peut pas passer autre chose qu'un SETTINGS
  updateSetting('TABLE_ORDER_BY', 'id');
  updateSetting(ConfigurationKeys.PAGINATION_ITEMS_PER_PAGE, '10');

  it('Devrait être équivalent à une union', () => {
    type Expected =
      | 'SETTINGS_THEME'
      | 'SETTINGS_LANGUAGE'
      | 'SETTINGS_NOTIFICATIONS';

    type cases = [Expect<Equal<Expected, SettingsKeysUnion>>];
  });
}

/* _____________ Test Cases _____________ */
import { it } from 'vitest';
import { Equal, Expect, Prettify, StartsWith } from '..';
