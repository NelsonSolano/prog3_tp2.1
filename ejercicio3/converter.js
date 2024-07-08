class Currency {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}
// Primer paso
class CurrencyConverter {
    // Definimos el constructor
    // apiUrl representara la url de la api de Frankfurter
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.currencies = [];
    }
    //getCurrencies(apiUrl) {}
    // Segundo paso
    // Definimos el metodo asincrono para cargar los datos de monedas
    async getCurrencies() {
        try {
            const response = await fetch(`${this.apiUrl}/currencies`);
            const data = await response.json();
            this.currencies = Object.keys(data).map(code => new Currency(code, data[code]));
        } catch (error) {
            console.error('No se pudo obtener la informacion de monedas:', error);
        }
    }

    //Tercer paso
    // Metodo para obtener la conversion de una moneda a otra
    async convertCurrency(amount, fromCurrency, toCurrency) {
        // en caso de que los tipos de monera de origen y destino sean iguales
        // no se realizara la conversion y solamente se devolvera el monto ingresado
        if (fromCurrency.code === toCurrency.code) {
            return amount;
        }
        // si especifican otro tipo de monenas distintos se procede a realizar la conversion
        try {
            const response = await fetch(`${this.apiUrl}/latest?amount=${amount}&from=${fromCurrency.code}&to=${toCurrency.code}`);
            const data = await response.json();
            return data.rates[toCurrency.code];
        } catch (error) {
            console.error('Error al convertir tipo de moneda:', error);
            return null;
        }
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("conversion-form");
    const resultDiv = document.getElementById("result");
    const fromCurrencySelect = document.getElementById("from-currency");
    const toCurrencySelect = document.getElementById("to-currency");

    const converter = new CurrencyConverter("https://api.frankfurter.app");

    await converter.getCurrencies();
    populateCurrencies(fromCurrencySelect, converter.currencies);
    populateCurrencies(toCurrencySelect, converter.currencies);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const amount = document.getElementById("amount").value;
        const fromCurrency = converter.currencies.find(
            (currency) => currency.code === fromCurrencySelect.value
        );
        const toCurrency = converter.currencies.find(
            (currency) => currency.code === toCurrencySelect.value
        );

        const convertedAmount = await converter.convertCurrency(
            amount,
            fromCurrency,
            toCurrency
        );

        if (convertedAmount !== null && !isNaN(convertedAmount)) {
            resultDiv.textContent = `${amount} ${
                fromCurrency.code
            } son ${convertedAmount.toFixed(2)} ${toCurrency.code}`;
        } else {
            resultDiv.textContent = "Error al realizar la conversión.";
        }
    });

    function populateCurrencies(selectElement, currencies) {
        if (currencies) {
            currencies.forEach((currency) => {
                const option = document.createElement("option");
                option.value = currency.code;
                option.textContent = `${currency.code} - ${currency.name}`;
                selectElement.appendChild(option);
            });
        }
    }
});
