## Description
This is a test project for the SDET position at Plotly. It contains several Cypress tests for the Cypress website. The tests can launched locally by cloning the project and following the instructions or directly from Github Actions.

## Getting started
### System requirements
https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements

Installation
```bash
npm install
```
Open Cypress in headed mode:

```bash
npm run cyopen
```

Run all Cypress tests in headless mode:
```bash
npm run test
```

## Run tests from GHA
In the job description, it's said that GHA experience is a plus. So I decided to add a workflow that triggers tests on each push to the main branch. It also possible to manually trigger the workflow from the [Actions tab](https://github.com/svidersky/plotly/actions/).
It's not a part of the assessment but I think it's a good thing to have.

### Selectors
According to [Cypress best practices](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements), we should use `data-* attributes` to select elements.
In my current projects, I add them myself and then use it in the tests that's why I didn't spend too much time trying to buld the best possible css selector.

### Cy.wait
Why `cy.wait()`. 

**TLDR**: some first clicks were lost on page load sometimes causing flakiness meaning the application is not ready to be interacted with. I admit that I could miss something but I couldn't find a better solution in the given time.

Using an implicit wait is considered as a last resort solution and it demonstrates some problems either with the application or with the test itself.

I tried to rely on some API requests, i.e. wait for their responses to give the app time to be ready but it didn't work. So I decided to use `cy.wait()` to make the test stable for the demo project.

I usually try to use the appoaches described in these blog posts:
https://glebbahmutov.com/blog/solve-the-first-click/
https://glebbahmutov.com/blog/when-can-the-test-click/

Also if the root cause is indeed in the app, we need to have access to the source code to understand the nature of flakiness.

But as the test is timeboxed, I decided to not spend too much time on it now. I think it's more valuable to demonstrate my way of thinking in such situations.

### Cy.step
I use the `cypress-plugin-steps` [plugin](https://github.com/filiphric/cypress-plugin-steps) to make the tests more readable both in code and in the Cypress UI.

It shows the current step description in the Cypress UI and if a test fails, it prepares a nice report with all the passed steps like this:
- Open the main page
- Click on the CTA button
- Boom
