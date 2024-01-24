const path = require('path');

module.exports = {
  entry: './assets/script.js', // Your main JavaScript file
  output: {
    filename: 'bundle.js', // The output bundle
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'development', // Could be 'production' for production builds
};
