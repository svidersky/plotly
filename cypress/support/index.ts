export {};

import './commands';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * @description Asserts that the text in the clipboard is equal to the expected text
       * @param {string} text The expected text in the clipboard
       * @example
        * cy.assertClipboardText('text');
        */
          assertClipboardText(text: string): Chainable<any>;
    }
  }
}
