//Decode DOM Elements
const dTextIn = document.querySelector("#decode-i-input");
const dTextOut = document.querySelector("#decode-i-output");
const dTextKey = document.querySelector("#decode-i-key-one");
const dTextKeyTwo = document.querySelector("#decode-i-key-two");
const dTextKeyFinal = document.querySelector("#decode-i-key-double");
const decodeBtn = document.querySelector("#decode-btn");

//Eventlisteners
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

		chipherText = chipherText + chipherToken;
		counter++;
	});
	dTextOut.value = chipherText;
}
