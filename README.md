# RainTree-Kiosk - Automated Testing using Cypress 	
Cypress is considered for the automation of web ui and api tests of RainTree-Kiosk application.

## Scripting Language
	
JavaScript is used to develop the tests using Cypress.

## Getting Started

### Pre-requisites
	
Cypress is a nodejs application, hence node installation is a pre-requisite to use it. Download and install [nodejs](https://nodejs.org/en/) from its official website

After installation, run following two commands from command prompt to ensure nodejs is installed properly. Both commands return the installed versions of nodejs and npm (node package manager - installed along with nodejs)
	$node --version
	$npm --version
	
### Clone the repo
	git clone https://github.com/raintreeinc/qa-automation
###	Install NPM packages
	npm install

Cypress will be installed along with other dependencies that are part of Dev-dependencies in the package.json
	
## Implementation
	
There are 3 important files that contain tests and other required configurations of Cypress

### A. Files related to tests
They are maintained under the folder: cypress/integration. And this folder has multiple files based on the automation implementation
		
	1. .spec files: Actual test scripts are maintained in these files i.e. test suites (describe blocks) and tests (it blocks)
	2. .page files: These files are used to implement page object model and they contain locators of different elements/controls/components in the application user interface.	
	3. .testdata files: These contain data that are passed in the tests e.g. patient details
		
### B. Configuration file
cypress.json file in the root folder, is used to maintain the custom configuration of tool and environment variables. 
    	
### C. package.json
Holds project specific dependencies and other npm scripts
		
### Local Execution
To run tests  locally, use below cli command from parent folder of the suite
	npx cypress run
To run through UI Test Runner of Cypress, use below cli command to open Test Runner and click the test/tests to run
	npx cypress open
	
## CI Integration with Jenkins
This section will be updated once CI integration is done with Jenkins.