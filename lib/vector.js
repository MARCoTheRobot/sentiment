class vector{
    constructor(vectorArray)
    {
        this.vec = vec;
    }
    
    //Adds a second vector to the current vector
    addVec(secondVec)
    {
        if(this.vec.length == secondVec.length)
            {
                for i in secondVec{
                    this.vec[i] += secondVec[i]
                }
            }
        else{
            console.log("Vector lengths do not match");
        }
    }
    
    zeros(length)
    {
        this.vec = [];
        for(let i = 0; i < length; i++)
            {
                this.vec.push(0);
            }
    }
    
    scalarMult(scalar)
    {
        for i in this.vec{
            this.vec[i] *= scalar;
        }
    }
    
    scalarDiv(scalar)
    {
        for i in this.vec{
            this.vec[i] /= scalar;
        }
    }
}

module.exports = vector;