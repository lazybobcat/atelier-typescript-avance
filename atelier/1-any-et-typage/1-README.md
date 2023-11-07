<h1 style="font-size: 11px; margin-bottom: 1rem;">
<code>any</code> et typage
</h1>

```typescript
function estUnChat(animal: Animal): animal is Chat {
  return 'chat' === animal.espece;
}
```

## Introduction

![any meme](../../images/meme_any.jpg)

## Sommaire

<ol style="list-style-type: lower-alpha">
    <li><code>any</code></li>
    <li><code>any</code> implicite</li>
    <li><code>as</code></li>
    <li><code>unknown</code></li>
    <li>Type guards</li>
    <li>Type guards avec "predicate"</li>
</ol>

## Après ce chapitre je saurai

- Qu'il ne faut **jamais** utiliser <code>any</code> 😠
- Qu'on peut **parfois** utiliser <code>any</code> 😱
- Utiliser <code>as</code> pour indiquer à Typescript le type d'une variable
- Utiliser <code>unknown</code> lorsque le type est inconnu à la compilation mais qu'on peut le "réduire" à un type spécifique
- Utiliser et créer des "type guards" permettant d'indiquer ou de vérifier le type
