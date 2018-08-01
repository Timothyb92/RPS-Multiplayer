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
    var connectedRef = db.ref(".info/connected");
    var connectionsRef = db.ref("/connections");
    var playerNumber = 0;
    var player = {
        name: "",
        wins: 0,
        losses: 0,
        exists: null,
        pick: "",
        number: 0
    };
    var enemy = {
        name: "",
        wins: 0,
        losses: 0,
        exists: null,
        pick: "",
        number: 0
    };

    //Just used this function to make sure connections are working properly
    connectedRef.on("value", function(snapshot){
        if (snapshot.val()){
            var con = connectionsRef.push(true);
            con.onDisconnect().remove();
        }
    })
    
    $("#playerNameSubmit").click(function(event){
        event.preventDefault();
        if (!player.exists){
            player.name = ($("#playerName").val().trim());
            player.exists = true;
            playersRef.child("player").set({
                name: player.name,
                wins: player.wins,
                losses: player.losses,
                exists: player.exists,
                pick: player.pick,
                number: player.number
            })
        } else if (player.exists){
            enemy.name = ($("#playerName").val().trim());
            enemy.exists = true;
            playersRef.child("enemy").set({
                name: enemy.name,
                wins: enemy.wins,
                losses: enemy.losses,
                exists: enemy.exists,
                pick: enemy.pick,
                number: enemy.number
            })
        }
        $("#playerName").val("");
    })

    //Uses the information in firebase to set the boolean "exists" for p1 and p2
    playersRef.child("player").on("value", function(snap){
        player.exists = snap.val().exists;
    })
    playersRef.child("enemy").on("value", function(snap){
        enemy.exists = snap.val().exists;
    })


    $(".rpsChoice").click(function(){
        db.ref().set({
            // pick: $(this).attr("data-pick")
        });
        console.log($(this).attr("data-pick"));
    })
    
    //Event listener on clicking the Send button
    $("#send").click(function(event){
        event.preventDefault();
        //Pushes the text in the message field to firebase with the time it was sent attached
        if($("#playerTextInput").val() != ""){
            chatRef.push({
                message: message(),
                dateAdded: firebase.database.ServerValue.TIMESTAMP});
        }
        
        $("#playerTextInput").val("");
    })

    //When a message is sent in the chat, its contents are pushed to firebase and the most
    //recent message is appended on the screen
    chatRef.orderByChild("dateAdded").on("child_added", function(snap){
        console.log(snap.val().message);
        $("#chat").append($("<p>").text(snap.val().message));
    })
    














})