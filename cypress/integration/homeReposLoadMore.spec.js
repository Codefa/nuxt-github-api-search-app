describe('The Home Page', () => {
  it('should visit the home page and scroll down to load more button', () => {
    cy.visit('/')
    cy.wait(700)
    cy.scrollTo(0, 500)
    cy.wait(700)
    cy.get("[data-test-repos-loadmore-btn]").click()
  })
})
