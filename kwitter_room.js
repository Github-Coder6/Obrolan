var firebaseConfig = {
    apiKey: "AIzaSyB_1x7RuVIS695A6GUq7Hp05McbkpYk0gs",
    authDomain: "obrolan-fe48a.firebaseapp.com",
    databaseURL: "https://obrolan-fe48a-default-rtdb.firebaseio.com",
    projectId: "obrolan-fe48a",
    storageBucket: "obrolan-fe48a.appspot.com",
    messagingSenderId: "780753257737",
    appId: "1:780753257737:web:ef8a630c7d9edd60767fd8",
    measurementId: "G-9WHF6SDZQ1"
    
  };
    firebase.initializeApp(firebaseConfig); user_name = localStorage.getItem("user_name");
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    //Start code
    console.log("Room Name -" + Room_names);
    row="<div class='room_name' id="+Room_names+"onclick='redirectToRoomName(this.id)'>"+Room_names+"</div> <hr>";
    document.getElementById("output").innerHTML+=row;
    });});}
getData();

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
}

function addRoom() {
    room_name= document.getElementById("room_name").value
    firebase.database().ref("/").child(room_name).update({
          purpose: "to add the room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location= "kwitter_page.html";
}

function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location="kwitter_room.html"
}
document.getElementById("hiname").innerHTML= user_name; 