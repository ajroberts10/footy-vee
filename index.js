const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const SKILL_NAME = 'Footy Vee';
const FALLBACK_MESSAGE = `The ${SKILL_NAME} skill can\'t help you with that.  It can help you find out which TV channels are broadcasting your team\'s football match. Which team would you like to watch?`;
const FALLBACK_REPROMPT = 'What can I help you with?';
const WELCOME =  'Welcome to Footy Vee!';
const HELP = 'Say about, to hear more about Footy Vee, or ask me what channel your favourite football teams next match is being broadcast on. For example: What channel are Liverpool on tonight?';
const ABOUT = 'Footy Vee is here to tell you which TV channel is showing the football matches you want to watch';
const STOP = 'Okay, Thanks for using Footy Vee';


const LaunchHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        const speechOutput = `${WELCOME} ${HELP}`;
        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const AboutHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AboutIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        return responseBuilder
            .speak(ABOUT)
            .getResponse();
    },
};

const HelpHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(HELP)
            .reprompt(HELP)
            .getResponse();
    },
};

const StopHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
            && (request.intent.name === 'AMAZON.NoIntent'
            || request.intent.name === 'AMAZON.CancelIntent'
            || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(STOP)
            .getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        console.log(` Original request was ${JSON.stringify(request, null, 2)}\n`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const FallbackHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && request.intent.name === 'AMAZON.FallbackIntent';

    },

    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(FALLBACK_MESSAGE)
        .reprompt(FALLBACK_REPROMPT)
        .getResponse();
    }
  };


const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchHandler,
        AboutHandler,
        HelpHandler,
        StopHandler,
        FallbackHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
