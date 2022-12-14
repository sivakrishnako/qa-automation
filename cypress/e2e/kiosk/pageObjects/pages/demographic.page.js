/// <reference types="cypress" />

import ReviewDemographicsPageData from "../../specs/ui/review.demographicsPage.TestData";
import PatientData from "../../specs/ui/patient.checkIn.TestData";

class DemographicPage {
  static titleReviewDemographic = '[data-testid="card-title"]';
  static titleEditDemographic = '[data-testid="card-title"]';
  static saveDemographicsButton = '.button-box > [data-testid="submit"]';
  static getTitleOfPatientInformation =
    '[data-testid="patient-information-title"]';
  static getNameInSpanish = '[data-testid="patient-name-label"]';
  static getDobINSpanish = '[data-testid="patient-DOB-label"]';
  static getAgeInSpanish = '[data-testid="patient-age-label"]';
  static getPatientGenderInSpanish = '[data-testid="patient-gender-label"]';
  static getPatientSocialSecurityInSpanish =
    '[data-testid="patient-social-security-label"]';
  static getPatientEmailIdInSpanish = '[data-testid="patient-email-label"]';
  static getTitleOfContactDetailsInSpanish =
    '[data-testid="contact-details-title"]';
  static getContactTypeInSpanish = '[data-testid="contact-phone-type-label"]';
  static getCommunicationPreferenceInSpanish =
    '[data-testid="communication-preferences-title"]';
  static getEditTextInSpanish = '[data-testid="edit-button"]';
  static getYesTextInSpanish = '[data-testid="undefinedyes"]';
  static getCommunicateElectronicallyInSpanish =
    '[data-testid="communicate-electronically"]';
  static getMailingAddressTextInSpanish =
    '[data-testid="mailing-address-title"]';
  static getCellTextInSpanish = '[data-testid="Cell"]';
  static getErrorMessageForWrongDob =
    ":nth-child(5) > .full-width > .error-message";
  static getNoChangeNextTextInSpanish = '[data-testid="no-change"]';
  static demographicPagePatientDob = '[data-testid="patient-DOB"]';
  static demographicPagePatientGender = '[data-testid="patient-gender"]';
  static demographicsPageFirstName = ' [data-testid="patient-name"]';
  static clickOnFirstNameWithJS =
    'document.querySelector("#patientInfo-firstname")';
  static getNameInEnglish = '[data-testid="patient-name-label"]';
  static getDobINEnglish = '[data-testid="patient-DOB-label"]';
  static getAgeInEnglish = '[data-testid="patient-age-label"]';
  static getPatientGenderInEnglish = '[data-testid="patient-gender-label"]';
  static getPatientSocialSecurityInEnglish =
    '[data-testid="patient-social-security-label"]';
  static getPatientEmailIdInEnglish = '[data-testid="patient-email-label"]';
  static getMailingAddressTextInEnglish =
    '[data-testid="mailing-address-title"]';
  static getMailingAddressAddressInEnglish =
    '[data-testid="mailing-address-label"]';
  static getMailingAddressCityInEnglish = '[data-testid="mailing-city-label"]';
  static getMailingAddressStateInEnglish =
    '[data-testid="mailing-state-label"]';
  static getMailingAddressZipInEnglish = '[data-testid="mailing-zip-label"]';
  static getPhysicalAddressTextInEnglish =
    '[data-testid="physical-address-title"]';
  static getPhysicalAddressAddressInEnglish =
    '[data-testid="physical-address-label"]';
  static getPhysicalAddressCityInEnglish =
    '[data-testid="physical-city-label"]';
  static getPhysicalAddressStateInEnglish =
    '[data-testid="physical-state-label"]';
  static getPhysicalAddressZipInEnglish = '[data-testid="physical-zip-label"]';
  static getEmergencyContactTextInEnglish =
    '[data-testid="emergency-contact-title"]';
  static getEmergencyContactTypeInEnglish =
    '[data-testid="emergency-contact-type-0-label"]';
  static getEmergencyContactNameInEnglish =
    '[data-testid="emergency-name-0-label"]';
  static getEmergencyContactPhoneTypeInEnglish =
    '[data-testid="emergency-phone-type-0-label"]';
  static getEmergencyContactPhoneNumberInEnglish =
    '[data-testid="emergency-phone-number-0-label"]';
  static clickPopupButtonOkMsgDemo() {
    const button = cy.get('[data-testid="linkSentOk"]');
    button.click();
    return this;
  }
  static fillMiddleName() {
    cy.get('[data-testid="patientInfo-middlename"]')
      .clear()
      .type("Automation", { timeout: Cypress.env("elementTimeout") })
      .should("have.value", "Automation");
    return this;
  }
  static helpButtonOfDemographicPage() {
    return cy.get('[data-testid="HelpOutlineIcon"]');
  }

