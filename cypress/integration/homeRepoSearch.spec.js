describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('allows a guest users to search for repos', () => {
    cy.wait(700)
    cy.get('[data-test-search-input]')
      .type('vue-router')
      .should('have.value', 'vue-router')

    cy.get('[data-test-search-btn]').click()
  })
})
