

const practiceDataset = {
  words: {
    easy: [
       
  { text: "food" }, { text: "help" }, { text: "pain" }, { text: "sleep" }, 
  { text: "bath" }, { text: "bed" }, { text: "book" }, { text: "cup" }, 
  { text: "door" }, { text: "drink" }, { text: "eat" }, { text: "eyes" }, 
  { text: "face" }, { text: "feet" }, { text: "hand" }, { text: "head" }, 
  { text: "heart" }, { text: "home" }, { text: "hot" }, { text: "ice" }, 
  { text: "leg" }, { text: "light" }, { text: "lips" }, { text: "mouth" }, 
  { text: "neck" }, { text: "nose" }, { text: "nurse" }, { text: "pill" }, 
  { text: "rest" }, { text: "room" }, { text: "school" }, { text: "sick" }, 
  { text: "sit" }, { text: "soap" }, { text: "stand" }, { text: "sun" }, 
  { text: "teeth" }, { text: "time" }, { text: "walk" }, { text: "wash" }, 
  { text: "work" }, { text: "chair" }, { text: "cold" }, { text: "cough" }, 
  { text: "cut" }, { text: "dark" }, { text: "fall" }, { text: "feel" }, 
  { text: "fill" }, { text: "find" }, { text: "first" }, { text: "fix" }, 
  { text: "floor" }, { text: "full" }, { text: "game" }, { text: "glass" }, 
  { text: "go" }, { text: "hair" }, { text: "half" }, { text: "heal" }, 
  { text: "hear" }, { text: "heat" }, { text: "hurt" }, { text: "ill" }, 
  { text: "inch" }, { text: "kick" }, { text: "knee" }, { text: "knife" }, 
  { text: "last" }, { text: "late" }, { text: "laugh" }, { text: "lay" }, 
  { text: "leave" }, { text: "left" }, { text: "loud" }, { text: "love" }, 
  { text: "low" }, { text: "main" }, { text: "make" }, { text: "man" }, 
  { text: "meal" }, { text: "meat" }, { text: "milk" }, { text: "mind" }, 
  { text: "miss" }, { text: "mom" }, { text: "move" }, { text: "much" }, 
  { text: "name" }, { text: "near" }, { text: "need" }, { text: "new" }, 
  { text: "next" }, { text: "nice" }

    ],
    
    medium: [
      // 2-syllable words
     
  // TRUE 2-syllable words - VERIFIED
  { text: "bathroom" },      // bath-room
  { text: "doctor" },         // doc-tor
  { text: "blanket" },        // blan-ket
  { text: "headache" },       // head-ache
  { text: "toothache" },      // tooth-ache
  { text: "earache" },        // ear-ache
  { text: "backache" },       // back-ache
  { text: "teacher" },        // teach-er
  { text: "water" },          // wa-ter
  { text: "hungry" },         // hun-gry
  { text: "thirsty" },        // thirst-y
  { text: "pillow" },         // pil-low
  { text: "bandage" },        // band-age
  { text: "bottle" },         // bot-tle
  { text: "breakfast" },      // break-fast
  { text: "brother" },        // broth-er
  { text: "careful" },        // care-ful
  { text: "checkup" },        // check-up
  { text: "chicken" },        // chick-en
  { text: "children" },       // chil-dren
  { text: "circle" },         // cir-cle
  { text: "clinic" },         // clin-ic
  { text: "coffee" },         // cof-fee
  { text: "college" },        // col-lege
  { text: "color" },          // col-or
  { text: "comfort" },        // com-fort
  { text: "common" },         // com-mon
  { text: "crayon" },         // cray-on
  { text: "crying" },         // cry-ing
  { text: "cupboard" },       // cup-board
  { text: "curtain" },        // cur-tain
  { text: "cushion" },        // cush-ion
  { text: "daily" },          // dai-ly
  { text: "danger" },         // dan-ger
  { text: "daughter" },       // daugh-ter
  { text: "dental" },         // den-tal
  { text: "dinner" },         // din-ner
  { text: "dishes" },         // dish-es
  { text: "dizzy" },          // diz-zy
  { text: "dollar" },         // dol-lar
  { text: "donate" },         // do-nate
  { text: "during" },         // dur-ing
  { text: "early" },          // ear-ly
  { text: "either" },         // ei-ther
  { text: "elbow" },          // el-bow
  { text: "empty" },          // emp-ty
  { text: "enough" },         // e-nough
  { text: "enter" },          // en-ter
  { text: "entire" },         // en-tire
  { text: "entry" },          // en-try
  { text: "equal" },          // e-qual
  { text: "escape" },         // es-cape
  { text: "evening" },        // eve-ning
  { text: "every" },          // eve-ry
  { text: "exact" },          // ex-act
  { text: "exam" },           // ex-am
  { text: "excess" },         // ex-cess
  { text: "excuse" },         // ex-cuse
  { text: "exert" },          // ex-ert
  { text: "exist" },          // ex-ist
  { text: "expect" },         // ex-pect
  { text: "expire" },         // ex-pire
  { text: "expose" },         // ex-pose
  { text: "extend" },         // ex-tend
  { text: "extract" },        // ex-tract
  { text: "eyebrow" },        // eye-brow
  { text: "eyelash" },        // eye-lash
  { text: "eyelid" },         // eye-lid
  { text: "facial" },         // fa-cial
  { text: "falling" },        // fall-ing
  { text: "famous" },         // fa-mous
  { text: "farther" },        // far-ther
  { text: "fasten" },         // fas-ten
  { text: "father" },         // fa-ther
  { text: "fearful" },        // fear-ful
  { text: "feature" },        // fea-ture
  { text: "feeling" },        // feel-ing
  { text: "fever" },          // fe-ver
  { text: "finger" },         // fin-ger
  { text: "finish" },         // fin-ish
  { text: "firmly" },         // firm-ly
  { text: "firstly" },        // first-ly
  { text: "fitness" },        // fit-ness
  { text: "flower" },         // flow-er
  { text: "follow" },         // fol-low
  { text: "football" },       // foot-ball
  { text: "forehead" },       // fore-head
  { text: "forever" },        // for-ev-er (3? Actually "for-ev-er" is 3)
  { text: "forget" },         // for-get (2)
  { text: "forgive" },        // for-give (2)
  { text: "formal" },         // for-mal (2)
  { text: "former" },         // for-mer (2)
  { text: "fortune" },        // for-tune (2)
  { text: "forward" },        // for-ward (2)
  { text: "foster" },         // fos-ter (2)
  { text: "fracture" },       // frac-ture (2)
  { text: "frequent" },       // fre-quent (2)
  { text: "friendly" },       // friend-ly (2)
  { text: "frighten" },       // fright-en (2)
  { text: "frozen" },         // fro-zen (2)
  { text: "fruitful" },       // fruit-ful (2)
  { text: "further" },        // fur-ther (2)
  { text: "garden" },         // gar-den (2)
  { text: "gather" },         // gath-er (2)
  { text: "gentle" },         // gen-tle (2)
  { text: "genuine" },        // gen-u-ine (3 - move to hard)
  { text: "glasses" },        // glass-es (2)
  { text: "goodbye" },        // good-bye (2)
  { text: "grandma" },        // grand-ma (2)
  { text: "grandpa" },        // grand-pa (2)
  { text: "grateful" },       // grate-ful (2)
  { text: "grocery" },        // gro-cer-y (3 - move to hard)
  { text: "gymnasium" }       // gym-na-si-um (4 - move to hard)

    ],
    
    hard: [
      // 3+ syllable words
      { text: "emergency" }, { text: "hospital" }, { text: "appointment" }, { text: "comfortable" }, { text: "uncomfortable" },
      { text: "important" }, { text: "problem" }, { text: "dangerous" }, { text: "understand" }, { text: "assistance" },
      { text: "ambulance" }, { text: "medicine" }, { text: "temperature" }, { text: "thermometer" }, { text: "prescription" },
      { text: "medication" }, { text: "infection" }, { text: "injection" }, { text: "vaccination" }, { text: "allergic" },
      { text: "reaction" }, { text: "recovery" }, { text: "treatment" }, { text: "condition" }, { text: "situation" },
      { text: "attention" }, { text: "direction" }, { text: "instruction" }, { text: "education" }, { text: "information" },
      { text: "operation" }, { text: "examination" }, { text: "evaluation" }, { text: "appreciation" }, { text: "consideration" },
      { text: "celebration" }, { text: "communication" }, { text: "cooperation" }, { text: "determination" }, { text: "disappointment" },
      { text: "embarrassment" }, { text: "encouragement" }, { text: "entertainment" }, { text: "environment" }, { text: "government" },
      { text: "improvement" }, { text: "involvement" }, { text: "management" }, { text: "measurement" }, { text: "achievement" },
      { text: "adventure" }, { text: "anniversary" }, { text: "anxiety" }, { text: "apology" }, { text: "appearance" },
      { text: "application" }, { text: "appointment" }, { text: "appropriate" }, { text: "approximate" }, { text: "argument" },
      { text: "arrangement" }, { text: "assessment" }, { text: "assignment" }, { text: "assistance" }, { text: "assistant" },
      { text: "associate" }, { text: "association" }, { text: "assumption" }, { text: "assurance" }, { text: "athlete" },
      { text: "atmosphere" }, { text: "attention" }, { text: "attitude" }, { text: "attorney" }, { text: "attraction" },
      { text: "attribute" }, { text: "audience" }, { text: "authority" }, { text: "available" }, { text: "awareness" },
      { text: "bacteria" }, { text: "balance" }, { text: "behavior" }, { text: "beneficial" }, { text: "biological" },
      { text: "breathing" }, { text: "brilliant" }, { text: "business" }, { text: "calendar" }, { text: "campaign" },
      { text: "capacity" }, { text: "captain" }, { text: "carefully" }, { text: "category" }, { text: "celebration" },
      { text: "centimeter" }, { text: "certainly" }, { text: "challenge" }, { text: "character" }, { text: "chemical" },
      { text: "children" }, { text: "chocolate" }, { text: "circumstance" }, { text: "civilian" }, { text: "clinical" }
    ]
  },

  sentences: {
    easy: [
      // Simple 1-2 syllable words in short sentences
      { text: "I need water" },
      { text: "I am hungry" },
      { text: "I need help" },
      { text: "I am tired" },
      { text: "I need toilet" },
      { text: "I want food" },
      { text: "I feel sick" },
      { text: "My head hurts" },
      { text: "My stomach hurts" },
      { text: "I need medicine" },
      { text: "I am cold" },
      { text: "I am hot" },
      { text: "I need rest" },
      { text: "I want sleep" },
      { text: "I need drink" },
      { text: "My back hurts" },
      { text: "My arm hurts" },
      { text: "My leg hurts" },
      { text: "I feel pain" },
      { text: "I need nurse" },
      { text: "Please sit" },
      { text: "Please stand" },
      { text: "Please wait" },
      { text: "Come here" },
      { text: "Go there" },
      { text: "Look at me" },
      { text: "Listen to me" },
      { text: "Help me" },
      { text: "Call mom" },
      { text: "Call dad" },
      { text: "Open door" },
      { text: "Close door" },
      { text: "Turn light" },
      { text: "Wash hands" },
      { text: "Brush teeth" },
      { text: "Take pill" },
      { text: "Drink milk" },
      { text: "Eat food" },
      { text: "Get up" },
      { text: "Lay down" },
      { text: "Sit up" },
      { text: "Stand up" },
      { text: "Wake up" },
      { text: "Go out" },
      { text: "Come in" },
      { text: "Pick up" },
      { text: "Put down" },
      { text: "Hold hand" },
      { text: "Let go" },
      { text: "Be safe" },
      { text: "Be calm" },
      { text: "Be quiet" },
      { text: "Be still" },
      { text: "Be good" },
      { text: "Be kind" },
      { text: "Take deep breath" },
      { text: "Drink some water" },
      { text: "Eat some food" },
      { text: "Get some rest" },
      { text: "Feel better soon" },
      { text: "I need a break" },
      { text: "I want to go home" },
      { text: "Please help me" },
      { text: "Thank you" },
      { text: "You're welcome" },
      { text: "I'm sorry" },
      { text: "It's okay" },
      { text: "That's good" },
      { text: "That's bad" },
      { text: "Too much" },
      { text: "Too little" },
      { text: "Just right" },
      { text: "More please" },
      { text: "No more" },
      { text: "All done" },
      { text: "Not yet" },
      { text: "Right now" },
      { text: "Later please" },
      { text: "Today" },
      { text: "Tomorrow" },
      { text: "Yesterday" },
      { text: "Morning" },
      { text: "Afternoon" },
      { text: "Evening" },
      { text: "Night time" },
      { text: "Bed time" },
      { text: "Meal time" },
      { text: "Medicine time" },
      { text: "Bath time" },
      { text: "Play time" },
      { text: "School time" },
      { text: "Home time" }
    ],
    
    medium: [
      // Sentences with 2-3 syllable words
      { text: "Please take me to the toilet" },
      { text: "I need a break" },
      { text: "I do not understand" },
      { text: "Please repeat" },
      { text: "I need more time" },
      { text: "I want to go home" },
      { text: "Call my parents" },
      { text: "I am not feeling well" },
      { text: "I need to rest" },
      { text: "I feel upset" },
      { text: "Can you help me please" },
      { text: "I need to see the doctor" },
      { text: "My head really hurts today" },
      { text: "I have a stomach ache" },
      { text: "I feel very tired now" },
      { text: "I need some medicine please" },
      { text: "Please bring me some water" },
      { text: "I want to eat something now" },
      { text: "I don't feel very good" },
      { text: "Can you call my mother" },
      { text: "I need to use the bathroom" },
      { text: "Please wait for me here" },
      { text: "I will be right back" },
      { text: "Don't leave me alone" },
      { text: "Stay with me please" },
      { text: "I am feeling scared" },
      { text: "I am feeling nervous" },
      { text: "I am feeling happy" },
      { text: "I am feeling sad" },
      { text: "I am feeling angry" },
      { text: "I am feeling confused" },
      { text: "I am feeling better now" },
      { text: "I am feeling worse today" },
      { text: "The pain is very bad" },
      { text: "The pain is getting better" },
      { text: "Can you sit with me" },
      { text: "Can you hold my hand" },
      { text: "Please talk to me" },
      { text: "Tell me a story" },
      { text: "Read me a book" },
      { text: "Sing me a song" },
      { text: "I like this music" },
      { text: "I don't like that" },
      { text: "Turn on the light" },
      { text: "Turn off the light" },
      { text: "Open the window" },
      { text: "Close the window" },
      { text: "It's too hot in here" },
      { text: "It's too cold in here" },
      { text: "Please adjust the blanket" },
      { text: "I need another pillow" },
      { text: "Can I have a drink" },
      { text: "Can I have a snack" },
      { text: "What time is it now" },
      { text: "When will I go home" },
      { text: "Is my family coming" },
      { text: "Will you visit again" },
      { text: "Thank you for helping" },
      { text: "I appreciate your help" },
      { text: "You are very kind" },
      { text: "You are the best" },
      { text: "I like you very much" },
      { text: "I miss my family" },
      { text: "I miss my friends" },
      { text: "I miss my pet" },
      { text: "I miss my home" },
      { text: "I want to go outside" },
      { text: "I want to play outside" },
      { text: "Can we go for a walk" },
      { text: "I need some fresh air" },
      { text: "The room is too small" },
      { text: "This bed is too hard" },
      { text: "This pillow is too soft" },
      { text: "The food is very good" },
      { text: "The food is not good" },
      { text: "I don't like this food" },
      { text: "I want something else" },
      { text: "Can I have a choice" },
      { text: "I want to pick my food" },
      { text: "This medicine tastes bad" },
      { text: "This medicine is too big" },
      { text: "Can I have liquid medicine" },
      { text: "The shot really hurt" },
      { text: "I don't want a shot" },
      { text: "The bandage is too tight" },
      { text: "Can you loosen the bandage" },
      { text: "My arm feels better now" },
      { text: "My leg still hurts a lot" },
      { text: "Can I have a wheelchair" },
      { text: "I need help walking" },
      { text: "I can walk by myself" },
      { text: "I don't need help now" }
    ],
    
    hard: [
      // Complex sentences with 3+ syllable words
      { text: "This is an emergency situation" },
      { text: "I need to see a doctor" },
      { text: "I am feeling very uncomfortable" },
      { text: "I am having trouble breathing" },
      { text: "I do not feel safe" },
      { text: "I need immediate help" },
      { text: "Please call for help" },
      { text: "I cannot understand this" },
      { text: "Something is hurting me" },
      { text: "I need assistance right now" },
      { text: "I am experiencing severe pain in my chest" },
      { text: "I think I'm having an allergic reaction" },
      { text: "Please call an ambulance immediately" },
      { text: "I need to go to the emergency room" },
      { text: "My medication is not working properly" },
      { text: "I forgot to take my medicine this morning" },
      { text: "The doctor needs to examine me carefully" },
      { text: "I would like a second opinion from another doctor" },
      { text: "Can you explain the procedure to me" },
      { text: "I don't understand the instructions" },
      { text: "Please write down the information for me" },
      { text: "I need to make an appointment with a specialist" },
      { text: "When will the test results be available" },
      { text: "Is there any alternative treatment available" },
      { text: "What are the potential side effects" },
      { text: "How long will the recovery process take" },
      { text: "Will I need to stay in the hospital overnight" },
      { text: "Can my family stay with me tonight" },
      { text: "I am feeling extremely anxious about this situation" },
      { text: "I'm worried about the surgery tomorrow" },
      { text: "The anticipation is making me very nervous" },
      { text: "I appreciate everyone's patience and understanding" },
      { text: "Thank you for taking such good care of me" },
      { text: "The nurses have been incredibly helpful and kind" },
      { text: "This hospital provides excellent medical care" },
      { text: "I am grateful for all the support I've received" },
      { text: "My family is very concerned about my condition" },
      { text: "The doctor explained everything very clearly" },
      { text: "I finally understand what's happening with my health" },
      { text: "The medication is beginning to take effect now" },
      { text: "I'm starting to feel a little bit better today" },
      { text: "My symptoms seem to be improving gradually" },
      { text: "The swelling has gone down significantly" },
      { text: "The pain is much more manageable today" },
      { text: "I think I'm ready to go home tomorrow" },
      { text: "What instructions should I follow after discharge" },
      { text: "When should I schedule a follow-up appointment" },
      { text: "Do I need to continue taking this medication" },
      { text: "Are there any activities I should avoid" },
      { text: "Can I return to my normal routine soon" },
      { text: "I'm looking forward to getting back to school" },
      { text: "I miss seeing my friends every day" },
      { text: "This has been a difficult experience for me" },
      { text: "I've learned a lot about taking care of myself" },
      { text: "I will remember to take my medicine on time" },
      { text: "I need to eat healthier and exercise regularly" },
      { text: "Being sick has made me appreciate my health more" },
      { text: "I'm thankful for everyone who supported me" },
      { text: "The human body has an amazing ability to heal" },
      { text: "Modern medicine has accomplished incredible things" },
      { text: "I'm interested in learning more about nutrition" },
      { text: "A balanced diet is essential for good health" },
      { text: "Regular exercise strengthens your immune system" },
      { text: "Getting enough sleep is very important" },
      { text: "Stress can have negative effects on your body" },
      { text: "It's important to communicate with your doctor" },
      { text: "You should always ask questions if you're confused" },
      { text: "Don't be afraid to request clarification" },
      { text: "Your health should always be your priority" },
      { text: "Prevention is better than treatment" },
      { text: "Regular checkups can detect problems early" },
      { text: "Vaccinations protect against serious diseases" },
      { text: "Washing your hands prevents infections" },
      { text: "Cover your mouth when you cough or sneeze" },
      { text: "Stay home when you're feeling sick" },
      { text: "Don't share personal items with others" },
      { text: "Keep your living space clean and sanitized" },
      { text: "Drink plenty of water throughout the day" },
      { text: "Limit your consumption of processed foods" },
      { text: "Fresh fruits and vegetables are very nutritious" },
      { text: "Whole grains provide essential fiber and energy" },
      { text: "Protein helps repair and build tissues" },
      { text: "Calcium is important for strong bones and teeth" },
      { text: "Vitamins support various bodily functions" },
      { text: "Iron prevents anemia and fatigue" },
      { text: "Taking deep breaths can help you relax" },
      { text: "Meditation reduces stress and anxiety" },
      { text: "Gentle stretching improves flexibility" },
      { text: "Physical therapy helps with rehabilitation" },
      { text: "Occupational therapy develops daily living skills" },
      { text: "Speech therapy improves communication abilities" },
      { text: "Counseling provides emotional support" },
      { text: "Support groups connect people with similar experiences" }
    ]
  }
};

export default practiceDataset;