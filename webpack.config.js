const nodeExternals = require('webpack-node-externals');
module.exports = {
    target: 'node', // Set the target to node (this tells Webpack it's for Node.js)
    externals: [
      nodeExternals(), // Exclude all node modules
    ],
    // Other Webpack configurations...
  };
  
