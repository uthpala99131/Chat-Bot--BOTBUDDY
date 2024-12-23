const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#submit"); // Correct button ID

const API_KEY = "AIzaSyCRbanx_Z-tdI8tKvTw7JqAZlVNebP9MMc"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const userData = { message: null };

const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

const generateBotResponse = async () => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt: {
                messages: [
                    {
                        author: "user",
                        content: userData.message,
                    },
                ],
            },
        }),
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error.message);

        // Extract bot's reply and append it
        const botReply = data.candidates?.[0]?.content || "I'm sorry, I couldn't process your message.";
        const botResponseMessage = createMessageElement(
            `<div class="message-text">${botReply}</div>`,
            "bot-message"
        );
        chatBody.appendChild(botResponseMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
    } catch (error) {
        console.error("Error fetching bot response:", error);
        const errorMessage = createMessageElement(
            `<div class="message-text">Oops! Something went wrong. Please try again later.</div>`,
            "bot-message"
        );
        chatBody.appendChild(errorMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
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
        <div class="bot-avatar"></div>
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
        generateBotResponse();
    }, 2000); // 2-second delay for bot response
};
