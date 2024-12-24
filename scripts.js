const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#submit");

const API_KEY = "AIzaSyDkDGWNCXmnnq7LpXoZDJqhzb4pGOw7o1w"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5:generateText?key=${API_KEY}`;
const userData = { message: null };

// Create a new message element
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

// Generate bot response using the Gemini API
const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: {
                text: userData.message,
            },
            maxOutputTokens: 200, // Limit response length
        }),
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Failed to fetch response");
        }

        // Extract the response text from API
        const apiResponseText = data.candidates?.[0]?.output || "I couldn't understand your message.";
        messageElement.innerText = apiResponseText;
    } catch (error) {
        console.error(error);
        messageElement.innerText = "Sorry, there was an error processing your request.";
    }
};

// Handle user's outgoing message
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
            <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5z"></path>
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
        const incomingMessageDiv = createMessageElement('<div class="message-text">...</div>', "bot-message");
        chatBody.appendChild(incomingMessageDiv);
        generateBotResponse(incomingMessageDiv);
    }, 2000); // 2-second delay for bot response
};
