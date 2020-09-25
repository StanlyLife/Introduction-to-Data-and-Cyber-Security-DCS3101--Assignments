const textIn = document.querySelector("#i-input");
const textOut = document.querySelector("#i-output");
const textKey = document.querySelector("#i-key-one");
const textKeyTwo = document.querySelector("#i-key-two");
const textKeyFinal = document.querySelector("#i-key-double");
/* Decode variables */
const dTextIn = document.querySelector("#decode-i-input");
const dTextOut = document.querySelector("#decode-i-output");
const dTextKey = document.querySelector("#decode-i-key-one");
const dTextKeyTwo = document.querySelector("#decode-i-key-two");
const dTextKeyFinal = document.querySelector("#decode-i-key-double");
const decodeBtn = document.querySelector("#decode-btn");

const alphabeth = "abcdefghijklmnopqrstuvwxyz";
let cipherText = "";

function KeyExistsCheck() {
	if (textKey.value.length < 1) {
		textIn.disabled = true;
		textKeyTwo.disabled = true;
		textKeyTwo.value = "";
	} else {
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

/* decode */
decodeBtn.addEventListener("click", () => DecodeVignere());
dTextKeyTwo.addEventListener("input", () => (dTextKeyFinal.value = ""));
dTextKey.addEventListener("input", (e) => DKeyExistsCheck());
dTextIn.addEventListener("focus", (e) => DKeyExistsCheck());

dTextIn.addEventListener("input", (e) => {
	DInputExistsCheck();
	if (dTextKeyTwo.value.length > 0) {
		//has double key
		let finalKey = Vigenere(dTextKey.value, dTextKeyTwo.value, false);
		dTextKeyFinal.value = finalKey;
	} else {
		//has single key
		dTextOut.value = Vigenere(dTextIn.value, dTextKey.value, false);
	}
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
	} else {
		dTextIn.disabled = false;
		dTextKeyTwo.disabled = false;
	}
}

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

function DecodeVignere() {
	let key = "";
	let counter = 0;
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
	console.log("decoding");
	Vigenere(dTextIn.value, key, true);

	let chipherText = "";
	[...dTextIn.value].forEach((characterToken) => {
		const characterAlphabethIndex = alphabeth.indexOf(
			characterToken.toLowerCase()
		);
		if (characterAlphabethIndex < 0) {
			chipherText = chipherText + characterToken;
			return;
		}
		const keyTextIndex = counter % key.length;
		const keyCharacter = key[keyTextIndex];
		const keyCharacterAlphabethIndex = alphabeth.indexOf(
			keyCharacter.toLowerCase()
		);
		let cipherTokenIndex =
			(alphabeth.length -
				(keyCharacterAlphabethIndex - characterAlphabethIndex)) %
			alphabeth.length;

		if (cipherTokenIndex < 0) {
			cipherTokenIndex = cipherTokenIndex * -1;
		}
		const chipherToken = alphabeth[cipherTokenIndex];
		console.log(cipherTokenIndex + " - " + chipherToken);

		chipherText = chipherText + chipherToken;
		counter++;
	});
	dTextOut.value = chipherText;
}
