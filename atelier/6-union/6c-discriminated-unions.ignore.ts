/*
6c - Discriminated unions

On peut se servir des unions pour "réduire" un type à un type plus spécifique.
On pourra ainsi profiter de l'autocomplétion de Typescript, mais surtout éviter les erreurs
de typage.
*/

// Exemple de problème :
{
  type Shape = {
    type: 'cercle' | 'carré';
    rayon?: number;
    côté?: number;
  };

  // On déclare un carré avec un rayon !? Typescript nous laisse faire.
  const carré: Shape = { type: 'carré', rayon: 10 };
}

// Solution : discriminated unions
{
  // Comprendre : Shape est soit un cercle avec un rayon, soit un carré avec un côté :
  type Shape =
    | { type: 'cercle'; rayon: number }
    | { type: 'carré'; côté: number };

  // @ts-expect-error : on ne peut pas déclarer un carré avec un rayon
  const carré: Shape = { type: 'carré', rayon: 10 }; // Impossible, Typescript nous prévient. Et on a de l'autocomplétion !

  // @ts-expect-error : Typescript nous prévient aussi si des attributs manquent !
  const cercle: Shape = { type: 'cercle' };
}

// Exemple plus concret :
{
  type HttpValidResponse = {
    code: number;
    status: 'ok';
    body: string;
  };
  type HttpErrorResponse = {
    code: number;
    status: 'error';
    error: string;
  };
  type HttpResponse = HttpValidResponse | HttpErrorResponse;

  const handleResponse = (response: HttpResponse) => {
    if (response.status === 'ok') {
      // On ne peut que récupérer "body", car Typescript sait que "status" est "ok". + Autocomplétion !
    } else {
      // On ne peut que récupérer "error", car Typescript sait que "status" est "error". + Autocomplétion !
    }
  };

  handleResponse({ code: 200, status: 'ok', body: 'Hello world' });
  handleResponse({ code: 404, status: 'error', error: 'Not found' });
}
