const auth = () => {

    const btnAuth = document.querySelector('.button-auth');
    const modalAuth = document.querySelector('.modal-auth');
    const closeAuth = document.querySelector('.close-auth');
    const btnLogin = document.querySelector('.button-login');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const btnOut = document.querySelector('.button-out');
    const userName = document.querySelector('.user-name');
    const btnCart = document.querySelector('.button-cart');

    const onOpenLoginForm = () => { modalAuth.style.display = "flex"; }
    const onCloseAuth = () => { modalAuth.style.display = "none"; }
    const onLogin = (user) => {
        btnAuth.style.display = "none";
        btnOut.style.display = "flex";
        userName.style.display = "flex";
        userName.textContent = user.userName;
        btnCart.style.display = "flex";


    }
    const onAuthUser = (event) => {
        event.preventDefault();
        if (loginInput.value) {
            const user = {
                userName: loginInput.value,
                password: passwordInput.value,
            }
            onCloseAuth();
            localStorage.setItem("user", JSON.stringify(user));
            onLogin(user);
        }
        else {
            alert("Enter username");
        }
    }





    const onLogout = () => {
        btnAuth.style.display = "flex";
        btnOut.style.display = "none";
        userName.style.display = "none";
        userName.textContent = "";
        btnCart.style.display = "none";
        localStorage.removeItem("user");
        window.location.href = "index.html";
    }


    btnAuth.addEventListener("click", onOpenLoginForm);
    closeAuth.addEventListener("click", onCloseAuth);
    btnLogin.addEventListener("click", onAuthUser);
    btnOut.addEventListener("click", onLogout);

    if (localStorage.getItem("user")) {
        onLogin(JSON.parse(localStorage.getItem("user")));
    }
}

auth();