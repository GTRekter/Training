describe('Browsing Homepage', () => {
    before(() => {
        // runs once before all tests in the block
    })

    beforeEach(() => {
        // runs before each test in the block
        cy.visit('http://localhost:3000')
    })

    afterEach(() => {
        // runs after each test in the block
    })

    after(() => {
        // runs once after all tests in the block
    })
    it('Browse page', () => {
        cy.visit('http://localhost:3000')
    })
    // it('displays two todo items by default', () => {
    //     cy.get('.todo-list li').should('have.length', 2)
    //     cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    //     cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
    // })
})