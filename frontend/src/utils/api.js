export async function apiSendEmail({ email, message }) {
  const apiUrl = "http://127.0.0.1:8000/api/events";
  const apiOption = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringifyQuery({ email, message }),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrerPolicy: "origin",
  };

  try {
    const res = await fetch(apiUrl, apiOption);
    return res;
  } catch (error) {
    return error;
  }
}


export function apiTest() {
  const url = 'http://127.0.0.1:8000/test';
  const apiOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrerPolicy: "origin",
  };

  fetch(url, apiOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nella richiesta. Status: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Risposta:', data);
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error.message);
    });

}