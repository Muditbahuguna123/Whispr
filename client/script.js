let login_form = document.getElementById("login-form");
let login_page = document.getElementById("login-page");
let main_page = document.getElementById("main-page");
let username = "";
login_form.addEventListener("submit", function(e){
    e.preventDefault();
    /*What does e.preventDefault() actually do?
    👉 It stops the browser’s default behavior for that event.
    In a form submission, the browser’s default behavior is:
    ❌ Submit the form → reload the page → send data to a URL*/
    username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if(password === "1234") //Because everything coming from an HTML input field is a STRING, not a number.
    {
        let login_page = document.getElementById("login-page");
        let main_page = document.getElementById("main-page");
        login_page.classList.add("hidden");
        main_page.classList.remove("hidden");
        sessionStorage.setItem("isLoggedIn", "true");
    }
    else{
        alert('Wrong password');
    }
});

function logout()
{
    sessionStorage.removeItem("isLoggedIn");
    let login_page = document.getElementById("login-page");
    let main_page = document.getElementById("main-page");
    login_page.classList.remove("hidden");
    main_page.classList.add("hidden");
}

window.onload = ()=>{
    if(sessionStorage.getItem("isLoggedIn") === "true")
    {
        let login_page = document.getElementById("login-page");
        let main_page = document.getElementById("main-page");
        login_page.classList.add("hidden");
        main_page.classList.remove("hidden");
    }
}

//socket working

const socket = io("http://localhost:3000");
const SECRET_KEY = "whispr-secret-key";

function encryptMessage(message) {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
}
function decryptMessage(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById('message-input');

chatForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const message = messageInput.value.trim();
    if(!message)
    {
        return;
    }
    const encryptedMessage = encryptMessage(message);
    socket.emit("send-message", {
        user: username,
        message: encryptedMessage});
    addMessage("You", message, "right");
    messageInput.value = "";
});

socket.on("receive-message", (data)=>{
    const decryptedMessage = decryptMessage(data.message);
    addMessage(data.user, decryptedMessage, "left");
});

function addMessage(sender, text, side){
    const messages = document.querySelector(".chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", side);

    const senderDiv = document.createElement("div");
    senderDiv.classList.add("sender");
    senderDiv.innerText = sender;

    const bubbleDiv = document.createElement("div");
    bubbleDiv.classList.add("bubble");
    bubbleDiv.innerText = text;

    messageDiv.append(senderDiv, bubbleDiv);
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight; //auto scroll to bottom
}