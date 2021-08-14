describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('allows a guest users to search for users', () => {
    cy.get('.v-tab').as('switchTabBtn')
    cy.get('@switchTabBtn').click({ multiple: true })

    cy.wait(700)

    cy.get('[data-test-search-input]')
      .type('codefa')
      .should('have.value', 'codefa')

    cy.get('[data-test-search-btn]').click()
  })
})
