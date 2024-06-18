/**
 * This function is called to render the custom response that asks for input from the user about the currency and
 * amount they wish to exchange.
 */
function currencyInputHandler(event, instance) {
  const { element } = event.data;

  let selectedCurrency;
  let exchangeClicked = false;

  element.innerHTML = `
      <div class="CurrencyCard">
        <p>What currency would you like to exchange from?</p>
        <div class="CurrencyCard__CurrencyButtons">
          <button type="button" class="CurrencyCard__CurrencyButton cds--tag" data-currency="eur">${currencyLabel('eur')}</button>
          <button type="button" class="CurrencyCard__CurrencyButton cds--tag" data-currency="gbp">${currencyLabel('gbp')}</button>
          <button type="button" class="CurrencyCard__CurrencyButton cds--tag" data-currency="usd">${currencyLabel('usd')}</button>
          <button type="button" class="CurrencyCard__CurrencyButton cds--tag" data-currency="jpy">${currencyLabel('jpy')}</button>
        </div>
        <div class="cds--form-item cds--text-input-wrapper">
        <p>Choose an amount</p>
          <div class="cds--text-input__field-outer-wrapper">
            <div class="cds--text-input__field-wrapper">
              <input type="text" class="CurrencyCard__AmountInput cds--text-input">
            </div>
          </div>
        </div>
        <div class="CurrencyCard__ExchangeButtonContainer">
          <button type="button" class="CurrencyCard__ExchangeButton cds--btn cds--btn--primary" disabled>Exchange</button>
        </div>
      </div>
    `;

  const currencyButtons = element.querySelectorAll('.CurrencyCard__CurrencyButton');
  const exchangeButton = element.querySelector('.CurrencyCard__ExchangeButton');
  const amountInput = element.querySelector('.CurrencyCard__AmountInput');

  currencyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedCurrency = button.getAttribute('data-currency');
      updateInputs();
    });
  });

  function updateInputs() {
    currencyButtons.forEach((button) => {
      if (button.getAttribute('data-currency') === selectedCurrency) {
        button.classList.add('CurrencyCard__CurrencyButton--selected');
      } else {
        button.classList.remove('CurrencyCard__CurrencyButton--selected');
      }
    });

    const amount = element.querySelector('.CurrencyCard__AmountInput').value;
    exchangeButton.disabled = !selectedCurrency || !amount || !Number(amount) || exchangeClicked;
  }

  amountInput.addEventListener('input', updateInputs);

  exchangeButton.addEventListener('click', () => {
    exchangeClicked = true;

    updateInputs();

    // Send a message to the assistant using a well-known phrase it will recognize which should trigger the action
    // that will perform the exchange conversion. The input currency and amount are stored in context variables
    // that the action will read. The action will place the resulting values into output context variables.
    const amount = element.querySelector('.CurrencyCard__AmountInput').value;
    const message = {
      context: {
        skills: {
          'actions skill': {
            skill_variables: {
              input_amount: Number(amount),
              input_currency: selectedCurrency,
            },
          },
        },
      },
      input: {
        // This is the text the assistant will see.
        text: `DO_EXCHANGE_CALCULATION`,
      },
      history: {
        // This is the label the user will see.
        label: `What is ${amount} ${currencyLabel(selectedCurrency)} in złoty?`,
      },
    };
    instance.send(message);
  });
}

/**
 * Returns a label for the given currency.
 */
function currencyLabel(currency) {
  switch (currency) {
    case 'eur':
      return '€ Euro';
    case 'gbp':
      return '£ Pound';
    case 'usd':
      return '$ USD';
    case 'jpy':
      return '¥ Yen';
  }
}

export { currencyInputHandler };
