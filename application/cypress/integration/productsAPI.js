describe('Testing Product CRUD operations', () => {
    beforeEach(() => {
        // Browse to the products page before every step
        cy.visit('http://localhost:3000/products')
    })
    it('Adds a new product', () => {
        // Browse to add product form
        cy.get('nav a').eq(1).click()
        cy.get('.dropdown-menu.show a').eq(1).click()
        // Fill name input
        cy.get('input[name="name"]').type('Test 01').should('have.value', 'Test 01')
        // Fill price input
        // Cypress team is still working on the tab native event https://github.com/cypress-io/cypress/issues/311
        cy.get('input[name="price"]').type('abcd').should('have.value', '')
        cy.get('input[name="price"]').type('10').should('have.value', '10')
        cy.get('button[type=submit]').click()
        // Check that there are at least one element
        cy.get('nav a').eq(1).click()
        cy.get('.dropdown-menu.show a').eq(0).click()
        cy.get('table[data-element-id="products"] tbody tr').should('have.length', 1)
    })
    it('Delete a product', () => {
        cy.get('nav a').eq(1).click()
        cy.get('.dropdown-menu.show a').eq(0).click()
        cy.get('table[data-element-id="products"] tbody tr button').eq(0).contains('Delete').click()
        cy.get('table[data-element-id="products"] tbody tr').should('have.length', 0)
    })
})