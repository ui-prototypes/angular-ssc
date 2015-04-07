# angular-ssc
A prototype SSC UI built using Angular.js and the SSC
 * Angular.js (https://angularjs.org/)
 * Foundation Stylesheet (http://foundation.zurb.com/)
 * Node.js (https://nodejs.org/)
 * Protractor e2e angular test framework(https://github.com/angular/protractor)
 * SAAS css with superpowers (http://sass-lang.com/)
 * Karma (http://karma-runner.github.io/)
 * Jasmine (http://jasmine.github.io/)
 * BrowserSync (http://browsersync.io/)

#Installation
In order to get things running you'll need to install a few dependencies
 * Node.js (0.10 or later)
 * bower (http://bower.io/)

#Install Dependencies 
 * Install dependent library which required during build and test time to minify css, html, js, image file. 
 * sudo npm install --save
 * bower install 
 
#Running 
 * To run the tests run ```gulp tests```. If you want the test runner to listen for changes to source files and run automatically,
 * To run the server in development mode run ```gulp serve```. The server will automatically restart when changes are detected to the backend source files.

#Configuration
To work, the server needs access to a SteelApp Traffic Manager to which it can make REST API requests. Before running the server, go to lib/constants.js and change STM_HOST to point to the IP address of your Traffic Manager.
