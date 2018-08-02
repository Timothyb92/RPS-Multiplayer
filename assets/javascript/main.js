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
    var playerNumber;
    // var player = {
    //     name,
    //     wins: 0,
    //     losses: 0,
    //     pick: "",
    //     number: 0
    // };
    // var enemy = {
    //     name,
    //     wins: 0,
    //     losses: 0,
    //     pick: "",
    //     number: 0
    // };

    //Just used this function to make sure connections are working properly
    connectedRef.on("value", function(snapshot){
        if (snapshot.val()){
            var con = connectionsRef.push(true);
            con.onDisconnect().remove();
        }
    })

    //Clears chat when a player disconnects
    db.ref().child("chat").onDisconnect().remove();

    
    $("#playerNameSubmit").click(function(event){
        event.preventDefault();
        db.ref().once("value", function(snapshot){
            var playersNumChildren = snapshot.child("players").numChildren();
            if (playersNumChildren == 0){
                var playerName = ($("#playerName").val().trim());
                playerNumber = 1;
                playersRef.child("player").set({
                    name: playerName,
                    wins: 0,
                    losses: 0,
                    pick: "",
                    number: playerNumber
                });
                console.log(playersNumChildren)
            } else if (playersNumChildren == 1){
                var enemyName = ($("#playerName").val().trim());
                playerNumber = 2;
                playersRef.child("enemy").set({
                    name: enemyName,
                    wins: 0,
                    losses: 0,
                    pick: "",
                    number: playerNumber
                });
            }
        })
        $("#playerName").val("");
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
        
        $("#log").click(function(event){
            event.preventDefault();
            console.log(playerNumber);
            
        })

        
        








})