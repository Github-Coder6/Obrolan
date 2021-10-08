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
    
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
}

room_name = localStorage.getItem("room_name");
document.getElementById("ihname").innerHTML= room_name; 

function send(){
    msg= document.getElementById("enteredText").value;
    console.log(msg);
    console.log(user_name);
    console.log(room_name);
    firebase.database().ref(room_name).push({
        names: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("enteredText").value="";
}
  
function getData() {
     firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") { 
         firebase_message_id = childKey; 
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         name= message_data['name'];
         message= message_data['message'];
         like= message_data['like'];
         name_with_tag="<h4>"+ name + "<img src='logo.png' class='user_tick'>" + "</h4>";
         message_with_tag="<h4 class='message_h4'>" + message + "</h4>";
         like_button="<button class='btn btn-success' id=" + firebase_message_id + "value='like' onclick='updateLike(this.id)>'";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

         row= name_with_tag + message_with_tag + like_button + span_with_tag;
         document.getElementById("output").innerHTML += row;
        } }); }); }
        getData();

function updateLike(message_id){
    console.log("clicked on like button" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_like = Number(likes) +1;
    
    firebase.database().ref(room_name).child(message_id).update({
        like: updated_like
    });
}