const translations = {
    en: {
        alertPasswordMismatch: "Passwords do not match!",
        alertAccountCreated: "Account created successfully! Please log in.",
        alertInvalidLogin: "Invalid email or password!",
        logIn: "Log in",
        signUp: "Sign Up",
        rememberMe: "Remember me",
        needHelp: "Need help?",
        newToNetflix: "New to Netflix?",
        signUpNow: "Sign up now",
        alreadyHaveAccount: "Already have an account?",
        signupName: "Enter your name",
        signupEmail: "Enter your email",
        signupPassword: "Enter password",
        signupConfirm: "Confirm password",
        loginEmail: "Enter your email",
        loginPassword: "Enter password",
        signUpBtn: "Sign Up",
        loginBtn: "Log In"
    },
    ar: {
        alertPasswordMismatch: "كلمات المرور غير متطابقة!",
        alertAccountCreated: "تم إنشاء الحساب بنجاح! الرجاء تسجيل الدخول.",
        alertInvalidLogin: "البريد الإلكتروني أو كلمة المرور غير صحيحة!",
        logIn: "تسجيل الدخول",
        signUp: "إنشاء حساب",
        rememberMe: "تذكرني",
        needHelp: "هل تحتاج مساعدة؟",
        newToNetflix: "جديد على نتفليكس؟",
        signUpNow: "سجل الآن",
        alreadyHaveAccount: "هل لديك حساب؟",
        signupName: "اكتب اسمك",
        signupEmail: "اكتب بريدك الإلكتروني",
        signupPassword: "اكتب كلمة المرور",
        signupConfirm: "تأكيد كلمة المرور",
        loginEmail: "اكتب بريدك الإلكتروني",
        loginPassword: "اكتب كلمة المرور",
        signUpBtn: "إنشاء حساب",
        loginBtn: "تسجيل الدخول"
    }
};


let currentLang = "en";

function setLanguage(lang) {
    currentLang = lang;

    if (lang === "ar") {
        document.documentElement.lang = "ar";
        document.body.dir = "rtl";
    } else {
        document.documentElement.lang = "en";
        document.body.dir = "ltr";
    }
    document.querySelector("#signup-form .fullname").textContent = translations[lang].signupName;
    document.querySelector("#signup-form .email").textContent = translations[lang].signupEmail;
    document.querySelector("#signup-form .pass").textContent = translations[lang].signupPassword;
    document.querySelector("#signup-form .passconf").textContent = translations[lang].signupConfirm;

    document.querySelector("#login-form .email").textContent = translations[lang].loginEmail;
    document.querySelector("#login-form .pass").textContent = translations[lang].loginPassword;

    document.querySelector("#login-form .form-title").textContent = translations[lang].logIn;
    document.querySelector("#login-form .btn").textContent = translations[lang].logIn;

    document.querySelector("#signup-form .form-title").textContent = translations[lang].signUp;
    document.querySelector("#signup-form .btn").textContent = translations[lang].signUp;

    document.querySelector("label[for='remember']").textContent = translations[lang].rememberMe;
    document.querySelector("#login-form .form-help a").textContent = translations[lang].needHelp;

    const newToNetflixTextNode = document.querySelector(".new-to-netflix").childNodes[0];
    newToNetflixTextNode.nodeValue = translations[lang].newToNetflix + " ";
    document.querySelector(".new-to-netflix a").textContent = translations[lang].signUpNow;

    const formSwitchTextNode = document.querySelector(".form-switch").childNodes[0];
    formSwitchTextNode.nodeValue = translations[lang].alreadyHaveAccount + " ";
    document.querySelector(".form-switch .form-switch-btn").textContent = translations[lang].logIn;
}

document.querySelectorAll('.form-switch-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.form-container').forEach((form) => {
            form.classList.remove('active');
        });
        const targetFormId = btn.getAttribute('data-target');
        document.getElementById(targetFormId).classList.add('active');
    });
});

function togglePasswordVisibility(toggleId, inputId) {
    const toggleIcon = document.getElementById(toggleId);
    const passwordInput = document.getElementById(inputId);

    toggleIcon.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        const icon = toggleIcon.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}
togglePasswordVisibility('login-password-toggle', 'login-password');
togglePasswordVisibility('signup-password-toggle', 'signup-password');

document.querySelector('#signup-form form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (password !== confirm) {
        alert(translations[currentLang].alertPasswordMismatch);
        return;
    }

    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userName', name);

    alert(translations[currentLang].alertAccountCreated);

    document.getElementById('login-form').classList.add('active');
    document.getElementById('signup-form').classList.remove('active');
});

document.querySelector('#login-form form').addEventListener('submit', function(e) {
    e.preventDefault();

    const loginEmail = document.getElementById('login-email').value;
    const loginPassword = document.getElementById('login-password').value;

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (loginEmail === storedEmail && loginPassword === storedPassword) {
        window.location.href = 'home.html';
    } else {
        alert(translations[currentLang].alertInvalidLogin);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.querySelector(".language-selector");
    setLanguage(langSelect.value === "العربية" ? "ar" : "en");

    langSelect.addEventListener("change", (e) => {
        const selected = e.target.value === "العربية" ? "ar" : "en";
        setLanguage(selected);
    });
});