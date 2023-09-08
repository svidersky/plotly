export default class InstallCypressDialogue {
    get modal() {
      return cy.get('div.pointer-events-auto');
    }
    get copyButton() {
        return cy.get('[data-cy="modal-install-copy"]')
    };
}
