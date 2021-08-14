describe('The Favorites Page', () => {
  it('should visit the favorites page as a guest and redirect to home', () => {
    cy.visit('/favorites')
  })
})
