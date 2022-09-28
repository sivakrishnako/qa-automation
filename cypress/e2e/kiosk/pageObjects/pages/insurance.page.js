/// <reference types="cypress" />
class InsurancePage{
    static titleOfInsurancePage=('[data-testid="card-title"]')
    static clickOnNoChangeNext(){
        const button=cy.get('.MuiButton-contained' ,{ timeout: Cypress.env('elementTimeout') })
        button.click()
        return this    
    }



    static titleOfInsurancePage=('[data-testid="card-title"]')
    static titleOfEditInsurancePageInSpanish=('[data-testid="card-title"]')
    static frontSideTitle = ('[data-testid="front-side-caption"]')
    static frontSideTitleInSpanish =('[data-testid="edit-frontside-caption"]')
    static backSideTitle = ('[data-testid="back-side-caption"]')
    static noImageToDisplayMessage = (':nth-child(1) > .section-frame > .placeholder-card > .MuiTypography-root')
    static backSideTitleInSpanish = ('[data-testid="back-side-caption"]')
    static editBackSideTitleInSpanish = ('[data-testid="edit-backside-caption"]')
    static editButtonInSpanish =('[data-testid="edit-insurance-button"]')
    static backButtonInSpanish =('[data-testid="back-button"]')
    static noChangeButtonInSpanish =('[data-testid="no-change-button"]')
    static reviewDemographicsInSpanish =('[data-testid="review_demographics"]')
    static communicationPreferenceInSpanish =('[data-testid="communication_preference"]')
    static saveButtonInSpanish = ('[data-testid="edit-insurance-save"]')
    static uploadCardNotificationInSpanish = ('[data-testid="upload-your-card-notification"]')
    static clickOnUploadBackCardJs= '#root > div > div > div.MuiGrid-root.MuiGrid-container.insurance-container.css-1d3bbye > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.edit-section.css-k4xiad > div:nth-child(2) > div > div > svg'
    static clickNoChangeNextBtnJs = '#root > div > div > div.footer-button.contentToLeft > button.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.alignment-button.css-1cgzx3o'
    static editInsuranceBtnJs = '#root > div > div > div.MuiGrid-root.MuiGrid-container.insurance-container.css-1d3bbye > div.MuiGrid-root.MuiGrid-container.MuiGrid-item.css-8x8291 > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-1.MuiGrid-grid-sm-4.MuiGrid-grid-md-4.css-blxz9b > div > button'
    static clickOnCancelBtnJs = '#root > div > div > div.MuiGrid-root.MuiGrid-container.insurance-container.css-1d3bbye > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.edit-section.css-k4xiad > div:nth-child(1) > div > svg > path'

    static clickNoChangeNextBtn() {
        const button=cy.get('.MuiButton-contained' ,{ timeout: Cypress.env('elementTimeout') })
        button.click()
        return this    
    }
    static clickSnapshot() {
        const button=cy.get('.camera-button-box > .MuiButton-root',{ timeout: Cypress.env('elementTimeout') })
        button.click()
        return this    
    }
    static clickOnUploadSnapshot() {
        const button=cy.get('.camera-button-box > .MuiButton-contained',{ timeout: Cypress.env('elementTimeout') })
        button.click()
        return this    
    }
    static clickOnSaveButton() {
        const button=cy.get('[data-testid="edit-insurance-save"]' ,{ timeout: Cypress.env('elementTimeout') })
        button.click()
        return this    
    }
    static clickOnUploadFrontCard() {
        const button = cy.get('[data-testid="CameraAltOutlinedIcon"]');
        button.click();
        return this;
    }
    static clickOnHamburgerMenu() {
        const button = cy.get('[data-testid="hamburgerMenuIcon"]');
        button.click();
        return this;
    }
    static clickOnCancelBtnFrontCard() {
        const button = cy.get('[data-testid="front-card-delete-icon"]');
        button.click();
        return this;
    }
    static clickOnCancelBtnBackCard() {
        const button = cy.get('[data-testid="back-card-delete-icon"]');
        button.click();
        return this;
    }

        static clickEditInsuranceBtn() {
            const button = cy.get('[data-testid="edit-insurance-button"]');
            button.click();
            return this;
        

        }
        static clickOnSaveButton() { 
            const button=cy.get('[data-testid="edit-insurance-save"]' ,{ timeout: Cypress.env('elementTimeout') })
            button.click()
            return this    
        }
        static clickOnUploadBackCard() { 
            const button = cy.get('[data-testid="edit-backCamera-icon"]'); 
            button.click();
            return this;
        }

        static clickOnUploadSnapshot() { 
            const button=cy.get('.camera-button-box > .MuiButton-contained',{ timeout: Cypress.env('elementTimeout') })
            button.click()
            return this    
        }

        static clickOnUploadSnapshot() { 
            const button=cy.get('.camera-button-box > .MuiButton-contained',{ timeout: Cypress.env('elementTimeout') })
            button.click()
            return this    
        }


        static clickOnSaveButton() { 
            const button=cy.get('[data-testid="edit-insurance-save"]' ,{ timeout: Cypress.env('elementTimeout') })
            button.click()
            return this    
        }


}export default InsurancePage;