import React from "react";
import { Bar,Pie,Line, Doughnut,Scatter,PolarArea,Radar, Bubble } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartType,chartData,settings,chartProps }) {
  
  // console.log(chartProps);
  const options= {
    barPercentage: 0.8,
    categoryPercentage:0.8,
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
          // display:"true",
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
      // beforeEvent(chart, args, pluginOptions) {
      //   const event = args.event;
      //   if (event.type === 'mouseout') {
      //     // process the event
      //   }
      // },
    },
    aspectRatio:1,
    hover: {
      mode: 'point',
      intersect: false,
    },
    scales: {
      x: {
        title: {
          // display: settings.xText.length>0?true:false,
          display: true,
          text: settings.xText
        },
        stacked: chartProps.stacked,
        ticks: {
          beginAtZero: true,
        },
        // barPercentage: 1,
        // categoryPercentage:0.5 
        
      },
      y: {
        title: {
          // display: settings.yText.length>0?true:false,
          display: true,
          text: settings.yText,
        },
        stacked: chartProps.stacked,
        ticks: {
          beginAtZero: true,
        },
      }
    }
  };
  // console.log("bar chart setting" , settings);
  // console.log("bar chart prop" , settings.xText);
  // console.log(chartData);
  // console.log(chartType);
  
  if(chartType==="line"){
    // console.log("mai line hu");
    return <Line id="stackD" data={chartData} options={options}/>;
  }else if(chartType==="bar"){
    return <Bar id="stackD" data={chartData} options={options}/>;
  }else if(chartType==="pie"){
    return <Pie id="stackD" data={chartData} options={options}/>;
  }else if(chartType==="doughnut"){
    return <Doughnut id="stackD" data={chartData} options={options}/>;
  }else if(chartType==="scatter"){
    return <Scatter id="stackD" data={chartData} options={options}/>;
  }else if(chartType==="polar"){
    return <PolarArea id="stackD" data={chartData} options={options}/>;
  }else if(chartType==="radar"){
    return <Radar id="stackD" data={chartData} options={options}/>;
  }
}

export default BarChart;