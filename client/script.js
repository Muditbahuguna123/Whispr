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
        login_page.style.display = "none";
        main_page.style.display = "block";
    }
    else{
        alert('Wrong password');
    }
});