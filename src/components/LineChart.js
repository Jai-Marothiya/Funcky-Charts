import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  const options= {
    responsive: true,
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeOutQuart',
        from: 1,
        to: 0,
        loop: true
      }
    },
    plugins: {
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
          text: 'Year'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Users'
        },
        min: -10000,
        max: 100000,
        ticks: {
          // forces step size to be 50 units
          stepSize: 50
        }
      }
    }
  };

  return <Line data={chartData} options={options}/>;
}

export default LineChart;