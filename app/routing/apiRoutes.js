
var friendsArray = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends" , function(req,res) {
        res.json(friendsArray);
    });

    app.post("/api/friends" , function(req,res) {
        
        var userData = req.body;
        var userScore = 0;
        for(var i = 0; i < userData.scores.length; i++)
        {
            userData.scores[i] = parseInt(userData.scores[i]);
            userScore += userData.scores[i]
        }

        var closest = 0;
        var closestScore = 100;
        var currentScore = 0;
        for(var i = 0; i < friendsArray.length; i++){
            for(var j = 0; j < friendsArray[i].scores.length; j++)
            {
                currentScore += friendsArray[i].scores[j];
            }
            
            if(Math.abs(userScore - currentScore) < closestScore)
            {
                
                closestScore = Math.abs(userScore - currentScore);
                closest = i;
            }

            currentScore = 0;
        
        }

        friendsArray.push(userData);
        res.json(friendsArray[closest]);

    
    });
};