'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/webhook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';
        var messages = [];
        
        
        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

               /* if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' awesome hook ';	
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;	
                }*/
                
                if(requestBody.result.action === 'projectData') { 
                    if(requestBody.result.parameters.i1-project === 'Intraday' && requestBody.result.parameters.Project-Artifact === 'Quickbase') { 
                        speech += 'Here are ther Quickbase projects for ' + requestBody.result.parameters.i1-project;
                        messages.push({ "type": 0, "platform": "skype","speech": speech});
                        messages.push({ "type": 0, "platform": "skype","speech": 'QB111111 Intraday description'});
                        messages.push({ "type": 0, "platform": "skype","speech": 'QB111112 Intraday description'});    
                    }
                }
                
                if(requestBody.result.action === 'Buddy') {
                    console.log(requestBody);
                    
                    if(requestBody.result.parameters.Extension === 'Jayant') {
                        speech = 'Jayant\'s extension is 7887';
                    }  else {
                        speech = 'Sorry, could not find extension for ' + requestBody.result.parameters.Extension;
                    }
                }        
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            "messages": messages,    
            source: 'apiai-webhook-sample'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
