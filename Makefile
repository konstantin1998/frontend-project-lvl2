install:
	npm install
publish:
	npm publish
lint:
	npx eslint .
test:
	sudo ./dist/bin/gendiff.js -h
