import products from '../fixtures/products.json'
describe('Testing Product CRUD operations', () => {
    // before(() => {
    //     // Read mock products only once
    //     cy.fixture('products').then((json) => {
    //         cy.intercept('GET', '**/Product/GetAllProducts', request => { request.reply(json.products) })
    //     })
    // })
    beforeEach(() => {
        cy.fixture('products').then((json) => {
            cy.intercept('GET', '**/Product/GetAllProducts', request => { request.reply(json.products) })
        })
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
        // Intercept post
        cy.intercept('POST', '**/Product/AddProduct', request => {
            expect(request).property('body').to.have.property('name', 'Test 01')
            expect(request).property('body').to.have.property('price', '10')
            request.reply()
        })
        cy.get('button[type=submit]').click()
    })
    it('Delete a product', () => {
        cy.get('table[data-element-id="products"] tbody tr button').eq(0).contains('Delete').click()
        cy.intercept('POST', '**/Product/DeleteProductById', request => {
            console.log(request)
            expect(request).property('body').to.have.property('id', 0)
            request.reply({ statusCode: 200 })
        })
        cy.get('table[data-element-id="products"] tbody tr').should('have.length', 2)
    })
})