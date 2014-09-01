MOCAH = ./node_modules/mocha/bin/_mocha
ISTANBUL = ./node_modules/.bin/istanbul
COVERALLS = ./node_modules/.bin/coveralls


node_modules: package.json
	@npm install

test: clean node_modules
	@$(MOCAH) -R spec ./test/index.js

test-cov: clean node_modules
	@$(ISTANBUL) cover $(MOCAH) -- -R spec ./test/index.js

clean:
	@rm -rf ./coverage
	@rm -rf ./test/fixtures/valid/components
	@rm -rf ./test/fixtures/invalid/components

.PHONY: test test-cov clean
