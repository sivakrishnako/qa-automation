/// <reference types="cypress" />
class FormListPage {
    static getTitleOfPage=('[data-testid="card-title"]')
    static clickOnNoChangeNext(){
        const button=cy.get('[data-testid="forms-next-button"]')
        button.click()
        return this

    }


}export default FormListPage