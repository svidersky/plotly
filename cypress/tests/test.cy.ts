describe('Cypress Tests', () => {
  beforeEach(() => {
    // Define the aliases for the requests that we want to wait for
    cy.intercept('POST', '/cdn-cgi/rum?').as('rum');
    cy.intercept('POST', '**/graphql').as('graphql');

    cy.step('Open the main page');
    cy.visit('/');

    cy.step('Wait for the page to fully load');
    cy.wait(['@rum', '@graphql']);
    cy.wait(500); // this is explained in the Readme file
  })

  it('should show the Weekly downloads number', () => {
    cy.step('Scroll to the Loved by OSS section and check it is displayed');
    cy.contains('h2', 'Loved by OSS')
      .scrollIntoView()
      .should('be.visible');

    cy.step('The weekly downloads number should be displayed');
    const expectedDownloadsCount = '5.0M+';
    cy.get('div.grow:visible') // select only visible div elements with the class grow
      .contains('M+') // yeld the unique element that contains the text 'M+'
      .then(($el) => {
        cy.log($el.text()); // log the text of the element to Cypress command log
        expect($el.text()).to.equal(expectedDownloadsCount); // assert the text of the element (this is for demo purposes only as the number is changing and seems to be rendered on the server side)
    })
  })

  it('should open the About Us page from the top nav menu', () => {
    cy.step('Click on the About Cypress link in the top navigation bar');
    cy.get('button#dropdownCompany')
      .trigger('mouseover');
    cy.contains('a', 'About Cypress')
      .click();

    cy.step('The About Us page should be opened');
    cy.url().should('include', '/about-us');

    cy.step('The About Us page should contain some relevant text');
    cy.contains('h2#story','Our story').should('be.visible');
  })

  it('should open the Visual reviews page from the top nav menu', () => {
    cy.step('Click on the Visual Reviews link in the Product navigation menu');
    cy.get('button#dropdownProduct')
      .trigger('mouseover');
    cy.contains('a', 'Visual Reviews')
      .click();

    cy.step('The Visual Reviews page should be opened');
    cy.url().should('include', '/cloud/#visual_reviews');

    cy.step('The Visual Reviews page should contain some relevant text');
    cy.contains('h2','Review and debug failures visually')
      .should('be.visible');
  })

  it('should copy the npm installation command', () => {
    cy.get('astro-island > .border')
      .click();

    cy.step('The "Installing Cypress" modal should be opened');
    cy.get('div.pointer-events-auto')
      .should('be.visible');

    cy.step('Click on the "Install Cypress" button');
    cy.get('[data-cy="modal-install-copy"]')
      .should('be.enabled')
      .click();

    cy.step('The npm command should be copied to the clipboard');
    const expectedCommandText = 'npm install cypress --save-dev';
    cy.assertClipboardText(expectedCommandText);
  })
})
