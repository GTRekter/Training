describe('Browsing Homepage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/products')
    })
    it('Adds a new products', () => {
        const input = "Learn about cypress"
        cy.get('.form-control')
          .type(input)
          .type('{enter}')
          .get('li')
          .should('have.length', 3)
    })
    // it('displays two todo items by default', () => {
    //     cy.get('.todo-list li').should('have.length', 2)
    //     cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    //     cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
    // })
})