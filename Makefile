install:
	npm install
publish:
	npm publish
lint:
	npx eslint .
test:
	sudo ./dist/bin/gendiff.js /home/konstantin/js_project/testdir/jsonBefore /home/konstantin/js_project/testdir/jsonAfter
