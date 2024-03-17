// const form = document.getElementById('bottom')
// const input = document.getElementById('messageInput')
// const messagesContainer = document.getElementsByClassName('messages')[0]
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
// ====================TESTE================

    const chatHistory = document.getElementById('chat-history')
const userInput = document.getElementById('user-input')
const form = document.getElementById('chat-form')

async function sendMessage() {
	const userMessage = userInput.value
	userInput.value = '' // Clear input field
	chatHistory.innerHTML += `
					<div class="message you">
            <div class="top">Você às ${hours}:${
		minutes < 10 ? '0' + minutes : minutes
	}</div>
            <div class="user-message">${userMessage}</div>
          </div>
					`
		scrollToBottom(scrollMsgs)
	
	try {
		const response = await fetch('/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ userInput: userMessage })
		})

		const data = await response.json()
		console.log(data)
		const botMessage = data.response
	
		// Add chat message to the chat history
chatHistory.innerHTML += `
           <div class="message model-role">
            <div class="top"> WebWizard-IA às ${hours}:${
	minutes < 10 ? '0' + minutes : minutes
}</div>
            <div class="bot-message">${botMessage}</div>
          </div>
          `
		// Scroll to the bottom of the chat history
		chatHistory.scrollTop = chatHistory.scrollHeight
		scrollToBottom(scrollMsgs)
	} catch (error) {
		console.error('Error:', error)
		// Handle errors gracefully, e.g., display an error message to the user
	}
}

form.addEventListener('submit', event => {
	event.preventDefault() // Prevent form submission

	// // Get the text from the input field
	// const messageText = userInput.value

	// // Check if the message is not empty
	// if (messageText.trim() !== '') {
	// 	chatHistory.innerHTML += `
	// 						<div class="message you">
	// 	            <div class="top">Você às ${hours}:${
	// 		minutes < 10 ? '0' + minutes : minutes
	// 	}</div>
	// 	            <div class="user-message">${userMessage}</div>
	// 	          </div>
	// 						`
	// 	// Clear the input field
	// 	userInput.value = ''
	// }

	const loader = document.getElementById('loader')
	loader.style.display = 'block' // Show the loader
	sendMessage().finally(() => {
		loader.style.display = 'none' // Hide the loader after the message is sent
	})
})


