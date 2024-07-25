const firebaseConfig = {
  apiKey: "AIzaSyA9suDu9h2XGro5ydhTKhkHSMK0bM3KzmA",
  authDomain: "let-schat-65540.firebaseapp.com",
  projectId: "let-schat-65540",
  storageBucket: "let-schat-65540.appspot.com",
  messagingSenderId: "594193781462",
  appId: "1:594193781462:web:525e0545e357c30dfb6f77"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();

let message = document.getElementById("message")
let display = document.getElementById("display")
let signupForm = document.getElementById("signupForm")
let loginForm = document.getElementById("loginForm")
let loginbtn = document.getElementById("loginbtn")
let signbtn = document.getElementById("signbtn")

loginForm.style.display = "none"
signbtn.style.backgroundColor = "green"

function signupPage() {
  let signupForm = document.getElementById("signupForm")
  let loginForm = document.getElementById("loginForm")
  let loginbtn = document.getElementById("loginbtn")
  let signbtn = document.getElementById("signbtn")
  signupForm.style.display = "block"
  loginForm.style.display = "none"
  signbtn.style.backgroundColor = "green"
  loginbtn.style.backgroundColor = "blue"
}

function loginPage() {
  let signupForm = document.getElementById("signupForm")
  let loginForm = document.getElementById("loginForm")
  let loginbtn = document.getElementById("loginbtn")
  let signbtn = document.getElementById("signbtn")
  signupForm.style.display = "none"
  loginForm.style.display = "block"
  loginbtn.style.backgroundColor = "green"
  signbtn.style.backgroundColor = "blue"
}

function register(ev) {
  ev.preventDefault()

  firebase.auth().createUserWithEmailAndPassword(email.value, pass.value)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log(user);
      alert("Registration Successful")
      message.innerHTML = `<h3 class = "text-success"> Registration Successfull</h3>`
      // ...
      loginPage()
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      message.innerHTML = `<p class = "text-danger">${errorMessage}</p>`
      // ..
    });
}

function login(ev) {
  ev.preventDefault()
  console.log("Login");

  firebase.auth().signInWithEmailAndPassword(Logemail.value, password.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user);
    alert("Login Successful")
    // ...
    window.location.href = "index.html"
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    display.innerHTML = `<p class = "text-danger">${errorMessage}</p>`
  });
}

function withGoogle(ev) {
  console.log(ev);
  ev.preventDefault()
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // IdP data available in result.additionalUserInfo.profile.
      // ...
      alert("Signed In")
      window.location.href = "index.html"
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorMessage);
      message.innerHTML = `<p class = "text-danger">${errorMessage}</p>`
    });

}

