/*
Unions / 6d. Conversion en union
================================

Nous avons vu que dans certains cas les unions permettent d'effectuer des opérations
sur les types qui ne sont pas possibles, moins faciles ou sans type-safety avec les enums.

Mais comment faire si on a déjà un enum et qu'on veut le convertir en union ?
*/

/*
Conversion des clés d'un type ou objet en union.
*/
{
  /*
  On peut utiliser "keyof" pour récupérer les clés d'un type ou d'un objet :
  */
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

  /*
  Si on a un object anonyme, il faut d'abord récupérer son type avec "typeof" :
  */
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
  /*
  Pour un enum :
  */
  enum DirectionEnum {
    Left = 'left',
    Right = 'right',
    Top = 'top',
    Bottom = 'bottom',
  }

  /*
  Les clés d'un enum sont plus complexes que ce à quoi on s'attendrait :
  */
  type myKeyOf = Prettify<keyof DirectionEnum>;
  //   ^?

  /*
  On peut transformer un enum en objet avec "typeof" :
  */
  type myTypeOf = Prettify<typeof DirectionEnum>;
  //   ^?

  /*
  On peut donc utiliser "typeof" qui va transformer l'emum en objet, puis "keyof" pour récupérer les clés 
  (comme si un enum était un objet) :
  */
  type DirectionKeysUnion = keyof typeof DirectionEnum;
  //   ^?
}

{
  /*
  On peut ainsi facilement restreindre les valeurs possibles d'un argument d'une fonction par rapport à un enum,
  en le transformant en union :

  /!\ Accrochez-vous, ça va être un peu compliqué !
  */
  enum ConfigurationKeys {
    SETTINGS_THEME = 'SETTINGS_THEME',
    SETTINGS_LANGUAGE = 'SETTINGS_LANGUAGE',
    SETTINGS_NOTIFICATIONS = 'SETTINGS_NOTIFICATIONS',
    PAGINATION_ITEMS_PER_PAGE = 'PAGINATION_ITEMS_PER_PAGE',
    TABLE_ORDER_BY = 'TABLE_ORDER_BY',
  }
  type ConfigurationKeysUnion = keyof typeof ConfigurationKeys; // union créée à partir des clés de l'enum

  /*
  On souhaite que "SettingsKeysUnion" soit uniquement composé des clés commençant par "SETTINGS_" :
  */
  const updateSetting = (key: SettingsKeysUnion, value: string) => {};
  //                          ^ Comment définir ce type ?

  // ??? type SettingsKeysUnion = 'SETTINGS_THEME' | 'SETTINGS_LANGUAGE' | 'SETTINGS_NOTIFICATIONS';

  /*
  Il y a plusieurs façon de récupérer seulement les clés "SETTINGS_"
  */
  {
    /*
    La première solution, la plus simple, est d'utiser Extract pour ne prendre que les clés souhaitées :
    */
    // prettier-ignore
    type SettingsKeysUnion = Extract<ConfigurationKeysUnion, 'SETTINGS_THEME' | 'SETTINGS_LANGUAGE' | 'SETTINGS_NOTIFICATIONS'>;
    //   ^?

    /*
    L'inconvénient c'est qu'il faut mettre à jour le type "SettingsKeysUnion" à chaque fois qu'on ajoute un nouveau SETTINGS.
    Et si on pouvait le faire automatiquement ?
    */
  }

  /*
  En jouant avec les types de Typescript, on peut faire des choses plus complexes :
  */
  // prettier-ignore
  type StartsWith<TString extends string, TStart extends string>
    = TString extends `${TStart}${string}` ? TString : never;

  // prettier-ignore
  type SettingsKeysUnion = StartsWith<keyof typeof ConfigurationKeys, 'SETTINGS_'>;
  //   ^?
  // prettier-ignore
  type PaginationKeysUnion = StartsWith<keyof typeof ConfigurationKeys, 'PAGINATION_'>;
  //   ^?

  /*
  On peut maintenant utiliser la fonction updateSetting avec les clés de l'enum "ConfigurationKeys",
  que ce soit avec la valeur littérale ou avec l'enum :
  */
  updateSetting('SETTINGS_THEME', 'dark');
  updateSetting(ConfigurationKeys.SETTINGS_THEME, 'dark');

  /*
  On ne peut pas passer autre chose qu'un "SETTINGS_" :
  */
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
