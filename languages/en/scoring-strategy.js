var negators = require('./negators.json');
var Vector = require('../../lib/vector.js')


module.exports = {
    apply: function(tokens, cursor, tokenScoreOrig) {
        tokenScore = new Vector(tokenScoreOrig);
        if (cursor > 0) {
            var prevtoken = tokens[cursor - 1];
            if (negators[prevtoken] || negators[tokens[cursor - 2]]) {
                tokenScore.scalarMult(-1);
            }
        }
        return tokenScore;
    }
};


