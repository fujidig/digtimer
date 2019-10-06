module.exports = {
    mode: 'development',
    entry: './index.ts',
    output: {
      path: __dirname,
      filename: 'bundle.js' 
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader'
        }
      ]
    }
  }