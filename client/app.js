import "./styles.scss";
import { carouselCustomResponseHandler } from "./carouselResponse";
import { currencyInputHandler } from "./currencyInputResponse";
import { currencyOutputHandler } from "./currencyOutputResponse";
import { pieChartResponseHandler } from "./pieChartResponse";
import { doughnutChartResponseHandler } from "./doughnutChartResponse";
import { barChartResponseHandler } from "./barChartResponse";
import { phoneNumberResponseHandler } from "./phoneNumberResponse";

/**
 * Injects a web chat instance into the page.
 */
function addWebChat() {
  // This is the standard web chat configuration object. You can modify these values with the embed code for your
  // own assistant if you wish to try this example with your assistant. You can find the documentation for this at
  // https://web-chat.global.assistant.watson.cloud.ibm.com/docs.html?to=api-configuration#configurationobject.
  const options = {
    integrationID: "", // The ID of this integration.
    region: "", // The region your integration is hosted in.
    serviceInstanceID: "", // The ID of your service instance.
    onLoad: webChatOnLoad,
  };

  window.watsonAssistantChatOptions = options;

  const script = document.createElement("script");
  const version = options.clientVersion || "latest";
  script.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/${version}/WatsonAssistantChatEntry.js`;
  document.head.appendChild(script);
}

/**
 * This function is called when web chat has been loaded and is ready to be displayed.
 */
async function webChatOnLoad(instance) {
  function addForm2(instance) {
    const form2HTML = `
      </br></br>
       <div class="input-wrapper">
        <label>
         Enter an existing watsonx Assistant command (ex: make a pie chart, fill phone number, show a carousel):
         <input class="wxa-command" type="text" />
        </label>
      </div>
      </br>
      <div class="ButtonContainer">
        <button type="button" class="Input Button">Send to assistant</button>
      </div>`;

    const form2Container = document.createElement("div");
    form2Container.innerHTML = form2HTML;
    document.body.appendChild(form2Container);

    // Add event listener to the button
    const button = form2Container.querySelector(".Input.Button");
    button.addEventListener("click", () => {
      const wxaCommand = form2Container.querySelector(".wxa-command").value;
      if (instance) {
        const message = {
          input: {
            text: `${wxaCommand}`,
          },
        };
        instance.send(message);
      }
    });
  }
  addForm2(instance);
  instance.on({
    type: "customResponse",
    handler: (event, instance) => {
      // The "user_defined_type" property is just an example; it is not required. You can use any other property or
      // condition you want here. This makes it easier to handle different response types if you have more than
      // one custom response type.
      if (
        event.data.message.user_defined &&
        event.data.message.user_defined.user_defined_type === "carousel"
      ) {
        carouselCustomResponseHandler(event, instance);
      }
      if (
        event.data.message.user_defined &&
        event.data.message.user_defined.user_defined_type ===
          "currency_exchange_input"
      ) {
        currencyInputHandler(event, instance);
      }
      if (
        event.data.message.user_defined &&
        event.data.message.user_defined.user_defined_type ===
          "currency_exchange_output"
      ) {
        currencyOutputHandler(event, instance);
      }
      if (
        event.data.message.user_defined &&
        event.data.message.user_defined.user_defined_type === "pie_chart"
      ) {
        pieChartResponseHandler(event, instance);
      }
      if (
        event.data.message.user_defined &&
        event.data.message.user_defined.user_defined_type === "doughnut_chart"
      ) {
        doughnutChartResponseHandler(event, instance);
      }
      if (
        event.data.message.user_defined &&
        event.data.message.user_defined.user_defined_type === "bar_chart"
      ) {
        barChartResponseHandler(event, instance);
      }
      if (
        event.data.message.user_defined &&
        event.data.message.user_defined.user_defined_type ===
          "fill_phone_number"
      ) {
        phoneNumberResponseHandler(event, instance);
      }
    },
  });
  await instance.render();
}
// Function to inject the form HTML into the page
function addForm() {
  const formHTML = `
    <p>
      Send the message "Fill phone number" to the watsonx Assistant and it will automatically
      fill in the phone number for you.
    </p>
    <p>
     <label>
        Phone number:
        <input id="phone-number" type="text" />
      </label>
    </p>`;

  const formContainer = document.createElement("div");
  formContainer.innerHTML = formHTML;
  document.body.appendChild(formContainer);
}

// Launch web chat and add the form as soon as this script has loaded.
addWebChat();
addForm();
