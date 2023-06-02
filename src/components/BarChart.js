import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  const options= {
    responsive: true,
    animations: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
    },
    plugins: {
      colorschemes: {
        scheme: 'brewer.RdYlGn3'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      title: {
        display: true,
      },
      beforeEvent(chart, args, pluginOptions) {
        const event = args.event;
        if (event.type === 'mouseout') {
          // process the event
        }
      },
    },
    hover: {
      mode: 'point',
      intersec: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Bars'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Users'
        },
        // max: 100,
        ticks: {
          // forces step size to be 50 units
          // stepSize: 5
        }
      }
    }
  };
  // console.log(chartData);
  return <Bar data={chartData} options={options}/>;
}

export default BarChart;