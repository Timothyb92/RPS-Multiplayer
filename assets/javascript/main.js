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
    //Firebase snapshot function
    
    //Function to assign player name entered to P1 or P2 respectively
    var getPlayerName = function(){
        var playerName = $("#playerName").val().trim();
        if (!player1.exists){
            player1.name = playerName;
            player1.exists = true;
            console.log("Player 1 is " + playerName);
        } else {
            player2.name = playerName;
            player2.exists = true;
            console.log("Player 2 is " + playerName);
        }
    }
    
    $("#playerNameSubmit").click(getPlayerName);
    
    $(".rpsChoice").click(function(){
        db.ref().set({
            pick: $(this).attr("data-pick")
        });
        console.log($(this).attr("data-pick"));
    })
    
    $("#send").click(function(){
        chatRef.push({
            message: message(),
            dateAdded: firebase.database.ServerValue.TIMESTAMP});

                
    })

    chatRef.orderByChild("dateAdded").limitToLast(1).on("child_added", function(snap){
        console.log(snap.val().message);
        $("#chat").append($("<p>").text(snap.val().message));
    })
    
    














})