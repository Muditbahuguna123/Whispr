let login_form = document.getElementById("login-form");
let login_page = document.getElementById("login-page");
let main_page = document.getElementById("main-page");
login_form.addEventListener("submit", function(e){
    e.preventDefault();
    /*What does e.preventDefault() actually do?
    👉 It stops the browser’s default behavior for that event.
    In a form submission, the browser’s default behavior is:
    ❌ Submit the form → reload the page → send data to a URL*/
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if(password === "1234") //Because everything coming from an HTML input field is a STRING, not a number.
    {
        let login_page = document.getElementById("login-page");
        let main_page = document.getElementById("main-page");
        login_page.classList.add("hidden");
        main_page.classList.remove("hidden");
        localStorage.setItem("isLoggedIn", "true");
    }
    else{
        alert('Wrong password');
    }
});

function logout()
{
    localStorage.removeItem("isLoggedIn");
    let login_page = document.getElementById("login-page");
    let main_page = document.getElementById("main-page");
    login_page.classList.remove("hidden");
    main_page.classList.add("hidden");
}

window.onload = ()=>{
    if(localStorage.getItem("isLoggedIn") === "true")
    {
        let login_page = document.getElementById("login-page");
        let main_page = document.getElementById("main-page");
        login_page.classList.add("hidden");
        main_page.classList.remove("hidden");
    }
}