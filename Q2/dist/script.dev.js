"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//Encoding DOM Elements
var textIn = document.querySelector("#i-input");
var textOut = document.querySelector("#i-output");
var textKey = document.querySelector("#i-key-one");
var textKeyTwo = document.querySelector("#i-key-two");
var textKeyFinal = document.querySelector("#i-key-double"); //Global DOM Elements

var alphabeth = "abcdefghijklmnopqrstuvwxyz";
var cipherText = ""; //Event listener functions

function KeyExistsCheck() {
  if (textKey.value.length < 1) {
    //keyOne does not have text
    textIn.disabled = true;
    textKeyTwo.disabled = true;
    textKeyTwo.value = "";
  } else if (textIn.value < 1) {
    textIn.disabled = false;
    textKeyTwo.disabled = false;
  }
}

function InputExistsCheck() {
  if (textIn.value.length < 1) {
    textKey.disabled = false;
    textKeyTwo.disabled = false;
  } else {
    textKey.disabled = true;
    textKeyTwo.disabled = true;
  }
} //Event listeners


textKeyTwo.addEventListener("input", function () {
  return textKeyFinal.value = "";
});
textKey.addEventListener("input", function (e) {
  return KeyExistsCheck();
});
textIn.addEventListener("focus", function (e) {
  return KeyExistsCheck();
});
textIn.addEventListener("input", function (e) {
  InputExistsCheck();

  if (textKeyTwo.value.length > 0) {
    //has double key
    var finalKey = Vigenere(textKey.value, textKeyTwo.value, false);
    textOut.value = Vigenere(textIn.value, finalKey, false);
    textKeyFinal.value = finalKey;
  } else {
    //has single key
    textOut.value = Vigenere(textIn.value, textKey.value, false);
  }
}); //Encode function

function Vigenere(plainText, key, decode) {
  var plainTextShift = 1;
  /* Start at 0, not 1 */

  var chipherText = "";
  var counter = 0;

  _toConsumableArray(plainText).forEach(function (characterToken) {
    var characterAlphabethIndex = alphabeth.indexOf(characterToken.toLowerCase());

    if (characterAlphabethIndex < 0) {
      chipherText = chipherText + characterToken;
      return;
    }

    var keyPlainTextIndex = counter % key.length;
    var keyCharacter = key[keyPlainTextIndex];
    var keyCharacterAlphabethIndex = alphabeth.indexOf(keyCharacter.toLowerCase());
    var cipherTokenIndex = (keyCharacterAlphabethIndex + characterAlphabethIndex) % alphabeth.length;
    var chipherToken = alphabeth[cipherTokenIndex];
    chipherText = chipherText + chipherToken;
    counter++;
  });

  return chipherText;
}