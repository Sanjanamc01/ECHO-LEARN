// public paths auto load PNG + SVG mixed OK.

export const iconsData = {

  yes:[],
  no:[],
  I :[],
  saw:[],
  want:[],
  have:[],
  animals: [
    "cat","chameleon","dog","fish","frog","lamb","penguin",
    "porcupine","rabbit","sheep","snake","squirrel"
  ],

  body: [
    "ankle","calf","chin","ear","feet","fingers","heel",
    "I have pain in","itch","left hand","neck","nostril",
    "right hand","shin","shoulder","skin","stomach",
    "underarm","wrist"
  ],

  clothing: [
    "blouse","coat","dress","gloves","hat","jacket","pants",
    "pyjamas","raincoat","scarf","shorts","skirt","slippers",
    "socks","t-shirt","vest"
  ],

  emotions: [
    "afraid","excited","happy","hot","I am","laughing",
    "sad","surprised","worried","you are"
  ],

  food: [
    "coffee","dosa","gulab jamun","idli","papad","rice","roti",
    "saagu","salad","sambhar","samosa","soup","tea"
  ],

  numbers: [ // NOT alphabetical — your rule (Option A)
    "zero","one","two","three","four","five","six",
    "seven","eight","nine","ten","point"
  ],

  questions: [
    "how","what","when","where","which","who","why"
  ],

  quickchat: [
    "goodbye","hello","I am not okay","I can't speak",
    "okay","please","thank you"
  ],

  school: [
    "calculator","crayons","dictionary","glue","notebook",
    "paint brush","paper","pen","pencil box","pencil",
    "sharpener","stapler"
  ],

  sports: [
    "archery","badminton","boccia","bowling","cricket","cycle",
    "exercise","fish","golf","judo","run","swim","tennis",
    "volleyball"
  ],

  time: [
    "afternoon","bed time","breakfast time","date","day","hour",
    "last month","minute","morning","next month","night",
    "now","second","today","tomorrow","week","yesterday"
  ],

  toys: [
    "ball","beads","color book","doll","kite","lego","marbles",
    "sand pit","star stacker","stickers","teddybear","toy car"
  ],

  weather: [
    "cloudy","cold","hot","rainy","snowy","windy"
  ]
};
// Sort function (Alphabetical by default — Numbers stays same)
export function sortIcons(category, arr) {
  if (category === "numbers") return arr;   // numeric order fixed
  return [...arr].sort((a,b) => a.localeCompare(b));
}
