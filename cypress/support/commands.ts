Cypress.Commands.add('assertClipboardText', expectedText => {
    cy.window().then(win => {
      win.navigator.clipboard.readText().then(text => {
        expect(text).to.equal(expectedText);
      })
    })
})
