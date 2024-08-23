const API = "https://api.dictionaryapi.dev/api/v2/entries/en";
export function getWords(word) {
  return fetch(`${API}/${word}`)
    .then((r) => r.json())
    .then((json) => json);
}
