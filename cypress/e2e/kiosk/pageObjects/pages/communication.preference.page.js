/// <reference types="cypress" />

class CommunicationPreferencePage
{
    static titleOfCommunicationPreference=('[data-testid="card-title"]')
static communicationPreferencePageToggle(){
    return cy.get('[data-testid="undefinedno"]');
    }
    static clickCommunicationPreferNoToggle(){
        const button= cy.get('[data-testid="undefinedno"]')
        button.click();
        return this;
    }
    
static clickCommunicationPreferYesToggle(){
    const button =cy.get('[data-testid="undefinedyes"]');
    button.click();
    return this
}

static emailForAppointmentInfo ='[data-testid="email_aprem-info-email-check"]'

static textHealthInformationAndAlerts='[data-testid="text_heala-info-text-check"]'
static emailPatientSurveys='[data-testid="email_survy-info-email-check"]'
static textForVisitSummaries='[data-testid="text_vsumm-info-text-check"]';
static staffCommunicationBtn='[data-testid="can-staff-contactyes"]'
static paperlessStatementButton='[data-testid="statementyes"]'
static checkInForFuture='[data-testid="contact-checkInyes"]'
static PaperlessStatementsEmail= '[data-testid="paperless-statements-email"]'
static titleOfAgreementInSpanish='[data-testid="card-title"]'
static getAppointmentInfoTextInSpanish='[data-testid="appointment-info"]'
static getAppointmentInfoTextInSpanish='[data-testid="appointment-info"]'
static cancelButtonInSpanish = '[data-testid="cancelCommunicationPref"]'
static saveButtonInSpanish = '[data-testid="saveCommunicationPref"]'
static SendNotificationInSpanish = '[data-testid="send-notification"]'
static fullNameInSpanish = ('[data-testid="full-name-label"]')  
static cellNumberInSpanish = ('[data-testid="cell-number-label"]')
static emailInSpanish = ('[data-testid="email-label"]')
static staffCommunicationInSpanish = '[data-testid="staff-communication"]'
static checkInForFutureInSpanish = '[data-testid="email-or-text"]'
static buttonForDisableElectronicCommunication='[data-testid="undefinedno"]'
static receiveAppointmentInformation = (':nth-child(2) > .communication-title > [data-testid="appointment-info"]')
static healthInformationAndAlerts = (':nth-child(3) > .communication-title > [data-testid="appointment-info"]')
static patientSurveys= (':nth-child(4) > .communication-title > [data-testid="appointment-info"]')
static visitSummaries = (':nth-child(5) > .communication-title > [data-testid="appointment-info"]')

static textForAppointmentInfoInSpanish = ('[data-testid="text_aprem-info-text-check-chip"]')
static textForHealthInformationAndAlertsInSpanish = ('[data-testid="text_heala-info-text-check-chip"]')
static textForPatientSurveysInSpanish = ('[data-testid="text_survy-info-text-check-chip"]')
static textForVisitSummariesInSpanish = ('[data-testid="text_vsumm-info-text-check-chip"]')











static readAgreement= ('[data-testid="read-agreement"]');
static titleOfAgreementInSpanish =('.MuiPaper-root > .MuiGrid-container > .MuiGrid-grid-xs-11 > [data-testid="card-title"]')


    static errorIcon(){
    return cy.get('[data-testid="ErrorIcon"]');
   
    }
    static clickPaperlessStatementYesButton(){
        const btn=cy.get('[data-testid="statementyes"]')
        btn.click();
        return this
    
    
    }
    
static clickPaperlessStatementEmail(){
    const btn=cy.get('[data-testid="paperless-statements-email"]')
    btn.click();
    return this

}
static clickSaveCommunicationPreBtn(){
  const button=  cy.get('[data-testid="saveCommunicationPref"]');
button.click();
 return this;
}
static clickOnAgreement(){
    const button=cy.get('[href="/communication"]')
button.click();
return this;
}


}
export default CommunicationPreferencePage;
