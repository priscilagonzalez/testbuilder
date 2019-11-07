// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)
var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long
  // Visa always has a prefix of 4 and a length of 13, 16, or 19.
  // MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16.
  // Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
  // Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
  // China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  // Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.


  function getChinaUnionPayPrefixes() {
    var prefixes = [];
    for (i = 622126; i <= 622925; i++) {
      prefixes.push(i.toString());
    }
    for (i = 624; i <= 626; i++) {
      prefixes.push(i.toString());
    }
    for (i = 6282; i <= 6288; i++) {
      prefixes.push(i.toString());
    }
    return prefixes;
  }

  var cards = [{
      network: "Diner's Club",
      prefixes: ["38", "39"],
      lengths: [14]
    },
    {
      network: "American Express",
      prefixes: ["34", "37"],
      lengths: [15]
    },
    {
      network: "Visa",
      prefixes: ["4"],
      lengths: [13, 16, 19]
    },
    {
      network: "MasterCard",
      prefixes: ["51", "52", "53", "54", "55"],
      lengths: [16]
    },
    {
      network: "Discover",
      prefixes: ["6011", "644", "645", "646", "647", "648", "649", "65"],
      lengths: [16, 19]
    },
    {
      network: "Maestro",
      prefixes: ["5018", "5020", "5038", "6304"],
      lengths: [12, 13, 14, 15, 16, 17, 18, 19]
    },
    {
      network: "China UnionPay",
      prefixes: getChinaUnionPayPrefixes(),
      lengths: [16, 17, 18, 19]
    },
    {
      network: "Switch",
      prefixes: ["4903", "4905", "4911", "4936", "564182", "633110", "6333", "6759"],
      lengths: [16, 18, 19]
    }
  ];

  function check4DigitPrefix(str) {

    if (str === "4903" || str === "4905" || str == "4911" || str === "4936") {
      return true;
    } else {
      return false;
    }

  }

  var foundSamePrefix = false;
  var foundSameLength = false;
  var isSwitch = false;
  for (var i = 0; i < cards.length; i++) {

    for (var j = 0; j < cards[i].prefixes.length; j++) {
      if (cardNumber.startsWith(cards[i].prefixes[j])) {
        foundSamePrefix = true;
        if (cards[i].prefixes[j][0] === "4") {
          isSwitch = check4DigitPrefix(cardNumber.slice(0, 4));
        }
      }
    }

    for (var k = 0; k < cards[i].lengths.length; k++) {
      if (cardNumber.length === cards[i].lengths[k]) {
        foundSameLength = true;
      }
    }

    if (foundSamePrefix && foundSameLength) {
      if (isSwitch) {
        return "Switch";
      }
      return cards[i].network;
    }

    foundSamePrefix = false;
    foundSameLength = false;
    isSwitch = false;

  }
  return "Invalid card";

  // Once you've read this, go ahead and try to implement this function, then return to the console.
};