/// <reference types="cypress" />

import AppointmentData from '../../specs/ui/appointment.detailspage.testdata';
import WelcomePage from '../../pageObjects/pages/welcome.page'

class CheckInPage {
    static checkInTitle=('[data-testid="checkInTitle"]')
    
    
    static clickSpanishToggleOfCheckInPage() {
        const button = cy.get('[data-testid="es"]');
        button.click();
        return this;
    }
    static convertToggleEnglishToSpanish() {
        this.defaultToggleOfCheckInPage().should('have.text', 'English').and('have.class', 'active');
        this.clickSpanishToggleOfCheckInPage();
        return this;

    }
    static defaultToggleOfCheckInPage() {
        return cy.get('[data-testid="en"]');
    }
    static clickGuardianListContinueBtn() {
        const button = cy.get('[data-testid="guardianListContinue"]');
        button.click();
        return this;
    }
    static clickPatientBtn() {
        const button = cy.get('[data-testid="patient"]');
        button.click();
        return this;
    }

    static clickGuardianBtn() {
        const button = cy.get('[data-testid="parent"]')
        button.click();
        return this;
    }


    static patient() {
        return cy.get('[data-testid="patient"]');


    }
    static authorized() {
        return cy.get('[data-testid="parent"]');

    }
    static noneOfTheAbove() {
        return cy.get('[data-testid="none"] ')

    }
    static clickNoneOfTheAbove() {
        const button = cy.get('[data-testid="none"] ');
        button.click();
        return this;
    }
    static getPopupMsgOfNoneOfTheAbove() {
        return cy.get('[data-testid="modal-text"]');
    }
    static clickOptFromParent() {

        const btn = cy.contains(AppointmentData.optionFromAuthorizedParent)
        btn.click();
        return this;
    }
      static clickOnDropDown() {
        const button = cy.get('[data-testid="KeyboardArrowDownIcon"]',{ timeout: Cypress.env('elementTimeout')   });
        button.click(); 
        return this;
    }
    static clickOnExitKioskBtn() {
        this.clickOnDropDown()
        const button = cy.get('[data-testid="exit-kiosk"]',{ timeout: Cypress.env('elementTimeout') });
        
        button.click();
        return this;
    }
  
 static clickOkBtnPopupOfNoneOfTheAbove() {
        const button = cy.get('[data-testid="noneOfAboveOk"]')
        button.click();
        return this;
    }

    static clickOnExitBtn() {
        const button = cy.get('[data-testid="exitKiosk"]',{ timeout: Cypress.env('elementTimeout')  });
        button.click();
        cy.verifyPage(
            WelcomePage.titleWelcomePage,
            WelcomePage.expTitleWelcomePage,
            WelcomePage.logInPageUrl
          )
        return this;
    }
}
export default CheckInPage;

