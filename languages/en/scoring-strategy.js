var negators = require('./negators.json');
var vector = require('../../lib/vector.js')


module.exports = {
    apply: function(tokens, cursor, tokenScore) {
        if (cursor > 0) {
            var prevtoken = tokens[cursor - 1];
            if (negators[prevtoken] || negators[prevtoken-1]) {
                tokenScore.scalarMult(-1);
            }
        }
        return tokenScore;
    }
};


