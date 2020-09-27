"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//Decode DOM Elements
var dTextIn = document.querySelector("#decode-i-input");
var dTextOut = document.querySelector("#decode-i-output");
var dTextKey = document.querySelector("#decode-i-key-one");
var dTextKeyTwo = document.querySelector("#decode-i-key-two");
var dTextKeyFinal = document.querySelector("#decode-i-key-double");
var decodeBtn = document.querySelector("#decode-btn"); //Eventlisteners

dTextKeyTwo.addEventListener("input", function () {
  return dTextKeyFinal.value = "";
});
dTextKey.addEventListener("input", function (e) {
  return DKeyExistsCheck();
});
dTextIn.addEventListener("focus", function (e) {
  return DKeyExistsCheck();
});
dTextIn.addEventListener("input", function (e) {
  DInputExistsCheck();

  if (dTextKeyTwo.value.length > 0) {
    //has double key
    var finalKey = Vigenere(dTextKey.value, dTextKeyTwo.value, false);
    dTextKeyFinal.value = finalKey;
  } else {
    //has single key
    dTextOut.value = Vigenere(dTextIn.value, dTextKey.value, false);
  }

  DecodeVignere();
});

function DInputExistsCheck() {
  if (dTextIn.value.length < 1) {
    dTextKey.disabled = false;
    dTextKeyTwo.disabled = false;
  } else {
    dTextKey.disabled = true;
    dTextKeyTwo.disabled = true;
  }
}

function DKeyExistsCheck() {
  if (dTextKey.value.length < 1) {
    dTextIn.disabled = true;
    dTextKeyTwo.disabled = true;
    dTextKeyTwo.value = "";
  } else if (dTextIn.value < 1) {
    dTextIn.disabled = false;
    dTextKeyTwo.disabled = false;
  }
}

function DecodeVignere() {
  var key = "";
  var counter = 0;

  if (dTextKeyFinal.value.length > 0) {
    //uses finalKey
    key = dTextKeyFinal.value;
  } else {
    //uses key1
    key = dTextKey.value;
  }

  if (dTextIn.value.length < 1) {
    console.log("No input");
    return;
  }

  Vigenere(dTextIn.value, key, true);
  var chipherText = "";

  _toConsumableArray(dTextIn.value).forEach(function (characterToken) {
    var characterAlphabethIndex = alphabeth.indexOf(characterToken.toLowerCase());

    if (characterAlphabethIndex < 0) {
      chipherText = chipherText + characterToken;
      return;
    }

    var keyTextIndex = counter % key.length;
    var keyCharacter = key[keyTextIndex];
    var keyCharacterAlphabethIndex = alphabeth.indexOf(keyCharacter.toLowerCase());
    var cipherTokenIndex = (alphabeth.length - (keyCharacterAlphabethIndex - characterAlphabethIndex)) % alphabeth.length;

    if (cipherTokenIndex < 0) {
      cipherTokenIndex = cipherTokenIndex * -1;
    }

    var chipherToken = alphabeth[cipherTokenIndex];
    chipherText = chipherText + chipherToken;
    counter++;
  });

  dTextOut.value = chipherText;
}