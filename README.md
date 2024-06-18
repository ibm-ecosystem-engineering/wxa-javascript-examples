<!-- ABOUT THE PROJECT -->

# watsonx Assistant JavaScript Examples

This repo contains a vanilla JS app with an embedded watsonx Assistant. The assistant has a variety of actions with user-defined responses that point to JS components (ex: a Swiper carousel, a Chart.js pie chart). This repo references many examples from: [Assistant Toolkit](https://github.com/watson-developer-cloud/assistant-toolkit/tree/master/integrations/webchat/examples)

<!-- GETTING STARTED -->

## Getting Started

### watsonx Assistant setup

To set up your own assistant, you'll need to perform the steps below.

- The [OpenAPI specification](nbp.openapi.json) for the National Bank of Poland can be used to set up the custom extension in your assistant. For our full docs on how to create and customize extensions, visit [Building a Custom Extension](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-build-custom-extension).
- Import the [wxa-javascript-examples-action.json](wxa-javascript-examples-action.json) file located in the repository for this example into your assistant.
- Modify the `integrationID`, `region`, and `serviceInstanceID` within `app.js` with your assistant's information. This information can be found in your assistant instance under "Environments" -> "Web chat" -> "Embed".

### Installation

1. `cd client`
2. `npm install`
3. `npm run start`
4. Open a web browser to `localhost:3000`
5. Open web chat
6. Click/enter any of the following inputs to test a custom response:
   1. `Show a carousel`
      1. This input demonstrates how to use SwiperJS components in watsonx Assistant responses
   2. `Exchange for Polish złoty`
      1. This input demonstrates how to send information to assistant via a custom response, call an extension, and output the extension information in a second custom response
   3. `Make a pie chart`
      1. This input demonstrates how to use Chart.js components in watsonx Assistant responses. You can additionally input `Make a doughnut chart` or `Make a bar chart` to view different types of components.
   4. `Modify parameters`
      1. This input demonstrates how to update the data values of "red", "blue", and "purple" that are displayed in the above charts. You can input `Make a pie chart` to view the updates.
   5. `Fill phone number`
      1. This input demonstrates how to interact with the main webpage from the assistant. The assistant will fill the "Phone number" field on the main webpage with a default phone number value.
7. You can additionally enter commands in the second input field on the main webpage and press the "Send to Assistant" to demonstrate how to interact with the assistant from the main webpage.
