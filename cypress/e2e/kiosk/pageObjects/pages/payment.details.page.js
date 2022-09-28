/// <reference types="cypress" />

import PaymentDetailPageData from "../../specs/ui/paymentDetails.TestData";

class PaymentPage {
  static titleOfPaymentDetails = '[data-testid="card-title"]';
  static getTextOfSkipPaymentInSpanish = '[data-testid="skip-payment"]';
  static getPaymentTitleInSpanish = '[data-testid="payment-title"]';
  static getOtherModesOfPaymentInSpanish = '[data-testid="other-modes"]';
  static checkboxForNewCreditDebitCard =
    '[data-testid="debit-credit-card"] > .MuiRadio-root > .PrivateSwitchBase-input';
  static checkBoxForNewElectronicCheck =
    '.MuiGrid-container > .MuiGrid-root > :nth-child(1) > [data-testid="electronic-check"] > .MuiRadio-root > .PrivateSwitchBase-input';
  static getNewCreditCardInSpanish = '[data-testid="new-cards"]';
  static getNewElectronicCheckInSpanish = '[data-testid="new-check"]';
  static getPayAtFrontDeskInSpanish = '[data-testid="pay-at-desk"]';
  static getPaymentReceiptInSpanish = '[data-testid="receipt"]';
  static getEditEmailInSpanish = '[data-testid="edit-email"]';
  static getPaymentInformationInSpanish = '[data-testid="payment-info"]';
  static getCopayInSpanish = '[data-testid="titleName"]';
  static getPaymentAmountInSpanish = '[data-testid="payment-amount-title"]';
  static getTotalDueInSpanish = 'data-testid="creditOrDebit"]';
  static getCopayOnlyInSpanish = '[data-testid="electronic-check"]';
  static getOtherInSpanish = '[data-testid="payAtDesk-check"]';
  static getMakePaymentInSpanish = '[data-testid="make-payment"]';
  static getEmailField = '[data-testid="email-field"]';
  static getPaymentInformation = '[data-testid="payment-info"]';
  static getExpiryDateOfCard = '[data-testid="expiry-date"]';
  static nameOnSavedCard = '[data-testid="name-of-card"]';
  static getPopUpForSkipPaymentInSpanish = '[data-testid="modal-text"]';

  static clickPayAtFrontDesk() {
    const button = cy.get('[data-testid="pay-desk"]');
    button.click({ force: true });
    return this;
  }
  static accessThirdPartyURL() {
    cy.origin("https://stagepremier.trustcommerce.com", () => {
      cy.visit(
        "https://stagepremier.trustcommerce.com/trustcommerce_payment/index.php?hide_ticket=y&hide_bottomlogo=y&cvc_help=y&aggregators=LG5DUV&verify=y&response_url=https%3A%2F%2Fkiosk.raintreeinc.com%2Fdat%2Fsphere&is_redirect=y&ticketno=968ZXGF7YZ4&hide_trxoperator=y&newpayment_accordion=Add+Credit+Card+details&storeforlateruse_label=Add+Credit+Card+on+file&billingaddress1_label=Address&billingcity_label=City&billingstate_label=State&billingzip_label=Zip+Code&email_address=Diazfrank%40gmail.com&trxcustomfield%5B1%5D=000003561&trxcustomfield%5B2%5D=WEBAP&trxcustomfield%5B3%5D=K&trxcustomfield%5B4%5D=ZZPOC&trxcustid=1295305&trxcustid_licensekey=8mv7riRX9p7hbwCrJNgk5H8wo3PNCcnYn292qUJSDh5T6jIAxRuwKC1h9VXUTqwQ&amount=20.00"
      );
      cy.get("[name='CreditCard[name]']").type("rema");
      cy.get("[name='CreditCard[cardNumber]']").type("4737256914017066");
      cy.get("[name='CreditCard[expDate]']").type("0924");
      cy.get("[name='CreditCard[cvc]']").type("567");
      cy.get("[name='cardPay']").click();
    });
  }
  static savedCardImage() {
    cy.get('[data-testid="save-card"]', {
      timeout: Cypress.env("elementTimeout"),
    });
  }
  static nameOnSavedCard = '[data-testid="name-of-card"]';
  static clickSkipPayment() {
    const btn = cy.get('[data-testid="skip-payment"]');

    btn.click({ force: true });
    return this;
  }
  static clickOnMakePayment() {
    const button = cy
      .get('[data-testid="make-payment"]')
      .invoke("removeAttr", "target");
    button.click({ force: true });
    return this;
  }
  static clickEditEmail() {
    const btn = cy.get('[data-testid="edit-email"]');
    btn.click({ force: true });
    return this;
  }
  static clickDebitCreditCardOption() {
    const btn = cy.get('[data-testid="debit-credit-card"]');
    btn.click({ force: true });
    return this;
  }
  static clickOnOtherForPaymentInsteadOfPayFullAmount() {
    const btn = cy.get('[data-testid="amount-payment"]');
    btn.click({ force: true });
    return this;
  }
  static fillAmountByManually() {
    cy.get('[data-testid="amount-payment"]').type(
      PaymentDetailPageData.minimumOtherAmountForCheckIn,
      { timeout: Cypress.env("elementTimeout") }
    );
    cy.get("body").click(50, 50, { force: true });
  }
  static verifyAmount() {
    cy.get('[data-testid="total-amount"]')
      .invoke("text")
      .then((val1) => {
        cy.get('[data-testid="amount-payment"]')
          .invoke("text")
          .then((val2) => {
            assert(val1 > val2);
          });
      });
    return this;
  }
  static totalDueAmount() {
    cy.get('[data-testid="total-due-amount"]', {
      timeout: Cypress.env("elementTimeout"),
    })
      .invoke("text")
      .then((val1) => {
        cy.get('[data-testid="payment-balance-amount"]')
          .invoke("text")
          .then((val2) => {
            assert(val1 > val2);
          });
      });
    return this;
  }
  static getCardType = ".MuiGrid-grid-xs-8 > .MuiTypography-root";
  static getExpiryDate = '[data-testid="expiry-date"]';
  static clickOnEditEmailForPaymentReceipt() {
    const btn = cy.get('[data-testid="edit-email"]', { timeout: 10000 });
    btn.click({ force: true });
    return this;
  }
  static clickOnEmailFieldToClear() {
    const button = cy.get('[data-testid="email-field"]', { timeout: 10000 });
    button.click().clear();
  }
  static fillEmailField(value) {
    const field = cy.get('[data-testid="email-field"]', { timeout: 10000 });
    field.type(value);
  }
  static clickOnDropDownOfExitKiosk() {
    const button = cy.get('[data-testid="KeyboardArrowDownIcon"]', {
      timeout: 10000,
    });
    button.click({ force: true });
    return this;
  }
  static clickOnExitKiosk() {
    const button = cy.get('[data-testid="LogoutIcon"]', { timeout: 10000 });
    button.click({ force: true });
    return this;
  }
  static clickOnContinueForPayAtFrontDesk() {
    const button = cy.get('[data-testid="see-the-front-desk"]');
    button.click({ force: true });
    return this;
  }
  static paymentPageYesToggleForFutureUse() {
    return cy.get('[data-testid="contact-checkInyes"]');
  }
  static paymentPageNoToggleForFutureUse() {
    return cy.get('[data-testid="contact-checkInno"]');
  }
  static textWhenCardsAreNotAvailable =
    ".css-v3z1wi > .MuiGrid-grid-sm-12 > .MuiGrid-item";
}

export default PaymentPage;
