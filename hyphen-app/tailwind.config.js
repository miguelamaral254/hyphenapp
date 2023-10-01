module.exports = {
  content: [
    "./src/screens/*.js"
  ],
  theme: {
    extend: {
      colors: {
        green: {
        100:'#00FF19',
          
        },
        
      }
    }
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
