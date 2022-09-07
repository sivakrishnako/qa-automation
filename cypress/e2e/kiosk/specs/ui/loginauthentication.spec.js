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

    it.only('KIOSK-2106 || logIn ||Verify that KIOSK User will be able to  log in with last name and date of birth success ', () => {
      cy.getPatientDetails('application/json').then(patient_ln => {
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })

      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      )
      CheckInPage.clickPatientBtn()
      cy.wait(Cypress.env('elementTimeout'))
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
    })

    it('KIOSK-2109 || LogIn || Verify that As a Kiosk User should be able to reset the login input details so that user can start again', () => {
      cy.getPatientDetails('application/json').then(patient_ln => {
        WelcomePage.fillLastName(patient_ln)
      })
      WelcomePage.fillPatientDoB(PatientData.validDOB)
      WelcomePage.clickResetBtn()
      cy.clearCookies()
      cy.getPatientDetails('application/json').then(patient_ln => {
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })

      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      )
      CheckInPage.clickPatientBtn()
      cy.wait(Cypress.env('elementTimeout'))
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)

      CheckInPage.clickOnExitKioskBtn()
    })

    it('KIOSK-2105|| LogIn ||Verify that KIOSK User will be able to  switch button for language change between English and spanish', () => {
      WelcomePage.convertToggleEnglishToSpanish()
      WelcomePage.welcomeInSpanish().should('have.text', 'Bienvenidos')
    })

    it('KIOSK-2110 || LogIn || Verify that as a Kiosk User I should be able to view the Kiosk Log In screen with help button, clinic logo and clinic image after hitting the URL', () => {
      WelcomePage.clickHelpButtonOfWelcomePage()
      WelcomePage.clickPopupBtnOk()
      WelcomePage.clinicLogo().should('be.visible')
      //Once we have clinic configuration available then will verify the clinic location as well as clinic brand
      WelcomePage.clinicImage().should('be.visible')
    })

    it('KIOSK-2121 || LogIn || Verify Login page will displayed in spanish', () => {
      WelcomePage.convertToggleEnglishToSpanish()
      WelcomePage.welcomeInSpanish().should('have.text', 'Bienvenidos')
    })

    it('KIOS-2575 || LogIn ||Verify English to Spanish version of Error Messages on LoginAuthentication Screens', () => {
      WelcomePage.convertToggleEnglishToSpanish()
      WelcomePage.welcomeInSpanish().should('have.text', 'Bienvenidos')
      WelcomePage.InvalidCheckIn(
        PatientData.invalidLastName,
        PatientData.validDOB,
        PatientData.popupMsgForIncorrectCredentialsInSpanish
      )
      WelcomePage.InvalidCheckIn(
        PatientData.validLastName,
        PatientData.invalidDOB,
        PatientData.popupMsgForIncorrectCredentialsInSpanish
      )
      WelcomePage.InvalidCheckIn(
        PatientData.invalidLastName,
        PatientData.invalidDOB,
        PatientData.popupMsgForIncorrectCredentialsInSpanish
      )
    })

    it('KIOSK-2776 || LogIn || To check error message for Date of birth does not represent a real date in Login screen in English language.      ', () => {
      WelcomePage.fillPatientDoBForErrorMessage(PatientData.invalidDOBRealDate)
      WelcomePage.clickStartCheckInBtn()
      WelcomePage.errorMessageForInvalidDob().should(
        'have.text',
        PatientData.errorMessageForInvalidDob
      )
    })
    it('KIOSK-2774 || LogIn || To check error message for Date of birth does not represent a real date in Login screen in Spanish language.      ', () => {
      WelcomePage.convertToggleEnglishToSpanish()
      WelcomePage.welcomeInSpanish().should('have.text', 'Bienvenidos')
      WelcomePage.fillPatientDoBForErrorMessage(PatientData.invalidDOBRealDate)
      WelcomePage.clickStartCheckInBtn()
      WelcomePage.errorMessageForInvalidDob().should(
        'have.text',
        PatientData.errorMessageForInvalidDobInSpanish
      )
    })
    it('KIOSK-2772 || LogIn ||To check error message for DOB as future date in Login screen in English language.      ', () => {
      WelcomePage.fillPatientDoBForErrorMessage(
        PatientData.invalidDOBFutureDate
      )
      WelcomePage.clickStartCheckInBtn()
      WelcomePage.errorMessageForInvalidDob().should(
        'have.text',
        PatientData.errorMessageForInvalidDobFutureDate
      )
    })

    it('KIOSK-2773 || LogIn || To check error message for DOB as future date in Login screen in Spanish language.    ', () => {
      WelcomePage.convertToggleEnglishToSpanish()
      WelcomePage.welcomeInSpanish().should('have.text', 'Bienvenidos')
      WelcomePage.fillPatientDoBForErrorMessage(
        PatientData.invalidDOBFutureDate
      )
      WelcomePage.clickStartCheckInBtn()
      WelcomePage.errorMessageForInvalidDob().should(
        'have.text',
        PatientData.errorMessageForInvalidDobFutureDateInSpanish
      )
    })
    it('KIOSK-2777 || LogIn ||To check error message for Date of birth does not have enough digits in Login screen in English language.      ', () => {
      WelcomePage.fillPatientDoBForErrorMessage(
        PatientData.invalidDOBMissingDigits
      )
      WelcomePage.clickStartCheckInBtn()
      WelcomePage.errorMessageForInvalidDob().should(
        'have.text',
        PatientData.errorMessageForInvalidDobDigits
      )
    })
    it('KIOSK-2778 || LogIn || To check error message for Date of birth does not have enough digits in Login screen in Spanish language.    ', () => {
      WelcomePage.convertToggleEnglishToSpanish()
      WelcomePage.welcomeInSpanish().should('have.text', 'Bienvenidos')
      WelcomePage.fillPatientDoBForErrorMessage(
        PatientData.invalidDOBMissingDigits
      )
      WelcomePage.clickStartCheckInBtn()
      WelcomePage.errorMessageForInvalidDob().should(
        'have.text',
        PatientData.errorMessageForInvalidDobDigitsInSpanish
      )
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

      it.only('KIOSK-2586 || logIn ||As kiosk User should be able to check in before X minutes of his first appointment according to the set up configuration ', () => {
        WelcomePage.launchApp('ABUND')
        cy.getPatientDetails('application/json').then(patient_ln => {
          WelcomePage.startCheckIn(
            patient_ln,
            PatientData.validDOB,
            'X minutes'
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
