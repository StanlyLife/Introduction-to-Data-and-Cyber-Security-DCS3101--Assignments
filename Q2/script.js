const textIn = document.querySelector("#i-input");
const textOut = document.querySelector("#i-output");
const textKey = document.querySelector("#i-key");

const alphabeth = "abcdefghijklmnopqrstuvwxyz";
let cipherText = "";

function KeyExistsCheck() {
	if (textKey.value.length < 1) {
		textIn.disabled = true;
	} else {
		textIn.disabled = false;
	}
}

textKey.addEventListener("input", (e) => KeyExistsCheck());

textIn.addEventListener("focus", (e) => KeyExistsCheck());

textIn.addEventListener("input", (e) => {
	if (textIn.value.length < 1) {
		textKey.disabled = false;
	} else {
		textKey.disabled = true;
	}

	// textOut.value = textKey.value + textIn.value;
	// var lastChar = textIn.value.substr(textIn.value.length - 1);
	textOut.value = vigenere(textIn.value);
});

function vigenere(plainText) {
	console.log("\n");
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

		const keyPlainTextIndex = counter % textKey.value.length;
		const keyCharacter = textKey.value[keyPlainTextIndex];
		const keyCharacterAlphabethIndex = alphabeth.indexOf(
			keyCharacter.toLowerCase()
		);

		console.log(
			keyPlainTextIndex +
				" - " +
				"kc: " +
				keyCharacter +
				" cc:" +
				characterToken
		);

		const cipherTokenIndex =
			(keyCharacterAlphabethIndex + characterAlphabethIndex) %
			alphabeth.length;

		const chipherToken = alphabeth[cipherTokenIndex];

		chipherText = chipherText + chipherToken;
		counter++;
	});
	return chipherText;
}
