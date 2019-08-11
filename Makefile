install:
	npm install
publish:
	npm publish
lint:
	npx eslint .
test:
	npx babel-node -- src/index.js
