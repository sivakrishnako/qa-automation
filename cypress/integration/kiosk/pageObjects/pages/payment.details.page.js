/// <reference types="cypress" />

import PaymentDetailPageData from '../../specs/ui/paymentdetails.testdata'

class PaymentPage {
  static titleOfPaymentDetails = '[data-testid="card-title"]'
  static getTextOfSkipPaymentInSpanish = '[data-testid="skip-payment"]'
  static getPaymentTitleInSpanish = '[data-testid="payment-title"]'
  static getOtherModesOfPaymentInSpanish = '[data-testid="other-modes"]'
  static checkboxForNewCreditDebitCard =
    '[data-testid="debit-credit-card"] > .MuiRadio-root > .PrivateSwitchBase-input'
  static checkBoxForNewElectronicCheck =
    '.MuiGrid-container > .MuiGrid-root > :nth-child(1) > [data-testid="electronic-check"] > .MuiRadio-root > .PrivateSwitchBase-input'
  static getNewCreditCardInSpanish = '[data-testid="new-cards"]'
  static getNewElectronicCheckInSpanish = '[data-testid="new-check"]'
  static getPayAtFrontDeskInSpanish = '[data-testid="pay-at-desk"]'
  static getPaymentReceiptInSpanish = '[data-testid="receipt"]'
  static getEditEmailInSpanish = '[data-testid="edit-email"]'
  static getPaymentInformationInSpanish = '[data-testid="payment-info"]'
  static getCopayInSpanish = '[data-testid="titleName"]'
  static getPaymentAmountInSpanish = '[data-testid="payment-amount-title"]'
  static getTotalDueInSpanish = 'data-testid="creditOrDebit"]'
  static getCopayOnlyInSpanish = '[data-testid="electronic-check"]'
  static getOtherInSpanish = '[data-testid="payAtDesk-check"]'
  static getMakePaymentInSpanish = '[data-testid="make-payment"]'
  static getEmailField = '[data-testid="email-field"]'
  static getPaymentInformation = '[data-testid="payment-info"]'

  static clickSkipPayment () {
    const btn = cy.get('[data-testid="skip-payment"]')

    btn.click({ force: true })
    return this
  }
  static clickOnMakePayment () {
    const btn = cy.get('[data-testid="make-payment"]')
    btn.click({ force: true })
    return this
  }
  static clickEditEmail () {
    const btn = cy.get('[data-testid="edit-email"]')
    btn.click({ force: true })
    return this
  }
  static clickDebitCreditCardOption () {
    const btn = cy.get('[data-testid="debit-credit-card"]')
    btn.click({ force: true })
    return this
  }
  static clickOnOtherForPaymentInsteadOfPayFullAmount () {
    const btn = cy.get('[data-testid="amount-payment"]', { timeout: 10000 })
    btn.click({ force: true })
    return this
  }
  static fillAmountByManually (value) {
    cy.get('[data-testid="amount-payment"]')
      .type(PaymentDetailPageData.minimumOtherAmountForCheckIn, {
        timeout: 20000
      })
      .should(PaymentDetailPageData.minimumOtherAmountForCheckIn)
    return this
  }

  static copayAmount () {
    return cy.get('[data-testid="payment-amount"]', { timeout: 10000 })

    //cy.get('[data-testid="payment-amount"]')
  }
  static totalDueAmount () {
    return cy.get('[data-testid="total-due-amount"]', { timeout: 10000 })
  }
  static getCardType = '.MuiGrid-grid-xs-8 > .MuiTypography-root'
  static getExpiryDate = '[data-testid="expiry-date"]'

  static clickOnEditEmailForPaymentReceipt () {
    const btn = cy.get('[data-testid="edit-email"]', { timeout: 10000 })
    btn.click({ force: true })
    return this
  }

  static fillEmailField (value) {
    const field = cy.get('[data-testid="email-field"]', { timeout: 10000 })
    //field.clear()
    field.type(value)
  }
  static clickOnDropDownOfExitKiosk () {
    const button = cy.get('[data-testid="KeyboardArrowDownIcon"]', {
      timeout: 10000
    })
    button.click({ force: true })
    return this
  }
  static clickOnExitKiosk () {
    const button = cy.get('[data-testid="LogoutIcon"]', {  timeout: Cypress.env('elementTimeout') })
    button.click({ force: true })
    return this
  }
}

export default PaymentPage
