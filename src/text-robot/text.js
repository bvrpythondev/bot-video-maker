const algorithmia = require('algorithmia')
const apiKey = require('../credentials/algorithmiaSettings.json').apiKey
async function robot(content) {
  console.log(`Recebi com sucesso o content: ${content.searchTerm}`);
  await fetchContentFromWikipedia(content);
  //sanitizeContent(content)
  //breakContentIntoSentences(content)

  async function fetchContentFromWikipedia(content){
    const algorithmiaAuthenticated = algorithmia(apiKey)
    const wikipediaAlgorithmia = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
    const wikipediaResponse = await wikipediaAlgorithmia.pipe(content.searchTerm)
    const wikipediaContent = wikipediaResponse.get()

    console.log(wikipediaContent);
  }
}

module.exports = robot