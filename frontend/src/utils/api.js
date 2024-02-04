//==============================
// Consts
//==============================
const BASE_URL = 'http://127.0.0.1:8000/api/';


//==============================
// Functions
//==============================
export async function apiSendEmail({ from, subject, message }) {
  const url = `${BASE_URL}email`;
  const options = getApiOption({
    method: 'POST',
    body: JSON.stringify({ from, subject, message })
  });

  return fetch(url, options)
  .then(response => response.json())
  .then(data => data);
}


export function apiTest() {
  const url = `${BASE_URL}test`;
  const options = getApiOption();

  return fetch(url, options)
  .then(response => response.json())
  .then(data => data)
  .catch(error => error.message);
}


function getApiOption({ method, mode, cache, credentials, headers, redirect, referrerPolicy, body } = {}) {
  return {
    method: method || 'GET',
    mode: mode || "cors",
    cache: cache || "no-cache",
    credentials: credentials || "same-origin",
    body: body || undefined,
    headers: headers || { "Content-Type": "application/json" },
    redirect: redirect || "follow",
    referrerPolicy: referrerPolicy || "origin",
  };
}