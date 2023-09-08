export default class MainPage {
    get installCypressButton() {
      return cy.get('astro-island > .border');
    }
}
