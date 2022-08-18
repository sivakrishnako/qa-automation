///<reference types="cypress" />
import WelcomePage from '../../pageObjects/pages/welcome.page';
import AppointmentPage from '../../pageObjects/pages/appointment.page';
import DemographicPage from '../../pageObjects/pages/demographic.page';
import CommunicationPreferencePage from '../../pageObjects/pages/communication.preference.page';
import PatientData from './patient.checkin.testdata'
import AppointmentData from './appointment.detailspage.testdata'
import ReviewDemographicsPageData from './review.demographicspage.testdata'
import CommunicationPreferencePageData from './communication.preferencepage.testdata'
import CheckInPage from '../../pageObjects/pages/checkin.page';
import InsurancePage from '../../pageObjects/pages/insurance.page';
import InsurancePageData from './insurancepage.testdata';
import RTApiData from '../api/rt.api.testdata'

describe(
'Demographics epic test suite',
  {
    retries: {
      runMode: 3,
      openMode: 1
    }
  },
  () => {
    
    
    before(() => {

      cy.myPatientAppointment(

        RTApiData.clientIDForDemographicsSecond,

        RTApiData.clientSecretKeyForDemographicsSecond,

        RTApiData.grantType,

        RTApiData.appId,

        PatientData.pnName,

        WelcomePage.generateRandomText(6).slice(1),

        'ZZPOC',

        '1',

        cy.generateAdjustedTime(1),

        'DAD',

        PatientData.pnName.concat(WelcomePage.generateRandomText(6)+"@Gmail.com")

      )

      cy.wait(Cypress.env('myWait'))

    })
beforeEach(() => {
WelcomePage.launchApp('ZZPOC')
      cy.clearCookies()
    })


    it("KIOS-2780||Demographics||To check error message for DOB as future date in Edit Demographics screen in English language.",()=>{
        cy.getPatientDetails('application/json').then(patient_ln => {
          cy.wait(Cypress.env('elementTimeout'))
          WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
        })   
      cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
      CheckInPage.patient().should('have.text', 'Patient');
      CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
      CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
      CheckInPage.clickPatientBtn();
  cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
      
  cy.wait(Cypress.env('elementTimeout'))
  cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
  cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographic,ReviewDemographicsPageData.demographicPageUrl);
  DemographicPage.clickEditButton();
  DemographicPage.fillFutureDOB();
  cy.get('body').click(50, 50, { force: true })
  cy.verifyText(DemographicPage.getErrorMessageForWrongDob,ReviewDemographicsPageData.errorMessageForFutureDOBInEnglish)
    

  

})


it('KIOS-2781||Demographics||To check error message for DOB as future date in Edit Demographics screen in Spanish language.',()=>{
    cy.getPatientDetails('application/json').then(patient_ln => {
      cy.wait(Cypress.env('elementTimeout'))
      WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
    })   
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      );
  
      WelcomePage.convertToggleEnglishToSpanish();
      CheckInPage.clickPatientBtn();
      cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPageInSpanish, AppointmentData.appointmentPageUrl);
      cy.wait(Cypress.env('elementTimeout'))
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
      cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographicInSpanish,ReviewDemographicsPageData.demographicPageUrl);
      cy.verifyText(DemographicPage.getCommunicationPreferenceInSpanish,' Preferencia de Comunicación')
      cy.verifyText(DemographicPage.getEditTextInSpanish,'EDITAR')
  DemographicPage.clickEditButton();
  DemographicPage.fillFutureDOB();
  cy.get('body').click(50, 50, { force: true })
  cy.verifyText(DemographicPage.getErrorMessageForWrongDob,ReviewDemographicsPageData.errorMessageForFutureDOBInSpanish)
  

  
  })
  it("KIOS-2782||Demographics Details||To check error message for Date of birth does not represent a real date in Edit demographics screen in Spanish language.",()=>{
    cy.getPatientDetails('application/json').then(patient_ln => {
        cy.wait(Cypress.env('elementTimeout'))
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })   
        cy.verifyPage(
          CheckInPage.checkInTitle,
          PatientData.expectedTitleOfCheckIn,
          PatientData.checkInPageUrl
        );
    
        WelcomePage.convertToggleEnglishToSpanish();
        CheckInPage.clickPatientBtn();
        cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPageInSpanish, AppointmentData.appointmentPageUrl);
        cy.wait(Cypress.env('elementTimeout'))
        cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
        cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographicInSpanish,ReviewDemographicsPageData.demographicPageUrl);
        cy.verifyText(DemographicPage.getCommunicationPreferenceInSpanish,' Preferencia de Comunicación')
        cy.verifyText(DemographicPage.getEditTextInSpanish,'EDITAR')
    DemographicPage.clickEditButton();
    DemographicPage.fillNotRealDOB()
    DemographicPage.clickSaveDemographicsBtn()
    cy.get('body').click(50, 50, { force: true })
    

    cy.verifyText(DemographicPage.getErrorMessageForWrongDob,ReviewDemographicsPageData.errorMessageForNotRealDOBInSpanish)
  

  })
  it("KIOS-2783||Demographics Details||To check error message for Date of birth does not represent a real date in Edit demographics screen in English language.",() =>{

    cy.getPatientDetails('application/json').then(patient_ln => {
      cy.wait(Cypress.env('elementTimeout'))
      WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
    })   
  cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
  CheckInPage.patient().should('have.text', 'Patient');
  CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
  CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
  CheckInPage.clickPatientBtn();
cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
  
cy.wait(Cypress.env('elementTimeout'))
cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographic,ReviewDemographicsPageData.demographicPageUrl);
DemographicPage.clickEditButton();
DemographicPage.fillNotRealDOB()
cy.get('body').click(50, 50, { force: true })
cy.verifyText(DemographicPage.getErrorMessageForWrongDob,ReviewDemographicsPageData.errorMessageForNotRealDOBInEnglish)

  })
  it("KIOS-2784||Demographics Details||To check the error message for Date of birth does not have enough digits in the Edit demographics screen in the English language.",()=>{
    cy.getPatientDetails('application/json').then(patient_ln => {
      cy.wait(Cypress.env('elementTimeout'))
      WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
    })   
  cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
  CheckInPage.patient().should('have.text', 'Patient');
  CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
  CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
  CheckInPage.clickPatientBtn();
cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
  
cy.wait(Cypress.env('elementTimeout'))
cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographic,ReviewDemographicsPageData.demographicPageUrl);
DemographicPage.clickEditButton();
DemographicPage.fillDoesNotHaveEnoughDigitDob()
cy.get('body').click(50, 50, { force: true })
cy.verifyText(DemographicPage.getErrorMessageForWrongDob,ReviewDemographicsPageData.errorMessageForInvalidFormatDOBInEnglish)
  })
  it("KIOS-2785||Demographics Details||To check the error message for Date of birth does not have enough digits in the Edit demographics screen in the English language.",()=>{


    cy.getPatientDetails('application/json').then(patient_ln => {
      cy.wait(Cypress.env('elementTimeout'))
      WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
    })   
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      );
  
      WelcomePage.convertToggleEnglishToSpanish();
      CheckInPage.clickPatientBtn();
      cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPageInSpanish, AppointmentData.appointmentPageUrl);
      cy.wait(Cypress.env('elementTimeout'))
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
      cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographicInSpanish,ReviewDemographicsPageData.demographicPageUrl);
      cy.verifyText(DemographicPage.getCommunicationPreferenceInSpanish,' Preferencia de Comunicación')
      cy.verifyText(DemographicPage.getEditTextInSpanish,'EDITAR')
  DemographicPage.clickEditButton();
  DemographicPage.fillInvalidFormatDob();
  cy.get('body').click(50, 50, { force: true })

  cy.verifyText(DemographicPage.getErrorMessageForWrongDob,ReviewDemographicsPageData.errorMessageForInvalidFormatDOBInSpanish)
  
})
  
})
    after(() => {
      
         cy.deletePatient()
     })
    
  
  