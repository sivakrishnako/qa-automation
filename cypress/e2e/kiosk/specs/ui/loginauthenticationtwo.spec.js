
///<reference types="cypress" />

import WelcomePage from '../../pageObjects/pages/welcome.page'
import AppointmentPage from '../../pageObjects/pages/appointment.page'
import PatientData from './patient.checkin.testdata'
import CheckInPage from '../../pageObjects/pages/checkin.page'
import RTApiData from '../../specs/api/rt.api.testdata'

describe(
  'LogIn /Authentication Epic test suite',
  {
    retries:1
  },
  () => {
    before(() => {
      cy.myPatientAppointment(
        RTApiData.clientIdLogIn,

        RTApiData.clientSecretKeyLogIn,

        RTApiData.grantType,

        RTApiData.appId,

        PatientData.pnName,

        WelcomePage.generateRandomText(6).slice(1),

        'ZZPOC',

        '1',

        cy.generateAdjustedTime(1),

        'DAD',

        PatientData.pnName.concat(
          WelcomePage.generateRandomText(6) + '@Gmail.com'
        )
      )

      cy.wait(Cypress.env('myWait'))
    })
    beforeEach(() => {
      WelcomePage.launchApp('ZZPOC')
      cy.clearCookies()

    })
it('KIOSK-179|| LogIn ||Verify Help functionality on login page for desktop and tablet', () => {

    WelcomePage.clickHelpButtonOfWelcomePage();
    WelcomePage.clickPopupBtnOk();
    WelcomePage.convertToggleEnglishToSpanish();
    WelcomePage.clickHelpButtonOfWelcomePage();
    WelcomePage.clickPopupBtnOk();


  })
  it('KIOSK-370|| LogIn ||To check English to Spanish Toggle button functionality on all devices', () => {
    WelcomePage.convertToggleEnglishToSpanish()
    WelcomePage.welcomeInSpanish().should('have.text', 'Bienvenidos')
    WelcomePage.titleSelfCheckInSpanish().should('have.text','Autoservicio en el Quiosco')
    WelcomePage.lastNameInSpanish().should('have.text', 'Apellido del Paciente')
    WelcomePage.dateOfBirthInSpanish().should('have.text', 'Fecha de Nacimiento del Paciente')
    WelcomePage.resetButtonInSpanish().should('have.text', 'Reiniciar')
    WelcomePage.startCheckInSpanish().should('have.text','INICIAR EL REGISTRO')

  })


  //Nested Describe to override Location
  describe('Verifying Login with X minutes constraint', () => {
    before(() => {
      cy.myPatientAppointment(
        RTApiData.clientIdLogIn,

        RTApiData.clientSecretKeyLogIn,

        RTApiData.grantType,

        RTApiData.appId,

        PatientData.pnName,

        WelcomePage.generateRandomText(6).slice(1),

        'ABUND',

        '1',

        cy.generateAdjustedTime(1),

        'DAD',

        PatientData.pnName.concat(
          WelcomePage.generateRandomText(6) + '@Gmail.com'
        )
      )

      cy.wait(Cypress.env('myWait'))
    })

    
   
    
    it('KIOSK-1130 || logIn ||Verify UI content of pop up window for Error message when user tries to check in more than n minutes in spanish ', () => {
      WelcomePage.launchApp('ABUND')
      cy.getPatientDetails('application/json').then(patient_ln => {
        WelcomePage.convertToggleEnglishToSpanish()
      WelcomePage.welcomeInSpanish().should('have.text', 'Bienvenidos')
        WelcomePage.startCheckInForXMinutesForSpanish(
          patient_ln,
          PatientData.validDOB,
          'X minutes',
        
          

        )
      })
    })
  })
  
  after(() => {
    //This deletes the patient created from Core RT App
    cy.deletePatient()
  })
}
)
