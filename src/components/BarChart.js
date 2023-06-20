import React from "react";
import { Bar,Pie,Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartType,chartData,settings }) {
  
  const options= {
    responsive: true,
    animations: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
    },
    layout: {
      padding: 20
    },
    plugins: {
      colorschemes: {
        scheme: 'brewer.RdYlGn3'
      },
      legend:{
          display:settings.legend,
          labels: {
            // usePointStyle: true,
          },
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
    aspectRatio:1,
    hover: {
      mode: 'point',
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: settings.xTitle,
          text: settings.xText
        }
      },
      y: {
        title: {
          display: settings.yTitle,
          text: settings.yText,
        },
        // max: 100,
        ticks: {
          beginAtZero: true,
        },
      }
    }
  };
  // console.log(chartData);
  // console.log(chartData);
  
  if(chartType==="line"){
    return <Line data={chartData} options={options}/>;
  }else if(chartType==="bar"){
    return <Bar data={chartData} options={options}/>;
  }else if(chartType==="pie"){
    return <Pie data={chartData} options={options}/>;
  }
}

export default BarChart;