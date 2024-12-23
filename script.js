const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#submit"); // Corrected the button ID

const API_KEY = "AIzaSyCRbanx_Z-tdI8tKvTw7JqAZlVNebP9MMc";
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}';
const userData = { message: null };

const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

const generateBotResponse = async() =>{
    const requestOptions = {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            contents:[{
                parts:[{text: userData.message }]
            }]
        })
    }
try{
     const response = await fetch(API_URL, requestOptions);
     constdate =await response.json(); 
     if(!response.ok) throw new Error(DataTransfer.error.message);
    console.log(data);
}catch(error){
    console.log(error);
}
}

const handleOutgoingMessage = () => {
    userData.message = messageInput.value.trim();

    if (userData.message) {
        const messageContent = `<div class="message-text">${userData.message}</div>`;
        const messageElement = createMessageElement(messageContent, "user-message");
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
        messageInput.value = ""; // Clear the input field after sending

        // Simulate bot thinking and replying
        simulateBotResponse();
    }
};

// Listen for the Enter key to send the message
messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevents new line in the textarea
        handleOutgoingMessage();
    }
});

// Listen for the send button click to send the message
sendMessageButton.addEventListener("click", (e) => {
    e.preventDefault();
    handleOutgoingMessage();
});

// Simulate bot response with a "thinking" animation
const simulateBotResponse = () => {
    const thinkingMessageContent = `
        <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
            <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
        </svg>
        <div class="message-text">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    const thinkingMessage = createMessageElement(thinkingMessageContent, "bot-message", "thinking");
    chatBody.appendChild(thinkingMessage);

    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message

    // Simulate delay before bot response
    setTimeout(() => {
        chatBody.removeChild(thinkingMessage); // Remove "thinking" message
        const botResponseContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
            <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
        </svg>
        <div class="message-text">${userData.message}</div>`;
        const botResponseMessage = createMessageElement(botResponseContent, "bot-message");
        chatBody.appendChild(botResponseMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
        generateBotResponse();// Auto-scroll to the latest message
    }, 2000); // 2-second delay for bot response
};
