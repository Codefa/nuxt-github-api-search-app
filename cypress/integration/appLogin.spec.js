describe('The Home Page', () => {
  it('should visit the home page and login', () => {
    cy.visit('/')
    cy.get("[data-test-app-login]").click()
  })
})
