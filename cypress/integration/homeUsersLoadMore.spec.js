describe('The Home Page', () => {
  it('should visit the home page, select users tab and scroll down to load more button', () => {
    cy.visit('/')
    cy.wait(700)
    cy.get('.v-tab').as('switchTabBtn')
    cy.get('@switchTabBtn').click({ multiple: true })
    cy.wait(700)
    cy.scrollTo(0, 500)
    cy.wait(700)
    cy.get('[data-test-users-loadmore-btn]').click()
  })
})
