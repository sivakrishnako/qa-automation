///<reference types="cypress" />
import WelcomePage from '../../pageObjects/pages/welcome.page'
import AppointmentPage from '../../pageObjects/pages/appointment.page'
import DemographicPage from '../../pageObjects/pages/demographic.page'
import CommunicationPreferencePage from '../../pageObjects/pages/communication.preference.page'
import PatientData from './patient.checkin.testdata'
import AppointmentData from './appointment.detailspage.testdata'
import ReviewDemographicsPageData from './review.demographicspage.testdata'
import CommunicationPreferencePageData from './communication.preferencePage.testdata'
import CheckInPage from '../../pageObjects/pages/checkin.page'
import InsurancePageData from './insurancepage.testdata'
import InsurancePage from '../../pageObjects/pages/insurance.page'
import RTApiData from '../api/rt.api.testdata'
import FormListPage from '../../pageObjects/pages/formlist.page'
import FormListPageData from './formlist.testdata'
import SubmitPage from '../../pageObjects/pages/submit.page'
import SubmitPageData from './submitpage.testdata'


describe(
  'Test Suite For Appointment confirmation',
  {
    retries: 1
    
  },
  () => {
    before(() => {
      cy.myPatientAppointment(
        RTApiData.clientIdAppointment,
        RTApiData.clientSecretKeyAppointment,
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
    it('KIOS-2161 ||Appointment confirmation||Verify a Kiosk User should be able to check in for all his appointment(s) booked', () => {
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
      cy.verifyText(AppointmentPage.getPatientAge, AppointmentData.expectedAge)

      cy.verifyText(
        AppointmentPage.getProviderName,
        AppointmentData.providerName
      )
      cy.verifyText(
        AppointmentPage.getSpeciality,
        AppointmentData.specialityOfProvider
      )

      cy.verifyText(
        AppointmentPage.getAppointmentType,
        AppointmentData.expectedTypeOfAppointment
      )
    })
    it('KIOS-2275 ||Appointment confirmation ||Verify that user should be able to view the patient information of the single child if logged in as a Parent/Authorized Representative ', () => {
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
      cy.getPatientDetails('application/json').then(patient_ln => {
        cy.get(AppointmentPage.getPatientName).contains(patient_ln)
      })
      cy.verifyText(AppointmentPage.getPatientDOB, AppointmentData.validDob)

      cy.verifyText(AppointmentPage.getPatientAge, AppointmentData.expectedAge)

      cy.verifyText(
        AppointmentPage.getProviderName,
        AppointmentData.providerName
      )
      cy.verifyText(
        AppointmentPage.getSpeciality,
        AppointmentData.specialityOfProvider
      )

      cy.verifyText(
        AppointmentPage.getAppointmentType,
        AppointmentData.expectedTypeOfAppointment
      )
    })
    it('KIOS-2273||Appointment Confirmation || Verify that Appointment details like details of patient, details of provider and separate tile with appointment Date, Time & Type are displayed', () => {
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
      AppointmentPage.getDateOfAppointment()
      AppointmentPage.getTimeOfAppointment()
      cy.verifyText(AppointmentPage.getPatientDOB, AppointmentData.validDob)
      cy.verifyText(AppointmentPage.getPatientAge, AppointmentData.expectedAge)

      cy.verifyText(
        AppointmentPage.getProviderName,
        AppointmentData.providerName
      )
      cy.verifyText(
        AppointmentPage.getSpeciality,
        AppointmentData.specialityOfProvider
      )

      cy.verifyText(
        AppointmentPage.getAppointmentType,
        AppointmentData.expectedTypeOfAppointment
      )
    })

    it('KIOS-2272||Appointment Confirmation || Verify that user should be able to view the user details dropdown on top of Parent/Authorized representative Appointment page', () => {
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
      cy.getPatientDetails('application/json').then(patient_ln => {
        cy.get(AppointmentPage.getPatientName).contains(patient_ln)
      })
      cy.verifyText(AppointmentPage.getPatientDOB, AppointmentData.validDob)
    })

    it('KIOS-2171|| Appointment Confirmation || Verify that appointment details header displayed On Appointment Detail Page has user detail dropdown with name displayed', () => {
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
    })

    it('KIOS-2692||Appointment Confirmation || verify As a Kiosk User ,i should be able to view the details of the child when he has a Authorized Guardian or Representative', () => {
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
      cy.getPatientDetails('application/json').then(patient_ln => {
        cy.get(AppointmentPage.getPatientName).contains(patient_ln)
      })
      cy.verifyText(AppointmentPage.getPatientDOB, AppointmentData.validDob)
    })

    it.only('KIOS-4481|| Appointment confirmation ||Verify As a Raintree user I should see the status of the appointment updated after check in is complete so I know who has checked in', () => {
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
          );
          DemographicPage.clickNoChangeNextBtn();
          cy.verifyPage(InsurancePage.titleOfInsurancePage,InsurancePageData.expectedTitleOfInsurancePage,InsurancePageData.insurancePageUrl);
          cy.wait(Cypress.env('myWait'));
          InsurancePage.clickOnNoChangeNext()
          InsurancePage.clickOnNoChangeNext()
          cy.verifyPage(
            FormListPage.getTitleOfPage,
            FormListPageData.expectedTitleOfFormList,
            FormListPageData.formListPageUrl
          )
          FormListPage.clickOnNoChangeNext()
          cy.verifyPage(
            SubmitPage.getTitleOfSubmitPage,
            SubmitPageData.expectedTitleOfSubmit,
            SubmitPageData.submitPageUrl
          )
          cy.getCheckInConfirmation()
        
      })
    describe('Multi appointment flow', () => {
      before(() => {
        cy.myPatientAppointment(
          RTApiData.clientIdAppointment,

          RTApiData.clientSecretKeyAppointment,

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

        cy.wait(62000)

        cy.addAppointment('ZZPOC', '1')
      })

      beforeEach(() => {
        WelcomePage.launchApp('ZZPOC')

        cy.clearCookies()
      })
      it('KIOS-2276||Appointment Confirmation|| Verify that user is able to view Two appointments details scheduled for same day according to time of appointment booked', () => {
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

        AppointmentPage.multiAppointment().then($el => {
          for (let index = 0; index < $el.length; index++) {
            AppointmentPage.verifyProviderDetails(index)
          }
        })
        AppointmentPage.getCompareTime()
      })
    })
    describe('Multi appointment flows', () => {
      before(() => {
        cy.myPatientAppointment(
          RTApiData.clientIdAppointment,

          RTApiData.clientSecretKeyAppointment,

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

        cy.wait(62000)
        cy.addAppointment('ZZPOC', '2')
      })

      beforeEach(() => {
        WelcomePage.launchApp('ZZPOC')

        cy.clearCookies()
      })
      it('KIOS-2274||Appointment Confirmation || Verify that user is able to view maximum three appointments details scheduled for same day according to time of appointment', () => {
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

        AppointmentPage.multiAppointment().then($el => {
          for (let index = 0; index < $el.length; index++) {
            AppointmentPage.verifyProviderDetails(index)
          }
        })
      })
    })

    after(() => {
      cy.deletePatient()
    })
  }
)
