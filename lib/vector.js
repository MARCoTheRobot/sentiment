class vector{
    constructor(vectorArray)
    {
        this.vec = vectorArray;
    }
    
    //Adds a second vector to the current vector
    addVec(secondVec)
    {
        
        
        if(this.vec.length == secondVec.vec.length)
            {
                for (let i = 0; i < secondVec.vec.length; i++){
                    this.vec[i] += secondVec.vec[i]
                   
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
        for (let i = 0; i < this.vec.length; i++){
            this.vec[i] *= scalar;
        }
    }
    
    scalarDiv(scalar)
    {
        for (let i = 0; i < this.vec.length; i++) {
            this.vec[i] = this.vec[i]/scalar;
        }
    }
}

module.exports = vector;