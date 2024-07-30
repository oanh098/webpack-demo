const fs = require('fs');
const path = require("path");
const glob = require('glob-all');
const { merge } = require("webpack-merge");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");
const Handlebars = require('handlebars');
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const PATHS = {
  layouts: path.join(__dirname,'src/views/layouts/'),
  partials: path.join(__dirname, 'src/views/partials/'),
};


// Handlebars helpers used in templates.
const handlebarHelpers = {
  /**
   * Include the partial file into a template
   * @param {string} filename The partial file name
   * @param {Object} options The options passed via tag attributes into a template.
   * @param {Object} args The parent options passed using the `this` attribute.
   * @return {Handlebars.SafeString}
   */
  include: (filename, options, args) => {
    const tmplExt = '.html';
    const { ext } = path.parse(filename);
    if (!ext) filename += tmplExt;
    try{
      const template = fs.readFileSync(`${PATHS.partials}${filename}`, 'utf8');
      // pass the original data into sub-sub partials
      const data = options.name === 'include' ? {...options?.hash, ...options.data?.root} : {...options, ...args?.data?.root};
      const html = Handlebars.compile(template)(data);
      return new Handlebars.SafeString(html);
    } catch (error) {
    return new Handlebars.SafeString('');
    }
  },
  limit: (arr, limit) => {
    if(!Array.isArray(arr)) { return []; }
    return arr.slice(0, limit);
  }
}

//Register handlebars helpers.
for(const helper in handlebarHelpers) {
  Handlebars.registerHelper(helper, handlebarHelpers[helper]);
}

// Project config data
const projectData = merge (
  { webRoot: '' },
  { config: require(path.join(__dirname, 'src/data/config.json')) },

);

// Create the entry object containing pages located in src/views/layouts directory where have pages Home, About
  const entry = glob.sync(path.join(PATHS.layouts, '/**/*.html')).reduce((entry, file) => {
  const name = path.relative(PATHS.layouts, file).replace(/\.html$/,'');
  entry[name] = file;
  
  return entry;
}, {});



// Main webpack config options
module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  
  return {

    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : 'source-map',
    stats: 'minimal',
    output: {
        filename: 'js/[name].[contenthash:8].js',
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        chunkFilename: 'js/[name].[contenthash:8].js'
     
    },
    resolve: {
      alias: {
        'helpers': path.resolve(__dirname, 'src/helpers'),
        '@scripts': path.join(__dirname, 'src/assets/js'),
        '@images': path.resolve(__dirname,'src/assets/images'),
        '@styles': path.resolve(__dirname, 'src/assets/scss'),
      }
      
      
    },
    plugins: [
      

        new CompressionPlugin({
            test: /\.(js|css|html|svg)$/, // Match the files to compress
        }),
        
        new CleanWebpackPlugin(), 

        new webpack.ProgressPlugin(),
        
        new HtmlBundlerPlugin({
        
            entry: {
                index: {
                    import: './src/views/layouts/index.html',// => dist/index.html
                },
            },
        
            preprocessorOptions: {
            helpers: {
                arraySize: (array) => array.length,
            }
            },
            
            js: {
            //output filename of compiled Javascript
            filename: 'assets/js/[name].[contenthash:8].js',
            },
            css: {
            //output filename of extracted CSS
            filename: 'assets/css/[name].[contenthash:8].css',
            },

            loaderOptions: {
    
            preprocessor: (content) => Handlebars.compile(content)(projectData),
    
            },
  
        }),
    ],

    module: {
      rules: [
        {
          test: /\.(sass|scss|css)$/,
          use: ['css-loader', 'sass-loader','postcss-loader'],
        },
        {
          test: /\.(png|jpe?g|webp|ico|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/img/[name].[hash:8][ext]',
          },
        },

        {
          test: /\\.js$/,
          loader: "babel-loader",
          exclude: "/node_modules/",
        },
        
      ],
    },
    
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true
            }),
            new CssMinimizerPlugin(), // Add this for CSS minification
        ],


        splitChunks: {
            chunks: 'all', // Split all types of chunks
            cacheGroups: {
                default: false,
                vendor: {
                    test: /[\\/]node_modules[\\/]/, 
                    name: 'vendor',
                    chunks: 'all',
                    enforce: true,
                },
                styles: {
                    name: 'styles',
                    type: 'css/mini-extract',
                    chunks: 'all',
                    enforce: true,
                },
        }
        
      },
      
    },
    
    devServer: {
        static: path.resolve(__dirname, 'public'),
        port: 8080,
        hot: true,
        compress: true, // Enable gzip compression
    },

    performance: {
        // hints: false,
        maxAssetSize: 100000,
      },
  }
  
  

  
  
  
};