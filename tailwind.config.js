/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'card': 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
        'navbar':'0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
        'modal':'0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19)',
      },
      fontSize:{
        '%':"100%",
      },
      width : {
        '1/20' : '5%',
        '1/10' : '10%',
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
        'dashboard' : "#f5f5f5"
      },
      // top :{
      //   '1/2':"50%",
      //   '1/3':"33%",
      // },
      // left:{
      //   '1/2' : "50%",
      //   '1/3' : "33%",
      // },
    },
  },
  plugins: [],
}