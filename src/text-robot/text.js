const algorithmia = require('algorithmia')
const apiKey = require('../credentials/algorithmiaSettings.json').apiKey
const sentenceBoundaryDetection = require('sbd')
async function robot(content) {
  console.log(`Recebi com sucesso o content: ${content.searchTerm}`);
  await fetchContentFromWikipedia(content);
  sanitizeContent(content)
  breakContentIntoSentences(content)

  async function fetchContentFromWikipedia(content){
    const algorithmiaAuthenticated = algorithmia(apiKey)
    const wikipediaAlgorithmia = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
    const wikipediaResponse = await wikipediaAlgorithmia.pipe(content.searchTerm)
    const wikipediaContent = wikipediaResponse.get()

    content.sourceContentOriginal = wikipediaContent.content
  }

  function sanitizeContent(content){
    const contentWithoutBlankLinesAndMarkdownAndDates = removeBlankLinesAndMarkdownAndDates(content.sourceContentOriginal)
    content.sourceContentSanitized = contentWithoutBlankLinesAndMarkdownAndDates



    function removeBlankLinesAndMarkdownAndDates(text){
      var sanitizedText = text.split('\n')

      sanitizedText = sanitizedText.filter((line) => !(line.trim().length === 0 || line.trim().startsWith('='))).join(' ')//remoção linhas vazias e que possuam o markdown do wikipedia
      sanitizedText = sanitizedText.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ') // remoção de conteúdo entre parentesis (datas)

      return sanitizedText
    }
  }

  function breakContentIntoSentences(content){
    content.sentences = []
    const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
    sentences.forEach((sentence) => {
      content.sentences.push({
        text: sentence,
        keywords:[],
        images:[]
      })
    })
  }
}

module.exports = robot