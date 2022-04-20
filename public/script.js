const socket = io();

const chartData = [];

const displaypieChart = (obj) => {
  Object.values(obj).forEach((el) => chartData.push(...Object.values(el)));

  const monitor = Object.values(obj);
  monitor.forEach((el) => {
    let progressValue = 0;
    // if (
    //   document.querySelector(`.${Object.keys(el)}-value`).textContent ==
    //   Object.values(el)
    // ) {
    //   return;
    // }

    const progress = setInterval(() => {
      progressValue++;
      document.querySelector(
        `.${Object.keys(el)}`
      ).style.background = `conic-gradient(
        ${document.querySelector(`.${Object.keys(el)}`).dataset.color} ${
        progressValue * 3.6
      }deg,
        white ${progressValue * 3.6}deg
        )`;

      document.querySelector(
        `.${Object.keys(el)}-value`
      ).textContent = `${progressValue}%`;

      document.querySelector(
        `.${Object.keys(el)}-val`
      ).textContent = `${progressValue}`;

      if (progressValue == Object.values(el)) {
        clearInterval(progress);
      }
    }, 100);
  });
  chartData.forEach((data, i) => {
    myChart.data.datasets[0].data[i] = data;
    myChart.update();
  });
};

socket.on('sendData', (obj) => {
  console.log('updated data');
  displaypieChart(obj);
});

const ctx = document.getElementById('barChart');
const labels = ['Cardboard', 'Glass', 'Metal', 'Paper', 'Plastic', 'others'];

const NUMBER_CFG = { min: 0, max: 100 };

const data = {
  labels: labels,
  datasets: [
    {
      label: '',
      data: NUMBER_CFG,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(201, 203, 207, 0.5)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      data: [0, 0, 0, 0, 0, 0],
      barThickness: 500,
      maxBarThickness: 100,
    },
  ],
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        steps: 10,
        stepValue: 5,
        max: 100,
        ticks: {
          min: 0,
          max: 100,
          callback: function (val, index) {
            // Hide every 2nd tick label
            return index % 2 === 0 ? this.getLabelForValue(val) : '';
          },
        },
      },
    },
  },
};

const myChart = new Chart(ctx, config);
