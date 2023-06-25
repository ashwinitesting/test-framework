# Table of Contents

1. [Overview](#overview)
    1. [Features and functionality](#features-and-functionality)
2. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
        1. [General](#general)
    2. [Installation](#installation)
        1. [Setup](#setup)
        2. [Running the test](#running-the-test)
    3. [Configuration](#configuration)
        1. [Test Variables](#test-variables)
3. [Design Choices](#design-choices)
4. [Improvements](#improvements)
          

## Overview

### Features and functionality

For testing, I have used login functionality of the Court and Tribunal Hearings Service (known as CaTH). 
Both functional and cross-browser tests are implemented.
Tests are configured to run in parallel.
Tests are configured to run in chromium, firefox, webkit (cross-browser testing)
Allure reports are implemented for both functional and cross-browser tests.

Main test-file - src/test/end-to-end/tests/login_test.ts
Custom-steps-file - src/test/end-to-end/tests/custom-steps.ts
Functional-test-configuration - src/test/end-to-end/functional.conf.ts
Cross-browser-configuration - src/test/end-to-end/crossbrowser.conf.ts
Main config - src/test/config.ts

The test suite uses [Node.js](https://nodejs.org/en) runtime environment.
Uses [TypeScript](https://www.typescriptlang.org/) for coding.

## Getting Started

### Prerequisites

##### General

Running the application requires the following tools to be installed in your environment:

- [Node.js](https://nodejs.org/) v16.0.0 to v19.x.x (last tested on v19.8.1)
- [Yarn](https://yarnpkg.com/) v3+ or [Npm](https://www.npmjs.com/)
- [CodeceptJsWithPlaywrightHelper](https://codecept.io/helpers/Playwright/)
- [AllureReports](https://docs.qameta.io/allure/)


### Installation

#### Setup

-   Clone the repository
-   Ensure all required [environment variables](#environment-variables) have been set.
-   Use the terminal command `yarn install` to install all dependencies.

#### Running the test

All scripts are configured in package.json

test:crossbrowser: npm-run-all -scl test:crossbrowser:all test:crossbrowser:report
- This command is to run tests in all browsers (chromium, webkit, firefox) configured in crossbrowser.conf.ts and creates allure report

test:crossbrowser:all: NODE_TLS_REJECT_UNAUTHORIZED=0 codeceptjs --config ./src/test/end-to-end/crossbrowser.conf.js run-multiple --all --grep @CrossBrowser
- This command is to run tests in all browsers (chromium, webkit, firefox) configured in crossbrowser.conf.ts if tests have @CrossBrowser tag 

test:crossbrowser:report: allure generate functional-output/cross-browser/reports/**/ -c -o functional-output/cross-browser/allure
- This command is to create allure reports for cross-browser tests from existing xml reports

test:functional: npm-run-all -scl test:functional:all test:functional:report
- Runs all tests configured in functional.conf.ts and creates allure report

test:functional:all: NODE_TLS_REJECT_UNAUTHORIZED=0 codeceptjs --config ./src/test/end-to-end/functional.conf.js run-workers 4 parallel
- Runs all tests configured in functional.conf.ts 

 "test:functional:report: allure generate functional-output/functional/reports/ -c -o functional-output/functional/allure
- This command is to create allure reports for functional tests from existing xml reports

### Configuration

#### Test Variables

If valid tests case needs to pass you need to create your username and password for CaTH
and put them in configuration file(src/test/config.ts)

MEDIA_USER_USERNAME: 'Your username',
MEDIA_USER_PASSWORD: 'Your password'

additional improvements you would make if given more time.

## Design Choices

I used CodeceptJS as my test framework and Playwright as my test tool.

CodeceptJS offers scenario-driven tests. These test scenarios are linear as the user's behavior and his actions on a site.
Special BDD-style syntax makes test code concise and readable. 
Expandable - you can run tests without substantial changes in any of the popular test runners.

Playwright interactions auto-wait for elements to be ready. This improves reliability and simplifies test authoring. 
It receives browser signals, like network requests, page navigations and page load events to eliminate the need for sleep timeouts that cause flakiness.
Besides JavaScript, Playwright also supports multiple programming languages such as Python, Java, and . NET C#, giving more options to QAs writing test scripts.
Playwright is highly useful for cross-browser testing on complex applications due to its wide coverage, accuracy, and high speed.
It has full API coverage for all modern browsers, including Google Chrome and Microsoft Edge (with Chromium), Apple Safari (with WebKit) and Mozilla Firefox.

## Improvements

Additional improvements I would make if given more time

 - Implement performance testing
 - Write accessibility tests
 - Configure environment variables
 - Configure jenkins pipeline
 - Separate run configurations according to test tags
 - Use a few automated tools to ensure quality and security within the service
   A few examples can be found below:

-   [`Prettier`](https://prettier.io/) - an opinionated code formatter that enforces a consistent code style across a codebase. Prettier can be integrated with various code editors and build tools to format code automatically, helping to reduce formatting-related code reviews and conflicts.

-   [`Lefthook`](https://github.com/evilmartians/lefthook) - a git hook manager that enables checks to be run on code changes. Lefthook can be configured to run a variety of linters, tests, and other checks before specific git commands (e.g. `git commit` or `git push`) to ensure code quality, consistency, and security.

-   [`Stylelint`](https://stylelint.io/) - a linter for Cascading Style Sheets (CSS) that helps ensure consistent coding conventions, identify potential errors and enforce code standards. Stylelint can be used to identify issues related to syntax, naming conventions, formatting, and selector usage.

-   [`ESLint`](https://eslint.org/) - a linter for JavaScript that helps identify potential errors, enforce coding conventions, and maintain code quality.

-   [`pa11y`](https://pa11y.org/) - an accessibility testing tool that checks web pages for accessibility issues and compliance with WCAG (Web Content Accessibility Guidelines).
