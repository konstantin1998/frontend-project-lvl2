install:
	npm install
publish:
	npm publish
lint:
	npx eslint .
test:
	sudo ./dist/bin/gendiff.js ./__tests__/__fixtures__/before.yml ./__tests__/__fixtures__/after.yml
