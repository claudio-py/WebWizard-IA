// Add an event listener to the form's button
// form.addEventListener('submit', function (event) {
// 	// Prevent the form from submitting normally
// 	event.preventDefault()

// 	// Get the text from the input field
// 	const messageText = input.value

// 	// Check if the message is not empty
// 	if (messageText.trim() !== '') {
// 		// Create a new message element
// 		const messageElement = document.createElement('div')
// 		messageElement.classList.add('message', 'you')

// 		// Create a new timedate element
// 		const timeDate = document.createElement('div')
// 		timeDate.classList.add('top')
//     timeDate.textContent = `Você às ${hours}:${minutes < 10 ? '0' + minutes : minutes}`
//     //  createDateStr()
// // Create message itself
// 		const messageBody = document.createElement('div')
// 		messageBody.classList.add('body')
// 		messageBody.textContent = messageText

// 		// Append the message body to the message element
// 		messageElement.appendChild(timeDate)

// 		messageElement.appendChild(messageBody)

// 		// Append the message element to the messages container
// 		messagesContainer.appendChild(messageElement)

// 		// Clear the input field
// 		input.value = ''
// 	}
//   scrollToBottom(scrollMsgs)
// })

// Select the form, input, and messages container

const form = document.getElementById('bottom')
const input = document.getElementById('messageInput')
const messagesContainer = document.getElementsByClassName('messages')[0]
const scrollMsgs = document.getElementById('messages')
const date = new Date()
const month = date.getMonth() + 1
const year = date.getFullYear()
const hours = date.getHours()
const minutes = date.getMinutes()
function scrollToBottom(elementId) {
	if (scrollMsgs) {
		elementId.scrollTop = elementId.scrollHeight
	} else {
		console.log('Element not found')
	}
}
// ============================GEMINI-AI========================
import {
	getGenerativeModel,
	updateUI
} from './shared.js'

let chat

form.addEventListener('submit', async event => {
	event.preventDefault()

	if (!chat) {
		const model = await getGenerativeModel({ model: 'gemini-pro' })
		chat = model.startChat({
			generationConfig: {
				maxOutputTokens: 100
			}
		})
	}

	const userMessage = input.value
	input.value = ''

	// Create UI for the new user / assistant messages pair
	messagesContainer.innerHTML += `
					<div class="message you">
            <div class="top">Você às ${hours}:${
		minutes < 10 ? '0' + minutes : minutes
	}</div>
            <div class="body">${userMessage}</div>
          </div>
          <div class="message model-role">
            <div class="top"> WebWizard-IA às ${hours}:${
		minutes < 10 ? '0' + minutes : minutes
	}</div>
            <div class="body-model"></div>
          </div>
					`

	// scrollToDocumentBottom()
	scrollToBottom(scrollMsgs)
	const resultEls = document.getElementsByClassName('body-model')
	await updateUI(
		resultEls[resultEls.length - 1],
		() => chat.sendMessageStream(userMessage),
		true
	)
	scrollToBottom(scrollMsgs)
})
