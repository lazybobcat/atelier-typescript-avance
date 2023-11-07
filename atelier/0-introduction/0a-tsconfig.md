<h1 style="font-size: 11px; margin-bottom: 1rem;">
Introduction / 0a. tsconfig
</h1>

# Le fichier tsconfig.json

Il s'agit du fichier de configuration de typescript, des règles de compilation.

Les configurations peuvent dépendre du type de projet, Angular par exemple ajoute ses propres options.
S'il y a une configuration qui devrait être présente dans tous les projets, c'est "strict" :

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "strict": true
  }
}
```

Voici un exemple de configuration :

```json
{
  "compilerOptions": {
    /* Options de base */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "verbatimModuleSyntax": true,
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",

    /* Strictness */
    "strict": true,
    "noUncheckedIndexedAccess": true,

    /* Si on développe une library ou un projet avec des library */
    "declaration": true,
    "composite": true,
    "sourceMap": true,
    "declarationMap": true

    /* Si le code s'éxécute dans le DOM */
    "lib": ["es2022", "dom", "dom.iterable"],

    /* Angular va ajouter ses propres options */
    "angularCompilerOptions": {
      // ...
    },

    "exclude": ["node_modules", "tmp"]
  }
}
```

Documentation complète : https://www.typescriptlang.org/tsconfig
