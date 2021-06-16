require('@tensorflow/tfjs-node');
const USE = require('@tensorflow-models/universal-sentence-encoder');
const fs = require('fs');
const trainingData = require('../languages/en/marcoTraningData.json');
const dat = require('./model.json');

const c1 = 25;
const c2 = 0.4;

function train(){
USE.load().then(model =>{
    
    var emoteModel = {
        "Objective":[],
        "Subjective":[],
        "Happy":[],
        "Sad":[],
        "Stressed":[],
        "Calm":[],
        "Angry":[],
        "Motivated":[],
        "Unmotivated":[],
        "Tired":[],
        "Energetic":[],
        "Disgusted":[],
        "Social":[],
        "Lonely":[],
        "No Control":[],
        "Control":[],
        "Guilty":[],
        "Accepting":[]

    };

    let runTrainer = async function(callback){
    for(var emote in trainingData){


    await model.embed(trainingData[emote]).then( async (embeddings) =>{
        //console.log(embeddings.arraySync()[0]);
        emoteModel[emote] = await embeddings.arraySync();
        console.log(emoteModel);
        
    })
}
    return callback();
    }

    runTrainer( () =>{
        fs.writeFileSync('model.json',JSON.stringify(emoteModel));

    })

    
})

}

//train();

function test(){
    const sentence = [
        `It's only lunch time but it feels like today has been going on for an eternity already. I did not sleep very well last night, so that was a bit frustrating. I had a nightmare that Christine broke up with me because I cheated on her with my ex-girlfriend Christa. It really was not a grand old dream if I do say so myself. Well, anyway. I woke up several times throughout the middle of the night because my dumb idiot cat started vomiting on my bed and I just could not sleep well otherwise. I was tired when I woke up. I've also consistently felt as though I've been laden with sin even if I don't do anyhting wrong per se. I went to church this morning, which was good. I just wish I was more focused during it. I drove to my vaccine appointment and it was a bit overwhelming at first. There were SO many people there! It was crazy! The National Guard was there too and that made it feel like I was in an apocalypse movie or something like that. So crazy. I got my shot, which was good, and I had no side effects, which is great. Then I drove down to Newark and got in and just have felt lazy. Like, I know I'm doing stuff, I know I'm being productive and doing important things, but it's still overwhelming.
        `,
        `Oh boy today has been a ride. I stayed up super late last night for Baja because we have deliverables due tomorrow and Katie has not pulled her part. But, since it's Katie, and I know she's going through a lot, I did her parts for her. That was probably dumb of me but whatever. Anyway I got the work done and went to sleep at like 2. When I woke up Amit was already up and eating cereal so that was nice it talk to him. But then I realized that it was my class time and I overslept! So I had to sprint over to class to get there already 20 minutes late and everyone was looking at me like I'm an idiot. That did not help. I sat down, but whatever, I know what is going on in that class. Then we had our stupid advisement meeting with Sep and he was being Sep again. This time he thought we should put spring loaded bumpers on the car. Then I went back to my room and had another frozen pizza. Whatever.`,
        `Well today has been ahhhhhhh. I woke up early and had to avoid mom because I couldn't tell her where I was going. I drove down to Christine which was nice because I got to see her but not very nice because that meant that I am skipping MARCo work which I haven't been doing enough of lately. I got to her house and she was a mess and yelled at me and lashed out a lot. That was not cool. But we hugged and it was okay. Then we drove over to this apartment and both of us had a lot of anxiety over it but for very different reasons. We got in and did a little prayer before walking in. The lady was very nice and friendly and helped us through things. The paperwork was okay, but I am worried about whether or not my job is going to get the papers back in time. Especially because they needed fax and like, who even uses fax anymore? It's ridiculous. Anywhoodles. Then we drove to Qdoba and it was good but then her parents started just talking and talking and talking and it overwhelmed me. It was a lot to handle and I felt my anxiety skyrocket. On top of that, Christine then was all mad at me because I brush off her concerns over my mom, but then I dare to get freaked out by her parents? It pissed me off too. But things ended up okay after that. It was a lot to handle in one day. Then I had to go to work and that was stressful because I had to get all the papers and paras was messaging me and the app store was an issue. Gosh it was just so much on top of, you know, the work I was supposed to be doing. Geeze. How did I make it through? `,
        `My older brother is so annoying and he does so much stuff that annoys me that i would need a few hours to explain it all so im just gonna briefly go over it in a list -Threatened me with an airsoft gun and pointed it at the neighbors and nothing happened to him -He takes so much food from the kitchen theres never anything nice that lasts longer then 2 seconds -He once sprained my ankle while "playfighting" with me and my mum couldnt have gave less of a shit about punishing him. -He feels entitled to take and break my stuff -He hits me whenever and wherever but he hasnt done it recently -He often does obnoxious things like throwing those crackerbombs (i think thats what its called) at me while im reading even though it says on the packet its dangerous to throw at people -He calls me a gay retard and constantly uses the n word -He litters and doesnt care -I was diagnosed with aspergers and my mum told my brother about it and when i got mad at her for telling him without fucking asking me she said it will help him be more supportive and treat me differently.She wasnt wrong about treating me differently because now his favourite insult to use on me is Disabled retard. -We go to the same school so now everyone assosiates me with him and thats pretty much all im known for -While we are on holiday his favouritr thing to do is put me on an infatable water mattress and push me out to sea because he knows i cant swim and i cant get back without him so he says that he will only bring me back if i say dumb stuff like "im a gay retard" -He gets everything better then me -He loves to sit on me which hurts my stomach so much
        When i ask my mum to have a word with him or punish him she tells me its all normal because hes a teenager and im being overly dramatic.I cant speak to my dad either because my parents are divorced and my dad moved out.Im fed up of coming home feeling like shit and suffering from his repeated insults.I dont have anyone to talk to ever because nobody would care.
        `,
        `I started my day off perfectly by over sleeping, arguing with my dad and almost being late to school. My symptoms of carpal tunnel are back as well so I'll probably go to a doctor tomorrow. Now there's a storm outside and the wind is giving me anxiety. I'm currently laying in bed with my wrist hurting and complaining about my shit on reddit for ppl to see. God, sometimes I wish I was dead.
        `,
        `A couple of days ago I went to drop of my fiancé to work (8hours away) I ended up staying there for two nights at a hotel. The first night was good and then the second day when my fiancé was at work and it was time for me to pack up to go back home. I started packing up and then I realized I couldn’t find my iPhone charger or my Apple Watch. I went outside to look in my car and locked myself out of the room. I went to the front desk where the person who was there was not the most welcoming person, he seemed like I was bothering just for trying to get a key for my room. Then he sent another employee to open the door for me instead of giving me a key I thought it was weird but didn’t want to think much of it. Then he proceeded to ask if my fiancée was with me which I didn’t like. He then called me (mami) while opening the door for me and asking if I was going to be there at night. I freaked out said no and locked myself inside. 2 minutes later he comes knocking at my door (i do not open) and asks if the car outside was mine. It might not seem like a big deal to some people but I freaked out and my heart started racing. I did not feel comfortable at all and wanted to leave because I was scared and I wasn’t able to reach my fiancé because of bad signal. Before getting my things I looked outside the window to make sure the guy was gone and got my things and got in my car. I forgot anything about my charger or my Apple Watch and I left. I barely had any money and I had to buy an expensive charger since my phone was almost dead and I was 8 hours away from home. I’m not the type of person that has a lot of money so it really sucked that my Apple Watch was nowhere to be found and it’s offline and the last location on it was the hotel`,
        `So yesterday I went home on the bus and my dad was asleep on the couch. My sister and I took the dogs outside to do their business and run around a bit. When we got inside he was still asleep and we noticed a beer can by him. This is no surprise because he is a drinker, drinking beer from as early as 7:00am to when he passes out. Note it is a Monday afternoon at like 3:00pm and he is napping after drinking beer. My mom has previously gotten angry about his drinking plenty of times. So my sister and I go to our room (shared room) and watch a movie. We go back out into the living room/ kitchen for a little bit for snacks and he’s still asleep. A bit later I get a text from my mom asking how things are going and we say they are ok, but dad is asleep. She asks us if he had done the dishes, he hadn’t. She tells us not to touch the dishes and to wake him up because he has work in an hour, so we wake him up. He eventually gets up and leaves, 30 minutes late. My mom is home shortly after and informs us that the untouched dishes in the kitchen sink had been pissed on by our dad in a drunken mishap the night before and that she would not do them.
        Fast forward to this morning, we get up early to ensure we aren’t late, and we are all (my sister mom and I) getting ready to leave when mom goes to get her clothing from her room and take the dogs out. It is like 6:30am and our dad doesn’t have to get up till 8:00am so all the lights are off. Mom stumbles over a pair of dads boots and twists her ankle BAD. She’s pissed and yelling at dad while he’s mostly asleep, she then comes back to the bathroom, limping, and ranting about how she’s so done with his bullshit and how she’s going to leave him.
        We get home tonight, dishes STILL aren’t done (may I remind you these have been pissed on) and my mom is really angry. Her ankle still hurts, the house is a mess, and the piss dishes are still there. She decides that she’s gotta do them herself or they won’t get done. She tells my sister and I to NEVER marry someone like him.
        `,
        `Today was my dogs lily's last day for years she had a foxtail in her ear constantly festering and causing infection. Our first vet did operation after operation giving me and my mom the run around. Eventually I convinced her to take her to another vet but at this point we had practically spent everything we had at the first vet. Now she was too far gone the infection had taken her eyes and mouth she couldn't eat formerly 30lbs now 16lbs. The doctor recommended PTS and today was the day. Out side the clinic I took her for one last walk. I'm sorry Lily you were a great little princess.`
    ];
    console.log("Loading the model...");
    let d = new Date();
    USE.load().then(model =>{
        console.log("Model loaded after " + (Date.now() - d)/1000 + " seconds.");
        

        for(let qj = 0; qj < sentence.length; qj++){

            let scores = {
                "Objective":0,
                "Subjective":0,
                "Happy":0,
                "Sad":0,
                "Stressed":0,
                "Calm":0,
                "Angry":0,
                "Motivated":0,
                "Unmotivated":0,
                "Tired":0,
                "Energetic":0,
                "Disgusted":0,
                "Social":0,
                "Lonely":0,
                "No Control":0,
                "Control":0,
                "Guilty":0,
                "Accepting":0
        
            };
    
            let opposites = {
                "Objective":["Subjective"],
                "Happy":["Sad"],
                "Calm":["Stressed","Angry"],
                "Motivated":["Unmotivated"],
                "Energetic":["Tired"],
                "Social":["Lonely"],
                "Control":["No Control"],
                "Accepting":["Guilty"]
            };
        let iterateArray = sentence[qj].split('.');
        let runCheck = async function(callback){
        
            for(let i = 0; i < iterateArray.length; i++){
     await model.embed([iterateArray[i]]).then(async(embeddings) => {

        const query = await embeddings.arraySync()[0];

        
        var tempScores = {
            "Happy":0,
            "Sad":0,
            "Stressed":0,
            "Calm":0,
            "Angry":0,
            "Motivated":0,
            "Unmotivated":0,
            "Tired":0,
            "Energetic":0,
            "Disgusted":0,
            "Social":0,
            "Lonely":0,
            "No Control":0,
            "Control":0,
            "Guilty":0,
            "Accepting":0
    
        };

        for(let emote in scores){
            let nextSentenceScore = 0;
            
    
        for(let j =0; j < dat[emote].length; j++){
            nextSentenceScore = Math.max(nextSentenceScore,(dotProduct(query,dat[emote][j])));
        }

       // nextSentenceScore = nextSentenceScore/dat[emote].length;
      
        scores[emote] += 1/(1+Math.exp(-c1*(nextSentenceScore-c2)));


    
    }


    

    

   
    

       

       /* var result = {
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
        
            
        }; */
        //console.log("Most likely, the user is feeling " + emotions[arrayMaxIndex(scores)] + " and " + emotions[arraySecondIndex(scores)] );
     }) }
     
    
    
    return callback(scores);
}
    runCheck( (scores) =>{ 
        let positiveMap = [
            "Happy",
            "Calm",
            "Motivated",
            "Energetic",
            "Social",
            "Control",
            "Accepting"
        ];
    
        let negativeMap = [
            "Sad",
            "Stressed",
            "Angry",
            "Unmotivated",
            "Tired",
            "Lonely",
            "No Control",
            "Guilty"
        ];
        scores.Positive = 0;
        scores.Negative=0;

        let maxScores = {
            maxScore:0,
            maxEmote:'',
            secondScore:0,
            secondEmote:''
        };
        for(let p = 0; p < positiveMap.length; p++){
            scores.Positive += scores[positiveMap[p]]
        }

        scores.Positive = scores.Positive/positiveMap.length;
    
        for(let n = 0; n < negativeMap.length; n++){
            scores.Negative += scores[negativeMap[n]]
        }
        scores.Negative = scores.Negative/negativeMap.length;
        for(let v in scores){
            if(scores[v] >= maxScores.maxScore && ((scores.Positive > scores.Negative && positiveMap.includes(v)) || (scores.Negative > scores.Positive && negativeMap.includes(v)))){
                maxScores.secondScore = maxScores.maxScore;
                maxScores.secondEmote = maxScores.maxEmote;
                maxScores.maxScore = scores[v];
                maxScores.maxEmote = v;
            }
            else if(scores[v] >= maxScores.secondScore && ((scores.Positive > scores.Negative && positiveMap.includes(v)) || (scores.Negative > scores.Positive && negativeMap.includes(v)))){
                maxScores.secondScore = scores[v];
                maxScores.secondEmote = v;
            }
        }
        
        

        console.log(scores);
        console.log(`Overall the user felt ${(scores.Positive > scores.Negative) && (positiveMap.includes(maxScores.maxEmote)) ? 'positive':'negative'}, and more specifically ${maxScores.maxEmote} and ${maxScores.secondEmote}.`)
    
        


    });

}
        
    });
}
test();


function reformat(){
    let newData = {};
    for(var key in trainingData){
        newData[key] = trainingData[key].join(". ");
    }

    fs.writeFileSync('../languages/en/marcoTraining2.json',JSON.stringify(newData));
}
//reformat();
const dotProduct = (xs, ys) =>{
    const sum = xs => xs ? xs.reduce((a,b) => a + b, 0) : undefined;

    return xs.length === ys.length ? sum(zipWith((a,b) => a*b, xs, ys)) : undefined;
}

const zipWith =
(f,xs,ys) =>{
    const ny = ys.length;
    return(xs.length <= ny ? xs : xs.slice(0,ny)).map((x,i)=> f(x,ys[i]));
}

const arrayMaxIndex = (arr) =>{
    return arr.indexOf(Math.max(...arr));
}

const arraySecondIndex = (arr) =>{
    arr.splice(arr.indexOf(Math.max(...arr)),1);
    return arr.indexOf(Math.max(...arr));
}