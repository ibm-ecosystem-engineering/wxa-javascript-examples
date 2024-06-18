import Chart from "chart.js/auto";

/**
 * This function is called whenever web chat receives a custom response and we need to construct the content for web chat
 * to display.
 */
function doughnutChartResponseHandler(event, instance) {
  const { element, fullMessage } = event.data;

  const data_0 =
    fullMessage.context.skills["actions skill"].skill_variables.data_0;
  const data_1 =
    fullMessage.context.skills["actions skill"].skill_variables.data_1;
  const data_2 =
    fullMessage.context.skills["actions skill"].skill_variables.data_2;

  assistant_data = [data_0, data_1, data_2];

  element.innerHTML = `
    <div class="DoughnutChartContainer">
      <canvas id="doughnutChart"></canvas>
    </div>`;

  const ctx = element.querySelector("#doughnutChart").getContext("2d");
  createDoughnutChart(ctx);
}

/**
 * This function will create the doughnut chart using Chart.js with hardcoded data.
 */
function createDoughnutChart(ctx) {
  const data = {
    labels: ["Red", "Blue", "Purple"],
    datasets: [
      {
        label: "Data",
        data: assistant_data,
        backgroundColor: [
          "rgb(255,82,82)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 82, 82, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
      },
    ],
  };

  new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  });
}

export { doughnutChartResponseHandler };
