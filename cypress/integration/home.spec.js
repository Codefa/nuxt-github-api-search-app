describe('The Home Page', () => {
  it('should visit the home page', () => {
    cy.visit('/')
    cy.get("[data-test-app-title]").contains("Github Search App")
  })
})
