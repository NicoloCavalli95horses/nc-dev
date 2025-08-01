//==============================
// Consts
//==============================
const BASE_URL  = import.meta.env.DEV ? "http://127.0.0.1:8000/api/" : "https://nicolocavalli.com/api/";
const API_TOKEN = import.meta.env.VITE_API_TOKEN; // env variables need to have VITE_ prefix to be imported here
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

//==============================
// Export functions
//==============================

/**
 * 
 * @param {Object} args 
 * @param {String} args.from 
 * @param {Subject} args.subject 
 * @param {Message} args.message
 * @returns response object 
 */
export async function apiGetGithubData() {
  const url = `https://api.github.com/users/NicoloCavalli95horses/repos`;
  const options = _getApiOptions( {token: GITHUB_TOKEN} );
  return await _executeApi({ url, options });
}

/**
 * 
 * @param {Object} args 
 * @param {String} args.from 
 * @param {Subject} args.subject 
 * @param {Message} args.message
 * @returns response object 
 */
export async function apiSendEmail({ from, subject, message }) {
  const url = `${BASE_URL}email`;
  const options = _getApiOptions({
    method: "POST",
    body: JSON.stringify({ from, subject, message }),
  });
  return await _executeApi({ url, options });
}


/**
 * This is an API test
 * @returns response object
 */
export async function apiTest() {
  const url = `${BASE_URL}test`;
  const options = _getApiOptions();
  return await _executeApi({ url, options });
}

/**
 * Get all the tags and their frequencies
 * @returns response object
 */
export async function apiGetTags() {
  const url = `${BASE_URL}tags`;
  const options = _getApiOptions();
  return await _executeApi({ url, options });
}


/**
 * Get all the articles
 * @returns response object
 */
export async function apiGetArticles({params}) {
  const query = new URLSearchParams(params).toString();
  const url = `${BASE_URL}post?${query}`;
  const options = _getApiOptions();
  return await _executeApi({ url, options });
}


/**
 * Get a single article
 * @param {Object} args 
 * @param {Integer} args.id - the ID of the article
 * @returns response object 
 */
export async function apiGetArticle({ id }) {
  const url = `${BASE_URL}post/${id}`;
  const options = _getApiOptions();
  return await _executeApi({ url, options });
}


/**
 * Create a new article
 * @param {Object} args 
 * @param {Integer} args.id - the ID of the article
 * @param {String} args.title - the title of the article
 * @param {String} args.description - the description of the article
 * @param {String} args.content - the html content of the article
 * @param {Array} args.tags - tags of the article
 * @returns response object 
 */
export async function apiCreateArticle({
  id,
  title,
  description,
  content,
  tags,
}) {
  const url = `${BASE_URL}post`;
  const options = _getApiOptions({
    method: "POST",
    accept: "application/json",
    body: JSON.stringify({
      id,
      title,
      description,
      content,
      tags: JSON.stringify(tags),
    }),
  });
  return await _executeApi({ url, options });
}


/**
 * Update an article
 * @param {Object} args 
 * @param {Integer} args.id - the ID of the article
 * @param {String} args.title - the title of the article
 * @param {String} args.description - the description of the article
 * @param {String} args.content - the html content of the article
 * @param {Array} args.tags - tags of the article
 * @returns response object 
 */
export async function apiUpdateArticle({
  id,
  title,
  description,
  content,
  tags,
  start_time,
}) {
  const url = `${BASE_URL}post/${id}`;
  const options = _getApiOptions({
    method: "PUT",
    accept: "application/json",
    body: JSON.stringify({
      title,
      description,
      content,
      tags: JSON.stringify(tags),
      start_time,
    }),
  });
  return await _executeApi({ url, options });
}


/**
 * Delete an article
 * @param {Object} args 
 * @param {Integer} args.id - the ID of the article
 * @returns response object 
 */
export async function apiDeleteArticle({ id }) {
  const url = `${BASE_URL}post/${id}`;
  const options = _getApiOptions({
    method: "DELETE",
    accept: "application/json",
  });
  return await _executeApi({ url, options });
}

/**
 * Login as admin
 * @param {Object} args 
 * @param {Integer} args.username
 * @param {Integer} args.password
 * @returns response object 
 */
export async function apiLogin({ username, password }) {
  const url = `${BASE_URL}login`;
  const options = _getApiOptions({
    method: "POST",
    accept: "application/json",
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return await _executeApi({ url, options });
}

//==============================
// Private
//==============================

async function _executeApi({ url, options }) {
  try {
    const response = await fetch(url, options);
    
    if (response.ok && response.status === 200) {
      return await response.json();
    } else {
      console.warn('API error', response)
      return;
    }

  } catch {
    return;
  }
}

function _getApiOptions({
  method,
  mode,
  cache,
  credentials,
  headers,
  redirect,
  referrerPolicy,
  body,
  accept,
  token = API_TOKEN,
} = {}) {
  return {
    method: method || "GET",
    mode: mode || "cors",
    cache: cache || "no-cache",
    credentials: credentials || "same-origin",
    body: body || undefined,
    accept: accept,
    headers: {
      ...headers,
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    redirect: redirect || "follow",
    referrerPolicy: referrerPolicy || "origin",
  };
}
