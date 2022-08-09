///<reference types="cypress" />
import WelcomePage from '../../pageObjects/pages/welcome.page'
import AppointmentPage from '../../pageObjects/pages/appointment.page'
import PatientData from '../ui/patient.checkin.testdata'
import CheckInPage from '../../pageObjects/pages/checkin.page'
import AppointmentData from '../ui/appointment.detailspage.testdata'
import RTApiData from '../../specs/api/rt.api.testdata'


describe(
  'CheckIn Epic test suite',
  {
    retries: {
      runMode: 3,
      openMode: 1
    }
  },
  () => {
    before(() => {
      cy.myPatientAppointment(
        RTApiData.clientIdCheckIN,
        RTApiData.clientSecretKeyCheckIN,
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

    
    it(' KIOSK-2116 || CheckIn ||Verify  Valid  error message is getting displayed when patient appointment is not found due to incorrect last name, date of birth,and incorrect both lastName and date of birth ', () => {
     
      WelcomePage.InvalidCheckIn(
        PatientData.invalidLastName,
        PatientData.validDOB,
        PatientData.popupMsg
      )
      WelcomePage.InvalidCheckIn(
        PatientData.validLastName,
        PatientData.invalidDOB,
        PatientData.popupMsg
      )
      WelcomePage.InvalidCheckIn(
        PatientData.invalidLastName,
        PatientData.invalidDOB,
        PatientData.popupMsg
      )
      WelcomePage.clickStartCheckInBtn()
      WelcomePage.getPopupForBlankCredentials().should(
        'have.text',
        PatientData.popupMsg
      )
    })

    it('KIOS-2119 || CheckIn ||Verify Start check In button functionality when user clicks on it and User is able to select Patient from Who are you to identify himself', () => {
     
      cy.getPatientDetails('application/json').then(patient_ln => {
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })
    
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      )
      CheckInPage.patient().should('have.text', 'Patient')
      CheckInPage.authorized().should(
        'have.text',
        'Parent / Authorized Representative'
      )
      CheckInPage.noneOfTheAbove().should('have.text', 'None of the above')
      CheckInPage.clickPatientBtn()
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      )

      cy.getPatientDetails('application/json').then(patient_ln => {
        cy.get(AppointmentPage.getPatientName).contains(patient_ln)
      
      })
      cy.verifyText(AppointmentPage.getPatientDOB, AppointmentData.validDob)

      AppointmentPage.clickOnExitKioskBtn() 
    })

    it('KIOS-2120 || CheckIn ||Verify  User is able to select Patient /Authorized Representative from Who are you to identify himself ', () => {
 
      cy.getPatientDetails('application/json').then(patient_ln => {
     
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      )
      CheckInPage.clickPatientBtn()
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      )
      cy.getPatientDetails('application/json').then(patient_ln => {
       cy.get(AppointmentPage.getPatientName).contains(patient_ln)
      })

      cy.verifyText(AppointmentPage.getPatientDOB, AppointmentData.validDob)
      cy.verifyText(
        AppointmentPage.getSpeciality,
        AppointmentData.specialityOfProvider
      )
      AppointmentPage.clickOnExitKioskBtn() 
    })

    it('KIOSK-2122 || CheckIn ||Verify  User is able to select None from Who are you to identify himself', () => {
      cy.getPatientDetails('application/json').then(patient_ln => {
   
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })

      CheckInPage.patient().should('have.text', 'Patient')
      CheckInPage.authorized().should(
        'have.text',
        'Parent / Authorized Representative'
      )
      CheckInPage.noneOfTheAbove().should('have.text', 'None of the above')
      CheckInPage.clickNoneOfTheAbove()
      CheckInPage.getPopupMsgOfNoneOfTheAbove().should(
        'have.text',
        PatientData.popupMsgOfNoneOfTheAbove
      )
      CheckInPage.clickOkBtnPopupOfNoneOfTheAbove()
      CheckInPage.clickOnExitBtn()
    })

    it('KIOSK 2123 || CheckIn ||Verify that user can check in with authorized guardian from the list of available option', () => {
      cy.getPatientDetails('application/json').then(patient_ln => {
     
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      )
      CheckInPage.patient().should('have.text', 'Patient')
      CheckInPage.authorized().should(
        'have.text',
        'Parent / Authorized Representative'
      )
      CheckInPage.noneOfTheAbove().should('have.text', 'None of the above')
      CheckInPage.clickGuardianBtn()
      CheckInPage.clickOptFromParent()
      CheckInPage.clickGuardianListContinueBtn()

      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      )

      cy.wait(Cypress.env('elementTimeout'))
      cy.ClickElementWithJS(AppointmentPage.checkInButtonForAuthRepJS)

     AppointmentPage.clickOnExitKioskBtn()
      
    })

    it('KIOSK-2124|| CheckIn || Verify that the user is able to logout from application when he clicks on Exit KIOSK ', () => {
      cy.getPatientDetails('application/json').then(patient_ln => {
      
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      )
      CheckInPage.clickPatientBtn()
      AppointmentPage.clickOnExitKioskBtn()

      WelcomePage.titleWelcomePage().should('have.text', 'Self Check-In Kiosk')
    })

    it(' KIOSK-2125 || CheckIn || Verify that user is able to translate English Language to spanish for check in page.', () => {
      cy.getPatientDetails('application/json').then(patient_ln => {
       
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      )

      WelcomePage.convertToggleEnglishToSpanish()
      CheckInPage.patient().should('have.text', 'Paciente')
      CheckInPage.authorized().should(
        'have.text',
        'Padre / Representante Autorizado'
      )
      CheckInPage.noneOfTheAbove().should(
        'have.text',
        'Ninguna de las Anteriores'
      )
      CheckInPage.clickPatientBtn()
      AppointmentPage.clickOnExitKioskBtn()

      WelcomePage.titleWelcomePage().should('have.text', 'Self Check-In Kiosk')
    })


    after(() => {
      //This deletes the patient created from Core RT App
      cy.deletePatient()
    })

  })
