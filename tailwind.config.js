// tailwindConfig.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      // boxShadow: {
      //   'card': 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
      //   'navbar':'0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
      //   'modal':'0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19)',
      //   'button':' rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;',
      // },
      boxShadow:{
        'navbar':'0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
        'card': '0px 15px 25px rgba(0, 0, 0, 0.15) ,0px 5px 10px rgba(0, 0, 0, 0.05)',
        'modal':'0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19)',
        'button':' 0px -23px 25px 0px rgba(0, 0, 0, 0.17)  inset,  0px -36px 30px 0px rgba(0, 0, 0, 0.15) inset,  0px -79px 40px 0px rgba(0, 0, 0, 0.1) inset,  0px 2px 1px rgba(0, 0, 0, 0.06),  0px 4px 2px rgba(0, 0, 0, 0.09),  0px 8px 4px rgba(0, 0, 0, 0.09),  0px 16px 8px rgba(0, 0, 0, 0.09),  0px 32px 16px rgba(0, 0, 0, 0.09)',
      },
      fontSize:{
        '%':"100%",
      },
      width : {
        '1/20' : '5%',
        '1/10' : '10%',
        '3%' : '3%',
        '4%' : '4%',
        '6%' :'6%'
      },
      keyframes: {
        'modal': {
          '0%':  {top:"33%",left:"33%", opacity:'0' },
          '100%':{top:"33%",left:"33%" , opacity:'1'},
        },
      },
      backgroundColor:{
        'modal' : "#bacbed",
        'modalO' : "rgb(0 0 0 / 40%)",
        'dashboard' : "#f5f5f5",
        'chart' : 'rgb(186, 203, 237)',
        'sidebarlight':'rgb(186, 203, 237)',
      },
      colors:{
        'cardinput' : '#dddddd',
      }
      
    },
  },
  plugins: [],
}


