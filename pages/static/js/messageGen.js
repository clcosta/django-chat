export function LogMessage(message) {
    return `<div class="chat-message-log">
    <div class="flex items-center justify-center">
        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-center">
            <div class="px-4 py-2 rounded-lg inline-block 300">
                <legend class="text-sm text-zinc-500 font-bold">${message.user}<span class="text-zinc-400"> ${message.status}</span></legend>
            </div>
        </div>
    </div>
</div>`
}

export function OthersMessage(message) {
    return `<div class="chat-message" from="${message.author}">
    <div class="flex items-end">
        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                <legend class="text-sm text-amber-900 font-bold uppercase">${message.author}</legend>
                <span class="text-base">${message.content}</span>
            </div>
        </div>
    </div>
</div>`
}

export function MyMessage(message) {
    return `<div class="chat-message" from="${message.author}">
    <div class="flex items-end justify-end">
        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-indigo-600 text-white">
                <span class="text-base">${message.content}</span>
            </div>
        </div>
    </div>
</div>`
}