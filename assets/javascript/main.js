$(document).ready(function(){

    //Call to Firebase
    var config = {
        authDomain: "rock-paper-scissors-8ecf2.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-8ecf2.firebaseio.com",
        projectId: "rock-paper-scissors-8ecf2",
        storageBucket: "rock-paper-scissors-8ecf2.appspot.com",
        messagingSenderId: "496055855060"
      };
    firebase.initializeApp(config);

    //Global variables
    var db = firebase.database();
    var message = function(){
        return $("#playerTextInput").val().trim()
    };
    var chatRef = db.ref("/chat")
    var playersRef = db.ref("/players");
    var conRef = db.ref(".info/connected");
    var player1 = {
        name: "",
        wins: 0,
        losses: 0,
        exists: false,
        pick: ""
    };
    var player2 = {
        name: "",
        wins: 0,
        losses: 0,
        exists: false,
        pick: ""
    };

    //Just used this function to make sure connections are working properly
    //REMEMBER TO REMOVE THIS
    //!_!__!__!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!!__!_!_!_!_!
    conRef.on("value", function(snapshot){
        if (snapshot.val()){
            var con = playersRef.push(true);
            con.onDisconnect().remove();
        }
    })
    //!_!__!__!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!!__!_!_!_!_!
    
    $("#playerNameSubmit").click(function(event){
        event.preventDefault();
        if (!player1.exists){
            player1.name = ($("#playerName").val().trim());
            player1.exists = true;
            console.log(player1);
            playersRef.child("player1").set({player1});
        } else if (player1.exists === true && player2.exists === false){
            player2.name = ($("#playerName").val().trim());
            player2.exists = true;
            playersRef.child("player2").set({player2});
        }
    })


    $(".rpsChoice").click(function(){
        db.ref().set({
            pick: $(this).attr("data-pick")
        });
        console.log($(this).attr("data-pick"));
    })
    
    //Event listener on clicking the Send button
    $("#send").click(function(){
        //Pushes the text in the message field to firebase with the time it was sent attached
        chatRef.push({
            message: message(),
            dateAdded: firebase.database.ServerValue.TIMESTAMP});

                
    })

    //When a message is sent in the chat, its contents are pushed to firebase and the most
    //recent message is appended on the screen
    chatRef.orderByChild("dateAdded").limitToLast(1).on("child_added", function(snap){
        console.log(snap.val().message);
        $("#chat").append($("<p>").text(snap.val().message));
    })
    
    














})