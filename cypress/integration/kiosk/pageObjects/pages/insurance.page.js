/// <reference types="cypress" />
class InsurancePage{
    static titleOfInsurancePage=('[data-testid="card-title"]')
    static clickOnNoChangeNext(){
        const button=cy.get('.MuiButton-contained' ,{ timeout: Cypress.env('elementTimeout') })
        button.click()
        return this    }

}export default InsurancePage;