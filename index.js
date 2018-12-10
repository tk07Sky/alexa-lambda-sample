'use strict';
var Alexa = require('alexa-sdk');

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
// AlexaのAPP_IDは環境変数で取り込む
const APP_ID = process.env["APP_ID"];

var TODAYS_MESSAGE = "";
// スキル起動中に「ヘルプ」と質問したときに発音
var HELP_MESSAGE = "このスキルでは、今日の一日をお知らせします";
var HELP_REPROMPT = "どうしますか？";
// スキル終了合図をしたときに発音
var STOP_MESSAGE = "今日もいちにち、頑張って下さいね！";

exports.handler = async function(event, context) {
    var alexa = Alexa.handler(event, context);
    TODAYS_MESSAGE = "たいくん、おはようございます！今日は平和ないちにちが過ごせそうですよ！"
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        // Alexaコンソールで設定したインテントのセット
        this.emit('CallTodayIntent');
    },
    'CallTodayIntent': function () {
        var todaysMessage = TODAYS_MESSAGE ? TODAYS_MESSAGE : "データがありませんでした";
        this.emit(':tell', todaysMessage);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};
