describe('Adicionando um produto no carrinho',
  function () {

    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })

    it('Acessando o site da loja Colombo', function () {
      cy.visit('https://www.colombo.com.br')

      cy.intercept('GET', '**/pr**').as('getNotes')

      cy.get('[data-cy="inp-header-input"]')
        .should('be.visible')
        .type('sofá')

      cy.get('[data-cy="btn-header-search"]').click()

      cy.get('ul.product-list', { retries: 3 }).find('li:first-child').click()

      cy.wait('@getNotes')

      cy.get('.options-container').find('div:first-child', { retries: 3 }).click({ multiple: true, force: true })
      cy.get('button[type="button"]').contains('Comprar').click({ force: true })
      cy.contains('Sim, continuar').should('be.visible').click({ force: true })
    })
  })