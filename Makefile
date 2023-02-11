.PHONY: help clean test coverage install
.DEFAULT_GOAL := help

define PRINT_HELP_PYSCRIPT
import re, sys

regex_pattern = r'^([a-zA-Z_-]+):.*?## (.*)$$'

for line in sys.stdin:
	match = re.match(regex_pattern, line)
	if match:
		target, help = match.groups()
		print("%-20s %s" % (target, help))
endef

export PRINT_HELP_PYSCRIPT

BROWSER := python -c "$$BROWSER_PYSCRIPT"

PACKAGE_NAME = "retoric"
COVERAGE_IGNORE_PATHS = "retoric/examples"

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

clean-test: ## remove test and coverage artifacts
	rm -fr coverage/

clean-dist: ## remove dist artifacts
	rm -fr dist/

clean: clean-test clean-dist ## remove all test coverage

test: ## run tests with jest
	npm run test:run

test-watch: ## run tests on watchdog mode
	npm run test:watch

lint: clean ## perform inplace lint fixes
	npm run format && npm run format:check 

install: clean ## install the packages
	npm install

publish: clean ## build source and publish package
	npm run release