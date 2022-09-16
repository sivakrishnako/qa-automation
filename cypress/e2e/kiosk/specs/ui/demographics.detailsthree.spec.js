///<reference types="cypress" />
import WelcomePage from '../../pageObjects/pages/welcome.page'
import AppointmentPage from '../../pageObjects/pages/appointment.page'
import DemographicPage from '../../pageObjects/pages/demographic.page'
import CommunicationPreferencePage from '../../pageObjects/pages/communication.preference.page'
import PatientData from './patient.checkin.testdata'
import AppointmentData from './appointment.detailspage.testdata'
import ReviewDemographicsPageData from './review.demographicspage.testdata'
import CommunicationPreferencePageData from './communication.preferencepage.testdata'
import CheckInPage from '../../pageObjects/pages/checkin.page'
import InsurancePage from '../../pageObjects/pages/insurance.page'
import InsurancePageData from './insurancepage.testdata'
import RTApiData from '../../specs/api/rt.api.testdata'

describe(
  'Demographics epic test suite',
  {
    retries: 1
  
  },
  () => {
    before(() => {
      cy.myPatientAppointment(
        RTApiData.clientIdDemographics,

        RTApiData.clientSecretKeyDemographics,
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
    it('KIOS-2162|| Demographic Details || Verify As a Kiosk User should be able to edit demographic information so that user can update missing or incorrect information', () => {
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
      cy.wait(Cypress.env('elementTimeout'))
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
        ReviewDemographicsPageData.demographicPageUrl
      )

      DemographicPage.clickEditButton()

      for (let index = 0; index < 2; index++) {
        DemographicPage.editTypesOfPhoneNumber(index)
      }

      DemographicPage.fillMailingAddress()
      DemographicPage.clickEmergencyContactPhoneType()
      DemographicPage.clickOptionFromEmergencyPhoneType()
      DemographicPage.clickSaveDemographicsBtn()
      cy.verifyText(
        DemographicPage.getMailingAddress,
        ReviewDemographicsPageData.mailingAddressOfUser
      )
    })

    it('KIOS-2163|| Demographic Details || Verify a Kiosk User should be able to view his demographic information', () => {
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
      cy.wait(Cypress.env('elementTimeout'))
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)

      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
        ReviewDemographicsPageData.demographicPageUrl
      )
      cy.verifyText(
        DemographicPage.getWorkPhoneNumber,
        ReviewDemographicsPageData.workPhoneNumber
      )
      cy.verifyText(
        DemographicPage.getMailingAddress,
        ReviewDemographicsPageData.mailingAddressOfUser
      )
      DemographicPage.clickNoChangeNextBtn()
      cy.verifyPage(
        InsurancePage.titleOfInsurancePage,
        InsurancePageData.expectedTitleOfInsurancePage,
        InsurancePageData.insurancePageUrl
      )
    })

    it('KIOS-2584||Demographic Details||Verify As a Kiosk User should be able to disable electronic communications so that user stop getting electronic notices', () => {
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
      cy.wait(Cypress.env('elementTimeout'))
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)

      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
        ReviewDemographicsPageData.demographicPageUrl
      )
      DemographicPage.clickEditButton()
      cy.verifyButtonEnabled(DemographicPage.saveDemographicsButton)
      CommunicationPreferencePage.communicationPreferencePageToggle().should(
        'have.text',
        'No'
      )
      CommunicationPreferencePage.clickCommunicationPreferNoToggle()
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.buttonForDisableElectronicCommunication
      )
    })

    it('KIOS-2585||Demographic Details || Verify As a Kiosk User should be able to edit his communication preferences so that he can update missing or incorrect information ', () => {
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

      cy.wait(Cypress.env('elementTimeout'))
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
      DemographicPage.clickEditButton()
      CommunicationPreferencePage.communicationPreferencePageToggle().should(
        'have.text',
        'No'
      )
      CommunicationPreferencePage.clickCommunicationPreferYesToggle()
      DemographicPage.editCommunicationBtn()
      cy.verifyPage(
        CommunicationPreferencePage.titleOfCommunicationPreference,
        CommunicationPreferencePageData.expectedTitleOfCommunicationPreference,
        CommunicationPreferencePageData.communicationPreferencePageUrl
      )

      cy.verifyButtonEnabled(
        CommunicationPreferencePage.emailForAppointmentInfo
      ).click({ force: true })
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.textHealthInformationAndAlerts
      ).click({ force: true })
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.emailPatientSurveys
      ).click({ force: true })
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.textForVisitSummaries
      ).click({ force: true })
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.staffCommunicationBtn
      ).click({ force: true })
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.checkInForFuture
      ).click({ force: true })
      CommunicationPreferencePage.clickOnReadAgreement()

      CommunicationPreferencePage.clickSaveCommunicationPreBtn()
      cy.verifyPage(
        DemographicPage.titleEditDemographic,
        ReviewDemographicsPageData.expectedTitleOfEditDemographics,
        ReviewDemographicsPageData.editDemographicUrl
      )
    })

    it(' KIOS-2925||Demographic Details || Verify As a Kiosk user should be able to view his dropdown option for the contact type field in edit demographics page', () => {
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

      cy.wait(Cypress.env('elementTimeout'))
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
        ReviewDemographicsPageData.demographicPageUrl
      )
      DemographicPage.clickEditButton()
      DemographicPage.clickOnEmergencyContactType()
      DemographicPage.clickOptionFromEmergencyContactType()
    })

describe('Verifying demographics page', () => {
    before(() => {
      cy.myPatientAppointment(
        RTApiData.clientIdDemographics,

        RTApiData.clientSecretKeyDemographics,

        RTApiData.grantType,

        RTApiData.appId,

        PatientData.pnName,

        WelcomePage.generateRandomText(6).slice(1),

        'NOR',

        '1',

        cy.generateAdjustedTime(1),

        'DAD',

        PatientData.pnName.concat(
          WelcomePage.generateRandomText(6) + '@Gmail.com'
        )
      )

      cy.wait(Cypress.env('myWait'))
    })




  it('KIOSK-2583||Demographic Details|| Verify As a Kiosk User should be able to view his demographics once per x days based on the clinic setup option so that he not asked on every visit ', () => {
    WelcomePage.launchApp('NOR')
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
    cy.wait(Cypress.env('elementTimeout'))
    cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
    DemographicPage.clickNoChangeNextBtn()
    cy.go('back')
    cy.verifyPage(
      AppointmentPage.appointmentTitle,
      AppointmentData.expectedTitleOfAppointmentPage,
      AppointmentData.appointmentPageUrl
    )
  })
})

after(() => {
  cy.deletePatient()
})
}
)
