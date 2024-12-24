const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton =document.querySelector("#submit");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper =document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggler =document.querySelector("#chatbot-Toggler");
const closeChatbot = document.querySelector("#close-chatbot");


const API_KEY = "AIzaSyCRbanx_Z-tdI8tKvTw7JqAZlVNebP9MMc";
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}';

const userData = {
     message: null,
    file:{
        date: null,
        mime_type:null
    } };

const chatHistory = [];
const initialInputHeight = messageInput.scrollHeight;

const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

const generateBotResponse = async(incomingMessageDiv) =>{
    const messageElement = incomingMessageDiv.querySelector(".message-text");
chatHistory.push({
    role: "user",
    parts:[{text: userData.message },...(userData.file.data ?[{inline_data: userData.file}]:
        [])]

});

    const requestOptions = {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            contents:chatHistory
            
        })
    }
try{
     const response = await fetch(API_URL, requestOptions);
     constdate =await response.json();

     if(!response.ok) throw new Error(data.error.message);

    const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();

    messageElement.innerText = apiResponseText;
}catch(error){
    console.log(error);
    messageElement.innerText = error.message;
}
}