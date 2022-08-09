/// <reference types="cypress" />

class DemographicPage {
    static titleReviewDemographic =('[data-testid="card-title"]')
    static saveDemographicsButton=('[data-testid="submit"]') .jss116
    static getTitleOfPatientInformation=('[data-testid="patient-information-title"]')
    static getNameInSpanish=('[data-testid="patient-name-label"]')
    static getDobINSpanish=('[data-testid="patient-DOB-label"]')
    static getAgeInSpanish=('[data-testid="patient-age-label"]')
    static getPatientGenderInSpanish=('[data-testid="patient-gender-label"]')
    static getPatientSocialSecurityInSpanish=('[data-testid="patient-social-security-label"]')
    static getPatientEmailIdInSpanish=('[data-testid="patient-email-label"]')
    static getTitleOfContactDetailsInSpanish=('[data-testid="contact-details-title"]')
    static getContactTypeInSpanish=('[data-testid="contact-phone-type-label"]')
    static getCommunicationPreferenceInSpanish=('[data-testid="communication-preferences-title"]')
    static getEditTextInSpanish=('[data-testid="edit-button"]')
    static getYesTextInSpanish=('[data-testid="undefinedyes"]')
    static getCommunicateElectronicallyInSpanish=('[data-testid="communicate-electronically"]')
    static getMailingAddressTextInSpanish=('[data-testid="mailing-address-title"]')
    static getCellTextInSpanish=('[data-testid="Cell"]')
    static getNoChangeNextTextInSpanish=('[data-testid="no-change"]')

    static helpButtonOfDemographicPage() {
        return cy.get('[data-testid="HelpOutlineIcon"]')
    }

    static demographicName() {
        return cy.get('[data-testid="patient-name"]');
    }
    static demographicPagePatientDob() {
        return cy.get('[data-testid="patient-DOB"]');
    }
    static demographicPagePatientGender() {
        return cy.get('[data-testid="patient-gender"]');
    }
    static clickNoChangeNextBtn() {
        const button = cy.get('[data-testid="no-change"]');
        button.click();
        return this;

    }
    static clickEditButton() {
        const button = cy.get('[data-testid="edit-button"]' )
        button.click();
        return this;

    }
    static editCommunicationBtn() {
        const button = cy.get('[data-testid="communication"]');
        button.click();
        return this;
    }

    static fillHomePhoneNum(value) {
        const field =cy.get('[data-testid="contactDetails[0]-phoneNumber"]')
        //field.clear();
        field.type(value);
        return this;
    }
    static clickSaveDemographicsBtn() {
        const button =cy.get(('[data-testid="submit"]') .jss116,{ timeout:10000 })
        button.click();
        return this;
    }
    static fillFirstName(value) {
        const field =cy.get('#patientInfo-firstname',{ timeout:5000 })
        //cy.get('[data-testid="patientInfo-firstname"]')
        field.clear();
        field.type(value);
        return this;
    }
    static fillMailingAddress(value){
        const field=cy.get('#mailing-address',{timeout:5000})
        //cy.get('[data-testid="mailing-address-label"]',{ timeout: 10000 })
        field.clear();
field.type(value);
        return this;
    }
    
   static demographicsPageFirstName() {
        return cy.get(' [data-testid="patient-name"]',{ timeout: 10000 })
    }

    static errorIconField() {
        return cy.get('[data-testid="ErrorIcon"]');
    }
    static getMailingAddress=('[data-testid="mailing-address"]')
    static getHomePhoneNumber=('[data-testid="contactDetails[0]-phoneNumber"]')
    static getCellPhoneNumber=('[data-testid="contact-phone-number-1"]')
    static getWorkPhoneNumber=('[data-testid="contact-phone-number-2"]')
    static getLastNameOfEmergencyContactDetails=('[data-testid="emergency-name-0"]');
    
    static fillLastNameOfEmergencyContactDetails(value){
       const field=cy.get('#emergencyContacts[0]-lastname',{timeout:1000})
       //cy.get('[data-testid="emergencyContacts[0]-lastname"]',{ timeout: 10000 })
       field.clear();
       field.type(value);
       return this;
 }
 static clickEmergencyContactPhoneType(){
    const button=cy.get('[data-testid="emergencyContacts[0]-phoneType"]',{ timeout: 10000 })
    button.click();
    return this
 }
 static fillEmergencyContactPhoneNumber(value){
    const field= cy.get('[data-testid="emergencyContacts[0]-phoneNumber"]',{ timeout: 10000 })
   // field.clear()
    field.type(value)
    return this
 }
 static clickOnZipField(){
    const button=cy.get('[data-testid="mailingAddress-zip"]',{ timeout: 10000 })
    button.click()
    return this;
 }


    


    }
export default DemographicPage;