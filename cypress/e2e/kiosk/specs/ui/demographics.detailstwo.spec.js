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
 'DAD'
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
  //inprogress

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
  //inprogress
  
  })
  it.only("KIOS-2782||Demographics Details||To check error message for Date of birth does not represent a real date in Edit demographics screen in Spanish language.",()=>{
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
    cy.get(':nth-child(5) > .full-width > .error-message').should('have.text','Invalid format (not a real date)')
    
//inprogress

  })
  
  
        
    })
    after(() => {
      
         cy.deletePatient()
     })
    
  
  