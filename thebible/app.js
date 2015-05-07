var EnBible = require("bible-english");

// Get verse
EnBible.getVerse("Genesis 1:1", function(err, data) {
    console.log(err || data[0].text);
});

var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt'),
    ca: fs.readFileSync('/etc/ssl/server.ca.crt')
};


https.createServer(options, function(req, res) {

    function sendResponse() {
        myResponse = JSON.stringify(echoResponse);
        res.setHeader('Content-Length', myResponse.length);
        res.writeHead(200);
        res.end(myResponse);
    }

    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
            echoResponse = {};
            echoResponse.version = "1.0";
            echoResponse.response = {};
            echoResponse.response.outputSpeech = {};

            echoResponse.response.outputSpeech.type = "PlainText"
            echoResponse.response.outputSpeech.text = "Say something like Genesis one one."
            echoResponse.response.outputSpeech.text = "ok"
            echoResponse.response.shouldEndSession = "false";
            theRequest = JSON.parse(jsonString);
            //console.log(theRequest.request, {depth:5});
            console.dir(theRequest, {depth: 5});
            if (theRequest.request.type == 'IntentRequest') {
                //choice = theRequest.request.intent.slots.Choice.value;
                //echoResponse.response.outputSpeech.text = "I heard you say " + choice;
                book = theRequest.request.intent.slots.book.value;
                chapter = theRequest.request.intent.slots.chapter.value;
                verse = theRequest.request.intent.slots.verse.value;
                verseString = book + " " + chapter + ":" + verse;
                console.log("verseString", verseString);
                echoResponse.response.card = {};
                echoResponse.response.card.type = "Simple";
                echoResponse.response.card.title = "The Bible";
                echoResponse.response.card.subtitle = verseString;
                echoResponse.response.card.content = "";
                echoResponse.sessionAttributes = {};
                echoResponse.response.shouldEndSession = "false";
                EnBible.getVerse(verseString, function(err, data) {
                    console.log(err || data[0].text);
                    echoResponse.response.outputSpeech.text = data[0].text;
                    echoResponse.response.card.content = data[0].text;
                    sendResponse();

                });
            } else
                sendResponse();


        });
    } else {
        sendResponse();
    }
}).listen(3001); //Put number in the 3000 range for testing and 443 for production
