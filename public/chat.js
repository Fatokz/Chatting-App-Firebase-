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
const db = firebase.firestore();

let userEmail = document.getElementById("userEmail");
let chatMeaasge = document.getElementById("chatMeaasge");
let dispMessages = document.getElementById("dispMessages");
let down = document.getElementById("down");
let profileImg = document.getElementById("profileImg");
let currentUser;

// function edits() {
//     alert("Edit your profile")
//     window.location.href = "edit.html"
// }

// setTimeout(() => {
//     edits()
// }, 2000);

// function pro() {
//     db.collection("Chat").get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//             profileImg.innerHTML+= `
//                 <img class = "ava" src= "${doc.data().avatar == null ? doc.data().avatar = 'chatIcon.png' : doc.data().avatar}" />  
//             `
//         });
//     });
// }

// pro()

function autheticateUser() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //User is Signed Out
            console.log(user);
            currentUser = user;
            var uid = user.uid;
            userEmail.innerHTML = user.email;
            // ...
        } else {
            // User is signed out
            // ...
            alert("Please login")
            window.location.href = "signup.html"
        }
    });
}

autheticateUser()

function logout() {
    // ev.preventDefault()

    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "signup.html"
    }).catch((error) => {
        // An error happened.
        alert("Couldn't log out")
        console.log(error);
    });
}


function sendMessage(ev) {
    if (chatMeaasge.value == "") {
        return;
    }
    else {
        // Add a new document in collection "cities"
        db.collection("Chat").doc().set({
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
            time: new Date(),
            message: chatMeaasge.value
        })
            .then(() => {
                console.log("Document successfully written!");
                alert("Sent")
                chatMeaasge.value = "";
                allMesages()
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
}


function allMesages() {
    db.collection("Chat").orderBy('time').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            dispMessages.innerHTML += `
                <li ondblclick = "delMessage('${doc.id}', '${doc.data().name}')" class = "mess ${doc.data().name == currentUser.displayName ? 'ms-auto' : 'me-auto'}">
                <img class = "ava" src= "${doc.data().avatar == null ? doc.data().avatar = 'chatIcon.png' : doc.data().avatar}" />
                <small>${doc.data().name}</small>
                <p>${doc.data().message}</p>
                <small class="ttime"><b>${new Date(doc.data().time.seconds*1000).toLocaleTimeString()}</b></small>
                </li>
            `
        });
    });
}

allMesages();

function show(){
    down.style.display == "none" ? down.style.display = "block" : down.style.display = "none"
}

function delMessage(id, name) {
    // console.log(currentUser.displayName, name);
  if (currentUser.displayName == name) {
    db.collection("Chat").doc(id).delete().then(() =>{
        console.log("Document successfully deleted");
        alert("Document successfully deleted");
        allMesages();
    }).catch((error)=>{
        console.log("Error removing document:", error);
    })
  }else{
    alert("Access denial");
    return;
  }
}