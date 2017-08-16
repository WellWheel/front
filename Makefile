install:
	npm install
	node_modules/bower/bin/bower install

start: install
	node_modules/gulp/bin/gulp.js serve:dev

.DEFAULT_GOAL := start