  static errorMessageEmail() {
    return cy.get('[data-testid="patientInfo-email-error"]');
  }
  static clickNoChangeNextBtn() {
    const button = cy.get('[data-testid="no-change"]');
    button.click();
    return this;
  }
  static clickEditButton() {
    const button = cy.get('[data-testid="edit-button"]');
    button.click();
    return this;
  }
  static clickOnCancelButton() {
    const button = cy.get('[data-testid="reset"]');
    button.click();
    return this;
  }
  static editCommunicationBtn() {
    const button = cy.get('[data-testid="communication"]');
    button.click();
    return this;
  }
  static getFillHomePhoneNum(index) {
    const strFillHomePhoneNum =
      '[data-testid="contactDetails[' + index + ']-phoneNumber"]';
    cy.log(strFillHomePhoneNum);
    return cy.get(strFillHomePhoneNum);
  }
  static getFillCellPhoneNumber(index) {
    const strFillCellPhoneNumber =
      '[data-testid="contactDetails[' + index + ']-phoneNumber"]';
    cy.log(strFillCellPhoneNumber);
    return cy.get(strFillCellPhoneNumber);
  }
  static editTypesOfPhoneNumber(index) {
    cy.log("loop" + index);
    if (index === 0) {
      this.getFillHomePhoneNum(index)
        .type(ReviewDemographicsPageData.homePhoneNumber, {
          timeout: Cypress.env("elementTimeout"),
        })
        .should("have.value", ReviewDemographicsPageData.homePhoneNumber);
    } else {
      this.getFillCellPhoneNumber(index)
        .type(ReviewDemographicsPageData.cellPhoneNumber, {
          timeout: Cypress.env("elementTimeout"),
        })
        .should("have.value", ReviewDemographicsPageData.cellPhoneNumber);
    }
  }
  clickOptionFromEmergencyPhoneType() {
    const button = cy.get('[data-value="Home"]');
    button.click({ force: true });
    return this;
  }
  static fillInvalidFirstName(value) {
    cy.get("#patientInfo-firstname")
      .clear()
      .type(" ", { timeout: Cypress.env("elementTimeout") })
      .should("have.value", "");
    return this;
  }
  static fillFutureDOB(value) {
    cy
      .get('[data-testid="patientInfo-dateOfBirth"]')
      .click()
      .clear()
      .type(PatientData.invalidDOBFutureDate),
      { timeout: Cypress.env("elementTimeout") };
    return this;
  }
  static fillNotRealDOB(value) {
    cy
      .get('[data-testid="patientInfo-dateOfBirth"]')
      .click()
      .clear()
      .type(PatientData.invalidDOBRealDate),
      { timeout: Cypress.env("elementTimeout") };
    return this;
  }
  static fillDoesNotHaveEnoughDigitDob() {
    cy
      .get('[data-testid="patientInfo-dateOfBirth"]')
      .click()
      .clear()
      .type(PatientData.invalidDOBMissingDigits),
      { timeout: Cypress.env("elementTimeout") };
    return this;
  }
  static fillInvalidFormatDob(value) {
    cy
      .get('[data-testid="patientInfo-dateOfBirth"]')
      .click()
      .clear()
      .type(PatientData.invalidFormatDOB),
      { timeout: Cypress.env("elementTimeout") };
    return this;
  }
  static fillEmailAddress(value) {
    cy.get('[data-testid="patientInfo-email"]')
      .type(ReviewDemographicsPageData.invalidEmailAddress, {
        timeout: Cypress.env("elementTimeout"),
      })
      .should("have.value", ReviewDemographicsPageData.invalidEmailAddress);
    return this;
  }
  static fillMailingAddress(value) {
    cy.get('[data-testid="mailing-address"]')
      .clear()
      .type(ReviewDemographicsPageData.addMailAddress, {
        timeout: Cypress.env("elementTimeout"),
      })
      .should("have.value", ReviewDemographicsPageData.addMailAddress);
    return this;
  }
  static clickSaveDemographicsBtn() {
    if (
      cy
        .get('[data-testid="submit"]', {
          timeout: Cypress.env("elementTimeout"),
        })
        .should("be.visible")
    ) {
      cy.get('[data-testid="submit"]').click({ force: true });
    } else {
      cy.wait(Cypress.env("myWait"));
      cy.get('[data-testid="submit"]').click();
    }
    return this;
  }
  static clickOnEmergencyContactType() {
    const button = cy.get('[data-testid="emergencyContacts[0]-contactType"]', {
      timeout: Cypress.env("elementTimeout"),
    });
    button.click();
    return this;
  }
  static errorIconField() {
    return cy.get('[data-testid="ErrorIcon"]');
  }
  static getFirstName = '[data-testid="patient-name"]';
  static getMailingAddress = '[data-testid="mailing-address"]';
  static getHomePhoneNumber = '[data-testid="contactDetails[0]-phoneNumber"]';
  static getCellPhoneNumber = '[data-testid="contact-phone-number-2"]';
  static getWorkPhoneNumber = '[data-testid="contact-phone-number-1"]';
  static getLastNameOfEmergencyContactDetails =
    '[data-testid="emergency-name-0"]';
  static fillLastNameOfEmergencyContactDetails(value) {
    cy.get('[name="data.emergencyContacts[0].lastname"]').clear();
    return this;
  }
  static clickOptionFromEmergencyContactType() {
    const button = cy.get('[data-value="DAUGH"]', {
      timeout: Cypress.env("elementTimeout"),
    });
    button.click();
    return this;
  }
  static clickEmergencyContactPhoneType() {
    const button = cy.get('[data-testid="emergencyContacts[0]-phoneType"]', {
      timeout: Cypress.env("elementTimeout"),
    });
    button.click();
    return this;
  }
  static fillEmergencyContactPhoneNumber(value) {
    const field = cy
      .get('[data-testid="emergencyContacts[0]-phoneNumber"]')
      .clear()
      .type("");

    field.type(value);
    return this;
  }
  static clickOptionFromEmergencyPhoneType() {
    const button = cy.get('[data-value="Home"]');
    button.click({ force: true });
    return this;
  }
  static clickOnZipField() {
    const button = cy.get('[data-testid="physicalAddress-zip"]', {
      timeout: Cypress.env("elementTimeout"),
    });
    button.click();
    return this;
  }
  static clickOnBirthSexDropDown() {
    const button = cy.get('[data-testid="birth-sex"]');
    button.click();
    return this;
  }
  static verifyDropdownOption() {
    cy.get("li")
      .invoke("text")
      .should("eq", "YesNoReview DemographicsMaleFemaleUnknown");
  }
  static getHamburgerMenuIcon() {
    return cy.get('[data-testid="hamburgerMenuIcon"]');
  }
  static getMakePaymentFromHambergerIcon() {
    return cy.get('[data-testid="make_a_payment"]');
  }
}
export default DemographicPage;
