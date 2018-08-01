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
        exists: null,
        pick: ""
    };
    var player2 = {
        name: "",
        wins: 0,
        losses: 0,
        exists: null,
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
            playersRef.child("player1").set({
                name: player1.name,
                wins: player1.wins,
                losses: player1.losses,
                exists: player1.exists,
                pick: player1.pick
            })
        } else if (player1.exists){
            player2.name = ($("#playerName").val().trim());
            player2.exists = true;
            playersRef.child("player2").set({
                name: player2.name,
                wins: player2.wins,
                losses: player2.losses,
                exists: player2.exists,
                pick: player2.pick
            })
        }
    })

    //Uses the information in firebase to set the boolean "exists" for p1 and p2
    playersRef.child("player1").on("value", function(snap){
        player1.exists = snap.val().exists;
        console.log("player1.exists: " + player1.exists);
        console.log("player2.exists: " + player2.exists);
    })
    playersRef.child("player2").on("value", function(snap){
        player2.exists = snap.val().exists;
        console.log("player1.exists: " + player1.exists);
        console.log("player2.exists: " + player2.exists);
    })


    $(".rpsChoice").click(function(){
        db.ref().set({
            // pick: $(this).attr("data-pick")
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