// status_page_spec.js
/* global cy */

describe('Status Page', () => {
  it('loads successfully', () => {
    cy.visit('/');
    cy.contains('FactoryFour API Status');
    cy.contains('Loading...').should('not.exist');
  });

  it('toggles dark mode', () => {
    cy.visit('/');
    cy.contains('Switch to Dark Mode').click();
    cy.get('body').should('have.class', 'dark-mode');
    cy.contains('Switch to Light Mode').click();
    cy.get('body').should('not.have.class', 'dark-mode');
  });
});
