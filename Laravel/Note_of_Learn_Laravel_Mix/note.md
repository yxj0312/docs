### Ep 2 - Decoding Your NPM Scripts
#### what's going on here?
```javaScript
"development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
```
- cross-env: the way to make true, that I am setting command and setting env-variables/normalize 
    - windows: except one format for setting a varaible
    - mac/Linux: except another
- --progress: I wanna see progress on the way
- --config=node_modules/laravel-mix/setup/webpack.config.js:
    - we reference a laravel-mix specific configuration file
    ```javaScript
    /**
     * As our first step, we'll pull in the user's webpack.mix.js
     * file. Based on what the user requests in that file,
     * a generic config object will be constructed for us.
     */
    let mix = require('../src/index');

    let ComponentFactory = require('../src/components/ComponentFactory');

    new ComponentFactory().installAll();
    
    <!--require your webpack.mix.js files, builds up the world for you  -->
    require(Mix.paths.mix());

    /**
     * Just in case the user needs to hook into this point
     * in the build process, we'll make an announcement.
     */

    Mix.dispatch('init', Mix);

    /**
     * Now that we know which build tasks are required by the
     * user, we can dynamically create a configuration object
     * for Webpack. And that's all there is to it. Simple!
     */

    let WebpackConfig = require('../src/builder/WebpackConfig');

    module.exports = new WebpackConfig().build();

    ```
    


