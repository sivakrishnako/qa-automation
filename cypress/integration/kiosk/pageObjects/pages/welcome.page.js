/// <reference types="cypress" />

import PatientData from '../../specs/ui/patient.checkin.testdata'


class WelcomePage {
  static launchApp (strLocation) {
    cy.visit(Cypress.env('kioskURL') + strLocation)
  }

  static expTitleWelcomePage  = "Self Check-In Kiosk" 
  static logInPageUrl = 'https://org1-kiosk.raintreeinc.com/'

  static titleWelcomePage () {
    return cy.get('[data-testid="self-check-in-kiosk"]', {
      timeout: Cypress.env('elementTimeout')
    })
  }
  static clinicImage () {
    return cy.get('.login-image', { timeout: Cypress.env('elementTimeout') })
  }
  static clinicLogo () {
    return cy.get('[data-testid="clinic-logo"]', {
      timeout: Cypress.env('elementTimeout')
    })
  }
  static defaultToggle () {
    return cy.get('[data-testid="en"]', {
      timeout: Cypress.env('elementTimeout')
    })
  }
  static clickSpanishToggle () {
    const button = cy.get('[data-testid="es"]').should('exist')
    button.click()
    return this
  }

  static clickHelpButtonOfWelcomePage () {
    const button = cy.get('[data-testid="HelpOutlineIcon"]', {
      timeout: Cypress.env('elementTimeout')
    })
    button.click()
    return this
  }
  static fillLastName (value) {
    this.clickResetBtn()
    const field = cy.get('[data-testid="patientLastName"]', {
      timeout: Cypress.env('elementTimeout')
    })
    field.type(value)
    return this
  }
  static fillPatientDoB (dateOfBirth) {
    const field = cy.get('[data-testid="dateOfBirth"]', {
      timeout: Cypress.env('elementTimeout')
    })
    field.clear()
    field.type(dateOfBirth)
    return this
  }

  static clickStartCheckInBtn () {
    const button = cy.get('[data-testid="startCheckIn"]', {
      timeout: Cypress.env('elementTimeout')
    })
    button.click({ force: true })
    return this
  }

  static clickResetBtn () {
    const button = cy.get('[data-testid="resetButton"]').should('be.enabled')
    button.click()

    return this
  }

  static getPopupMsgOfHelpButton () {
    cy.contains(PatientData.helpButtonPopupMsg)
  }

  static clickPopupBtnOk () {
    const button = cy.get('[data-testid="helpModalOk"]')
    button.click()
    return this
  }

  static clickExistKioskBtn () {
    const button = cy.get('[data-testid="exitKiosk"]', {
      timeout: Cypress.env('elementTimeout')
    })
    button.click()
    return this
  }
  static popupMsgForInvalidCredentials () {
    return cy.get('[data-testid="modal-text"]', {
      timeout: Cypress.env('elementTimeout')
    })
  }

  static popupBtnOkMsg () {
    return cy.get('[data-testid="checkInTitle"]', {
      timeout: Cypress.env('elementTimeout')
    })
  }
  static welcomeInSpanish () {
    return cy.get('[data-testid="welcome-heading"]')
  }
  static getPopupForBlankCredentials () {
    return cy.get('[data-testid="modal-text"]')
  }

  static clickPopupButtonOkErrorMsg () {
    const button = cy.get('[data-testid="loginErrorOk"]', {
      timeout: Cypress.env('elementTimeout')
    })
    button.click()

    return this
  }

  static startCheckIn (lastName, dateOfBirth, strLoginCase) {

    let errMessageXMinutes =
    'Please come back no more than 62 minutes before your appointment to check in.'
  let errMessageFrontDesk = 'Please check in at the front desk.'


    this.fillLastName(lastName)
    this.fillPatientDoB(dateOfBirth)
    cy.wait(Cypress.env('myWait'))
    

    switch (strLoginCase) {
      case 'X minutes':
      this.clickStartCheckInBtn()
        cy.get('[data-testid="modal-text"]').should('be.visible')
        cy.log('In X minutes')
        this.popupMsgForInvalidCredentials().contains(errMessageXMinutes)
        cy.get('[data-testid="loginErrorOk"]', {
          timeout: Cypress.env('elementTimeout')
        }).click()
        break;

      case 'Front Desk Message':
        cy.get('[data-testid="modal-text"]').should('be.visible')
        cy.log('In Front Desk Message')
        this.popupMsgForInvalidCredentials().contains(errMessageFrontDesk)
        cy.get('[data-testid="loginErrorOk"]', {
          timeout: Cypress.env('elementTimeout')
        }).click()
        this.clickStartCheckInBtn()
        break;

      default:
         this.clickStartCheckInBtn()

    }
  }

  static convertToggleEnglishToSpanish () {
    this.defaultToggle()
      .should('have.text', 'English')
      .and('have.class', 'active')
    this.clickSpanishToggle()
  }


  static InvalidCheckIn (LastName, dateOfBirth, errorMessage) {
    this.fillLastName(LastName)
    this.fillPatientDoB(dateOfBirth)
    this.clickStartCheckInBtn()
    this.popupMsgForInvalidCredentials().contains(errorMessage)
    this.clickPopupButtonOkErrorMsg()
  }

  static generateRandomText (strLength) {
    let result = ''
    let characters = 'abcdefghijklmnopqrstuvwxyz'

    for (let i = 0; i < strLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
}
export default WelcomePage
