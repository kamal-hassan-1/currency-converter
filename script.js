//--------------------------------------------------------------Helper Functions
const fetchCurrencies = async () => {
	try {
		const response = await fetch("https://api.frankfurter.dev/v1/currencies");
		const data = await response.json();
		const codes = Object.keys(data);
		return codes;
	} catch (error) {
		console.log("Error fetching exchange rates:", error);
	}
};
const populateCurrencyDropdowns = async () => {
	let currencyCodes = await fetchCurrencies();
	let currencyDropdowns = document.querySelectorAll(".currency-dropdown");
	for (let dropdown of currencyDropdowns) {
		for (let code of currencyCodes) {
			let option = document.createElement("option");
			option.value = code;
			option.textContent = code;
			dropdown.appendChild(option);
		}
	}
};
const convertCurrency = async (currency1, currency2, amount) => {
	try {
		const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency1}&symbols=${currency2}`);
		const data = await response.json();
		const rate = data.rates[currency2];
		const convertedAmount = (amount * rate).toFixed(2);
		return convertedAmount;
	} catch (error) {
		console.log("Error fetching exchange rates:", error);
	}
};

//---------------------------------------------------------Execution starts here

populateCurrencyDropdowns();
const convertBtn = document.querySelector("#form-btn");
let currency1;
let currency2;
convertBtn.addEventListener("click", async (event) => {
	event.preventDefault();
	currency1 = document.querySelector("#Currency1").value;
	currency2 = document.querySelector("#Currency2").value;
	let amount = document.querySelector("#amount").value;
	if (currency1 !== currency2) {
		const result = await convertCurrency(currency1, currency2, amount);
		const resultText = `${amount} ${currency1} = ${result} ${currency2}`;
		const resultHeading = document.querySelector("#result-text");
		resultHeading.style.padding = "1rem";
		resultHeading.innerText = resultText;
	} else {
		alert("Please select two different currencies.");
	}
});
