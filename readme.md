# TypeScript & React TodoMVC

A standalone TypeScript compiler is available on NPM.

	npm install typescript

To compile the TypeScript in this project:

	# from examples/typescript-react
	$ tsc -p js

To be able to run the output JS files in the browser:

	# from examples/typescript-react
	$ npm install -g browserify
	$ browserify js/app.js -o js/bundle.js

To run the app, spin up an HTTP server (e.g. `python -m SimpleHTTPServer`) and visit http://localhost/.../myexample/.
