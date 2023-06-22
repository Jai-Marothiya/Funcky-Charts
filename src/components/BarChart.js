import React from "react";
import { Bar,Pie,Line, Doughnut,Scatter,PolarArea,Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartType,chartData,settings,chartProps }) {
  
  const options= {
    responsive: true,
    animations: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
    },
    indexAxis: chartProps.indexAxis,
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
        },
        stacked: chartProps.stacked,
      },
      y: {
        title: {
          display: settings.yTitle,
          text: settings.yText,
        },
        stacked: chartProps.stacked,
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
  }else if(chartType==="doughnut"){
    return <Doughnut data={chartData} options={options}/>;
  }else if(chartType==="scatter"){
    return <Scatter data={chartData} options={options}/>;
  }else if(chartType==="polar"){
    return <PolarArea data={chartData} options={options}/>;
  }else if(chartType==="radar"){
    return <Radar data={chartData} options={options}/>;
  }
}

export default BarChart;