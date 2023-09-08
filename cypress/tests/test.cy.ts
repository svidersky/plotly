import MainPage from '../page-objects/main-page';
import InstallCypressDialogue from '../page-objects/installCypressDialogue';

const mainPage = new MainPage();
const installCypressDialogue = new InstallCypressDialogue();

describe('Cypress Tests', () => {
  beforeEach(() => {
    // Define the aliases for the requests that we want to wait for
    cy.intercept('POST', '/cdn-cgi/rum?').as('rum');
    cy.intercept('POST', '**/graphql').as('graphql');

    cy.step('Open the main page');
    cy.visit('/');

    cy.step('Wait for the page to fully load');
    cy.wait(['@rum', '@graphql']);
    cy.wait(500); // this implicit waiting is explained in the Readme file
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

  const pages = [
    { name: 'About Us', linkText: 'About Cypress', url: '/about-us', keywords: 'Our story', navItem: 'Company' },
    { name: 'Visual Reviews', linkText: 'Visual Reviews', url: '/cloud/#visual_reviews', keywords: 'Review and debug failures visually', navItem: 'Product' }
  ];

  pages.forEach((page) => { // the given data driven approach is explained in the Readme file
    it(`should open the ${page.name} page from the top nav menu`, () => {
      cy.step(`Click on the ${page.linkText} link in the top navigation bar`);
      cy.get(`button#dropdown${page.navItem}`)
        .trigger('mouseover');
      cy.contains('a', `${page.linkText}`)
        .click();

      cy.step(`The ${page.name} page should be opened`);
      cy.url().should('include', `${page.url}`);

      cy.step(`The ${page.name} page should contain some relevant text`);
      cy.contains('h2', `${page.keywords}`).should('be.visible');
    })
  });

  it('should copy the npm installation command', () => {
    mainPage.installCypressButton // Page Object is used in one test and it is explained in the Readme file
      .click();

    cy.step('The "Installing Cypress" modal should be opened');
    installCypressDialogue.modal
      .should('be.visible');

    cy.step('Click on the "Install Cypress" button');
    installCypressDialogue.copyButton
      .should('be.enabled')
      .click();

    cy.step('The npm command should be copied to the clipboard');
    const expectedCommandText = 'npm install cypress --save-dev';
    cy.assertClipboardText(expectedCommandText);
  })

  it('should see circle icon around "Test Analytics"', () => {
    cy.step('Hover over the "Product" dropdown menu and click on "Smart Orchestration" link');
    cy.get(`button#dropdownProduct`)
      .trigger('mouseover');
    cy.contains('a', 'Smart Orchestration')
      .click();

    cy.step('The circle icon around the "Test Analytics" should be displayed');
    cy.contains('p', 'Test Analytics')
      .scrollIntoView()
      .find('svg')
      .should('be.visible');
  })
})
