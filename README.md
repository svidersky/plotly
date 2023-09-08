## Description
This is a test project for the SDET position at Plotly. It contains several Cypress tests for the Cypress website. The tests can launched locally by cloning the project and following the instructions or directly from GitHub Actions.

## Getting started
### System requirements
[Official system requirements from Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)

### Installation
```bash
npm install
```
### Open Cypress in UI mode:

```bash
npm run cyopen
```

### Run all Cypress tests in headless mode:
```bash
npm run test
```

## Run tests from GHA
[![Cypress Tests](https://github.com/svidersky/plotly/actions/workflows/e2e-tests.yaml/badge.svg)](https://github.com/svidersky/plotly/actions/workflows/e2e-tests.yaml)

In the job description, it's said that GHA experience is a plus. So I decided to add a workflow that triggers tests on each push to the main branch. It also possible to manually trigger the workflow from the [Actions tab](https://github.com/svidersky/plotly/actions/workflows/e2e-tests.yaml).
It's not a part of the assessment but I think it's a good thing to have.

## Additional info and explanations
### Selectors
According to [Cypress best practices](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements), we should use `data-* attributes` to select elements.
In my current projects, I add them myself and then use it in the tests that's why I didn't spend too much time trying to build the best possible css selector.

### Page objects (PO)
In Cypress [Real World App project](https://github.com/cypress-io/cypress-realworld-app/blob/e66f559f34a2dae163b366113363683f958f22c8/cypress/tests/ui/auth.spec.ts#L45), they don't use any abstractions for the element selectors.
In their section about [Page Objects](https://docs.cypress.io/guides/references/best-practices#Page-Objects), it's said `programmatically log into your application, and take control of your application's state`. In reality, I guess it's still possible to combine PO for abstracting selectors but using Cypress commands and simple utility functions to take the control of the application's state. This is why I demostrated both approaches (PO and simple selectors) in the project.

Also, having three test cases that use the top nav menu and links could imply that it's a good idea to have an abstraction for it. But I would do instead in such cases:
- have lightweight component tests for the top nav menu and sub-link using Cypress or React Testing Library
- possibly have just one e2e test for the top menu
- in all other cases, go directly to the target page

### Data-driven tests
I noticed that the second and the fourth test cases were pretty similar: the idea is to hover over a top nav item and then to click on a given sub-link. Although, I think it's not the best place where it (the approach) should be implemented, I still decided to use the data-driven approach to demonstate the ability of avoiding code duplication.

### Cy.wait
Why implicit `cy.wait()`. 

**TLDR**: some first clicks were lost on page load sometimes causing flakiness meaning the application is not ready to be interacted with. I admit that I could miss something but I couldn't find a better solution in the given time.

Using an implicit wait should be considered as a last resort solution as it demonstrates some problems either with the application or with the test itself.

I tried to rely on some API requests that the website makes on load, i.e. wait for their responses to give the app time to be ready but it didn't work. So I decided to use `cy.wait()` to make the test stable for the demo project. Also if the root cause is indeed in the app, we need to have access to the source code to understand the nature of flakiness.

In general, I usually try to use the workarounds described in these blog posts:
- https://glebbahmutov.com/blog/solve-the-first-click/
- https://glebbahmutov.com/blog/when-can-the-test-click/

But as the test is timeboxed, I decided to not spend too much time on it now. I think it's more valuable to demonstrate my way of thinking in such situations.

### Cy.step
I use the `cypress-plugin-steps` [plugin](https://github.com/filiphric/cypress-plugin-steps) to make the tests more readable both in code and in the Cypress UI.

It shows the current step description in the Cypress UI and if a test fails, it prepares a nice report with all the passed steps like this:
- Open the main page
- Click on the CTA button
- Boom
