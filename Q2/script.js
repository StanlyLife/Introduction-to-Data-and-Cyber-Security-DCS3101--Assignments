//Encoding DOM Elements
const textIn = document.querySelector("#i-input");
const textOut = document.querySelector("#i-output");
const textKey = document.querySelector("#i-key-one");
const textKeyTwo = document.querySelector("#i-key-two");
const textKeyFinal = document.querySelector("#i-key-double");
//Global DOM Elements
const alphabeth = "abcdefghijklmnopqrstuvwxyz";
let cipherText = "";

//Event listener functions

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
}

//Event listeners

textKeyTwo.addEventListener("input", () => (textKeyFinal.value = ""));
textKey.addEventListener("input", (e) => KeyExistsCheck());
textIn.addEventListener("focus", (e) => KeyExistsCheck());
textIn.addEventListener("input", (e) => {
	InputExistsCheck();
	if (textKeyTwo.value.length > 0) {
		//has double key
		let finalKey = Vigenere(textKey.value, textKeyTwo.value, false);
		textOut.value = Vigenere(textIn.value, finalKey, false);
		textKeyFinal.value = finalKey;
	} else {
		//has single key
		textOut.value = Vigenere(textIn.value, textKey.value, false);
	}
});

//Encode function

function Vigenere(plainText, key, decode) {
	const plainTextShift = 1; /* Start at 0, not 1 */
	let chipherText = "";
	let counter = 0;
	[...plainText].forEach((characterToken) => {
		const characterAlphabethIndex = alphabeth.indexOf(
			characterToken.toLowerCase()
		);

		if (characterAlphabethIndex < 0) {
			chipherText = chipherText + characterToken;
			return;
		}

		const keyPlainTextIndex = counter % key.length;
		const keyCharacter = key[keyPlainTextIndex];
		const keyCharacterAlphabethIndex = alphabeth.indexOf(
			keyCharacter.toLowerCase()
		);

		let cipherTokenIndex =
			(keyCharacterAlphabethIndex + characterAlphabethIndex) %
			alphabeth.length;

		const chipherToken = alphabeth[cipherTokenIndex];

		chipherText = chipherText + chipherToken;
		counter++;
	});
	return chipherText;
}
