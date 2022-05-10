import { MyMessage, OthersMessage, LogMessage } from "./messageGen.js"

const form = document.getElementById('message-form')
const messagesDiv = document.getElementById("messages")

const defaultUser = "Anonimo"
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})
const userEncode = (params.user) ? params.user : defaultUser

window.history.pushState("", "", '/chat/return/')

const wsPrefix = (window.location.protocol === 'https:') ? 'wss://' : 'ws://'
const wsUrl = `${wsPrefix}${window.location.host}/ws/chat/${encodeURIComponent(userEncode)}/`

const chatsocket = new WebSocket(wsUrl)


const alertModal = document.getElementById("alert-modal")

chatsocket.addEventListener('error', function (event) {
    let btn = document.getElementById("modal-btn")
    btn.addEventListener('click', ()=>{
        window.location.replace(`${window.location}`)
    })
    alertModal.classList.toggle("hidden")
})

chatsocket.onmessage = function (e) {
    let data = JSON.parse(e.data)
    if (data.type === 'send_message') {
        let isAuthor = (data.author == userEncode)
        let message = {
            author: data.author,
            content: data.message
        }
        messagesDiv.insertAdjacentHTML('beforeend', (isAuthor) ? MyMessage(message) : OthersMessage(message))
    } else {
        let log = {
            user: data.author,
            status: data.message
        }
        messagesDiv.insertAdjacentHTML('beforeend', LogMessage(log))
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let message = e.target.message.value
    if (message) {
        chatsocket.send(JSON.stringify({
            'message': message,
            'author': userEncode
        }))
        form.reset()
    }
})


const scrollSmoothlyToBottom = () => {
    let allMessagesList = messagesDiv.childNodes
    let lastMessage = allMessagesList[allMessagesList.length-1]
    messagesDiv.scrollTop = messagesDiv.scrollHeight
    window.scroll(0, lastMessage.getBoundingClientRect.y)
}

const observer = new MutationObserver(function(mutations) {
mutations.forEach(function(mutation) {
    scrollSmoothlyToBottom()
  })
})

const config = { childList: true }

observer.observe(messagesDiv, config);
