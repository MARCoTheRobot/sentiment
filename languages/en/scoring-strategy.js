var negators = require('./negators.json');
var Vector = require('../../lib/vector.js');
var emphasizers = require('./emphasizers.json');


module.exports = {
    apply: function(tokens, cursor, tokenScoreOrig) {
        tokenScore = new Vector(tokenScoreOrig);
        if (cursor > 0) {
            var prevtoken = tokens[cursor - 1];
            if (negators[prevtoken] || negators[tokens[cursor - 2]]) {
                tokenScore.scalarMult(-1);
            }
            if(emphasizers[prevtoken])
                {
                    for(let i = 0; i < tokenScore.vec.length; i++)
                        {
                            tokenScore.vec[i] += Math.sign(tokenScore.vec[i])*emphasizers[prevtoken];
                        }
                }
        }
        return tokenScore;
    }
};


