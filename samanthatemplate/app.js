var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt'),
    ca: fs.readFileSync('/etc/ssl/server.ca.crt')
};


https.createServer(options, function(req, res) {

    function sendResponse(){
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
            echoResponse.response.outputSpeech.text = "Say something"
            echoResponse.response.shouldEndSession = "false";
            theRequest = JSON.parse(jsonString);
            //console.log(theRequest.request.type);
            if (theRequest.request.type == 'IntentRequest') {

                choice = theRequest.request.intent.slots.Choice.value;
                echoResponse.response.outputSpeech.text = "I heard the choice " + choice;
                console.log ("choice",choice);
                if(choice=="taurus"){
                   echoResponse.response.outputSpeech.text = "The horoscope for taurus is: Words of love! Today, peacemaker Venus starts a monthlong sprint through your communication house. No need to plant your hooves down in such a firm stance, Bull. Gentle requests and kindhearted dialogue will get you much further. If you've been at odds with a sibling or friend, present a peace offering. This is also a great time to find some regular hangouts in your area. Before you know it, you'll have preferred customer status. Hello, Mayor Taurus!";
                }
                if(choice=="gemini"){
                   echoResponse.response.outputSpeech.text = "The horoscope for gemini is: Time for a little practical luxury in your life? For the next month, beautifying Venus will visit your sophisticated second house, making you crave material comforts. Go ahead and treat yourself to a seasonal staple that you'll wear (and look amazing in) all summer long. Bonus points if you scout a great deal or a sample sale! This is a great time to do a little work-related mingling, since charming Venus here can help you manifest more money or make some promising new connections.";
                }
                if(choice=="cancer"){
                   echoResponse.response.outputSpeech.text = "The horoscope for cancer is: Hello, head-turner! Today, dazzling Venus enters Cancer for a month, anointing you with the It factor. You'll have a feisty spring in your step—and it won't go unnoticed. Get ready to graciously accept a steady stream of compliments. All eyes are on you now, so work it! Forget about retiring to your Crab shell or flying under the radar. This is a great time to revamp your wardrobe or to try out one of summer's trends. A new haircut or color could be a fun part of your personal style reinvention.";
                }
                if(choice=="leo"){
                   echoResponse.response.outputSpeech.text = "The horoscope for leo is: Let your mane down, Leo. Today, gorgeous Venus slips into your twelfth house of sleep, healing and closure. It's time to indulge in some beauty rest—whether you log a solid eight hours of shuteye or drift off on the massage table. All things holistic are favored now. Stock up on the spa treatments and pay a visit to the naturopath or acupuncturist. Peacemaker Venus will also assist you with forgiveness work for the next month. You realize that holding onto grudges and resentments only poisons YOU. Let it go and watch your enchanting glow return.";
                }
                if(choice=="virgo"){
                   echoResponse.response.outputSpeech.text = "TThe horoscope for virgo is: here's nothing like the pleasurable company of good friends. While your sign can go through hermit spells, the next month puts you in especially social spirits. You can thank charming Venus, which is visiting your eleventh house of group activity. The more the merrier is your new motto! You could magnetize new people into your life, both virtually and in real-time. While you are often the giver in your friendships, you'll now attract interesting people who are also caring and generous. It's about time!";
                }
                if(choice=="libra"){
                   echoResponse.response.outputSpeech.text = "The horoscope for libra is: Charm your way to the top, Libra! Today, magnetic Venus enters your tenth house of career and ambition, turning you into a networking machine for the next month. Get out and mingle with the influencers at an after-work event. Take a promising potential client to lunch. Add some sartorial flair to your work wardrobe and bring a personal touch to your tasks. Little gestures of appreciation—gifts, handwritten cards, or a simple acknowledgment—will make a far-reaching impact with colleagues and clients.";
                }
                if(choice=="scorpio"){
                   echoResponse.response.outputSpeech.text = "The horoscope for scorpio is: Love globally! Today, affectionate Venus enters your worldly ninth house, sparking up synergies from afar. A long-distance connection could heat up in the next month, or you could fall for someone from a different culture or country. Vive la difference! Coupled Scorpios should get busy planning a romantic jaunt. Whether it's an all-day trip out of city limits or a few nights away, leaving your familiar surroundings will ignite a sexy spark between you.";
                }
                if(choice=="sagittarius"){
                   echoResponse.response.outputSpeech.text = "The horoscope for sagittarius is: Hang the 'do not disturb' sign, Sagittarius. Love planet Venus spends the next month in your eighth house of sex and intimacy. Whether you're nurturing emotional bonds or steaming up the boudoir, this is a beautiful time for some soul-to-soul (and skin-to-skin) synchronicity. Magnetic Venus gives you a shot of charisma now, too. Since the eighth house rules wealth, you might use these charms to woo an investor or a power player onto your team.";
                }
                if(choice=="capricorn"){
                   echoResponse.response.outputSpeech.text = "The horoscope for capricorn is: Sweet harmony! Today, love planet Venus begins a monthlong visit to Cancer, your seventh house of one-on-one relationships. This is an amazing time to meet someone with long-term potential, or to bring more balance to a current partnership. Think beyond your love life, too, as this Venus transit sweetens all interpersonal relationships. If you're working on a business deal, negotiations will be friendly. No need to get all 'shark tank' on 'em. You'll catch more prospects with honey now for sure!";
                }
                if(choice=="aquarius"){
                   echoResponse.response.outputSpeech.text = "The horoscope for aquarius is: Time to get your pre-summer glow on! Today, beautifying Venus moves into your sixth house of wellbeing, inspiring you to bring clean eating and fitness back into your life. If you're already on a dedicated health kick, then look for ways you can make your workout feel less like 'work' and more a source of pleasure. Under outgoing Venus' influence, you might combine exercise with social time. Think: outdoor tennis, a beautiful hike through flowering trees, a bike ride/picnic with friends.";
                }
                if(choice=="pisces"){
                   echoResponse.response.outputSpeech.text = "The horoscope for pisces is: Spring fever alert! Today, love planet Venus moves into your passionate fifth house for a month, dappling your life with romance and glamour. If you haven't been in the mood for a while, expect your lusty spirits to awaken. This is a perfect time to add some bold new touches to your wardrobe. Reach for the striking hues and colorful botanicals that are trending this summer—paired with some head-turning accessories. You're going to be turning heads now anyway, so you might as well have some fun!";
                }
                if(choice=="aries"){
                   echoResponse.response.outputSpeech.text = "The horoscope for aries is: Time to turn your home into a haven. Today, beautifying Venus moves into Cancer, adding a soft touch to your domestic fourth house. Stroll through a spring art fair to look for original works. Cozy up with a stack of decorating magazines or cruise your favorite design blogs for pinnable ideas. Relationships with women and family are especially lovely under this Venusian influence.";
                }


                echoResponse.response.card = {};
                echoResponse.response.card.type = "Simple";
                echoResponse.response.card.title = "Template Title";
                echoResponse.response.card.subtitle = "Template SubTitle";
                echoResponse.response.card.content = choice;
                echoResponse.sessionAttributes = {};
                echoResponse.response.shouldEndSession = "false";
            }
            sendResponse();
            console.dir(echoResponse, {depth: 5});

        });
    } else {
        sendResponse();
    }
}).listen(3010); //Put number in the 3000 range for testing and 443 for production