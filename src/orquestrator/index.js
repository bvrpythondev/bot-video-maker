const robots = {
  userInput: require('../user-input/user-input'),
  text: require('../text-robot/text.js')
}
async function start() {
  const content = {}

  robots.userInput(content)
  await robots.text(content)

  console.log(content)

}
start()