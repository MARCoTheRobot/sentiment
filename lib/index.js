var tokenize = require('./tokenize');
var languageProcessor = require('./language-processor');
var Vector = require('./vector');

/**
 * Constructor
 * @param {Object} options - Instance options
 */
var Sentiment = function (options) {
    this.options = options;
};

/**
 * Registers the specified language
 *
 * @param {String} languageCode
 *     - Two-digit code for the language to register
 * @param {Object} language
 *     - The language module to register
 */
Sentiment.prototype.registerLanguage = function (languageCode, language) {
    languageProcessor.addLanguage(languageCode, language);
};

/**
 * Performs sentiment analysis on the provided input 'phrase'.
 *
 * @param {String} phrase
 *     - Input phrase
 * @param {Object} opts
 *     - Options
 * @param {Object} opts.language
 *     - Input language code (2 digit code), defaults to 'en'
 * @param {Object} opts.extras
 *     - Optional sentiment additions to AFINN (hash k/v pairs)
 * @param {function} callback
 *     - Optional callback
 * @return {Object}
 */
Sentiment.prototype.analyze = function (phrase, opts, callback) {
    // Parse arguments
    if (typeof phrase === 'undefined') phrase = '';
    if (typeof opts === 'function') {
        callback = opts;
        opts = {};
    }
    opts = opts || {};

    var languageCode = opts.language || 'en';
    var labels = languageProcessor.getLabels(languageCode);
    

    // Merge extra labels
    if (typeof opts.extras === 'object') {
        labels = Object.assign(labels, opts.extras);
    }

    // Storage objects
    var tokens      = tokenize(phrase),
       
        words       = [],
        positive    = [],
        negative    = [],
        happy = [],
        sad = [],
        objective = [],
        subjective =[],
        calm = [],
        stress = [],
        guilty = [],
        accepting = [],
        angry = [],
        motivated = [],
        unmotivated = [],
        disgusted = [],
        tired = [],
        energetic = [],
        lonely = [],
        social = [],
        control = [],
        noControl = [];
    
    var score  = new Vector([0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    //console.log(labels[Object.keys(labels)[0].length]);
    //score.zeros(labels[Object.keys(labels)[0].length]);

    // Iterate over tokens
    var i = tokens.length;
    while (i--) {
        var obj = tokens[i];
        if (!labels.hasOwnProperty(obj)) continue;
        words.push(obj);

        // Apply scoring strategy
        var tokenScore = labels[obj];
        // eslint-disable-next-line max-len
        tokenScore = languageProcessor.applyScoringStrategy(languageCode, tokens, i, tokenScore);
        if (tokenScore.vec[0] > 0) positive.push(obj);
        if (tokenScore.vec[0] < 0) negative.push(obj);
        if (tokenScore.vec[1] > 0) objective.push(obj);
        if (tokenScore.vec[1] < 0) subjective.push(obj);
        if (tokenScore.vec[2] > 0) happy.push(obj);
        if (tokenScore.vec[3] > 0) sad.push(obj);
        if (tokenScore.vec[4] > 0) calm.push(obj);
        if (tokenScore.vec[4] < 0) stress.push(obj);
        if (tokenScore.vec[5] > 0) guilty.push(obj);
        if (tokenScore.vec[5] < 0) accepting.push(obj);
        if (tokenScore.vec[6] > 0) angry.push(obj);
        if (tokenScore.vec[7] > 0) motivated.push(obj);
        if (tokenScore.vec[7] < 0) unmotivated.push(obj);
        if (tokenScore.vec[8] > 0) disgusted.push(obj);
        if (tokenScore.vec[9] < 0) tired.push(obj);
        if (tokenScore.vec[9] > 0) energetic.push(obj);
        if (tokenScore.vec[10] < 0) lonely.push(obj);
        if (tokenScore.vec[10] > 0) social.push(obj);
        if (tokenScore.vec[11] < 0) control.push(obj);
        if (tokenScore.vec[11] > 0) noControl.push(obj);
        score.addVec(tokenScore);
    }

    var comparative = new Vector(JSON.parse(JSON.stringify(score.vec)));
        
       
    comparative.scalarDiv(tokens.length);
    
    var result = {
        score:          score.vec,
        comparative:    comparative.vec,
        sentimentVal: score.vec[0],
        objectivityVal: score.vec[1],
        happyVal: score.vec[2],
        sadVal: score.vec[3],
        calmnessStress : score.vec[4],
        guiltAcceptance : score.vec[5],
        anger : score.vec[6],
        motivation: score.vec[7],
        disgust: score.vec[8],
        tiredEnergetic: score.vec[9],
        lonelySocial: score.vec[10],
        controlVal: score.vec[11],
        coolnessVal: score.vec[12],
        embarassmentPride: score.vec[13],
        
        //tokens:         tokens,
        words:          words,
        positive:       positive,
        negative:       negative,
        happy: happy,
        sad: sad,
        objective: objective,
        subjective: subjective,
        calm: calm,
        stress: stress,
        guilty: guilty,
        accepting: accepting,
        angry: angry,
        motivated: motivated,
        unmotivated: unmotivated,
        disgusted: disgusted,
        tired:tired,
        energetic:energetic,
        lonely: lonely,
        social: social,
        control: control,
        noControl: noControl
    
        
    };

    // Handle optional async interface
    if (typeof callback === 'function') {
        process.nextTick(function () {
            callback(null, result);
        });
    } else {
        return result;
    }
};

module.exports = Sentiment;
