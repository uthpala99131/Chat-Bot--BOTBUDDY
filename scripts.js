const API_KEY = "AIzaSyCRbanx_Z-tdI8tKvTw7JqAZlVNebP9MMc";
const API_URL = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash:generateText?key=${API_KEY}`;

const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#submit");

const userData = { message: null };

const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt: {
                text: userData.message,
            },
        }),
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error.message);

        // Extract and display the API response
        const apiResponseText = data.candidates[0].output.trim();
        messageElement.innerText = apiResponseText;
    } catch (error) {
        console.error(error);
        messageElement.innerText = "Sorry, I couldn't process your request. Please try again.";
    }
};

const handleOutgoingMessage = () => {
    userData.message = messageInput.value.trim();

    if (userData.message) {
        const messageContent = `<div class="message-text">${userData.message}</div>`;
        const messageElement = createMessageElement(messageContent, "user-message");
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
        messageInput.value = ""; // Clear the input field after sending

        simulateBotResponse();
    }
};

const simulateBotResponse = () => {
    const thinkingMessageContent = `
        <div class="message-text">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    const thinkingMessage = createMessageElement(thinkingMessageContent, "bot-message", "thinking");
    chatBody.appendChild(thinkingMessage);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        chatBody.removeChild(thinkingMessage);
        const botMessageDiv = createMessageElement('<div class="message-text"></div>', "bot-message");
        chatBody.appendChild(botMessageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        generateBotResponse(botMessageDiv);
    }, 1000); // Simulate a 1-second delay
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
