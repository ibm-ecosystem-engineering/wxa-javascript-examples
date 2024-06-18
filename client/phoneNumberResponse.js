function phoneNumberResponseHandler(event) {
  const { element, fullMessage } = event.data;

  const phone_number =
    fullMessage.context.skills["actions skill"].skill_variables.phone_number;
  document.querySelector("#phone-number").value = phone_number;
}

export { phoneNumberResponseHandler };
