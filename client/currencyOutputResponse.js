/**
 * This function is called to render the custom response that displays the results from the previous custom
 * response.
 */
function currencyOutputHandler(event) {
  const { element, fullMessage } = event.data;

  const inputCurrency = fullMessage.context.skills['actions skill'].skill_variables.input_currency;
  const inputAmount = fullMessage.context.skills['actions skill'].skill_variables.input_amount;
  const outputAmount = fullMessage.context.skills['actions skill'].skill_variables.output_amount;

  element.innerHTML = `
        <div class="CurrencyCard">
          <div class="CurrencyCard__ResultInput">
            ${inputAmount} ${currencyLabel(inputCurrency)} equals
          </div>
          <div class="CurrencyCard__ResultOutput">
            ${outputAmount} zł
          </div>
          <div class="CurrencyCard__ResultDivider"></div>
        </div>
      `;
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

export { currencyOutputHandler };
