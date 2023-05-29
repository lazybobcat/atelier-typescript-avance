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

Documentation complète : https://www.typescriptlang.org/tsconfig
