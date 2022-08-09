import WelcomePage from '../../pageObjects/pages/welcome.page'
import AppointmentPage from '../../pageObjects/pages/appointment.page'
import PatientData from './patient.checkin.testdata'
import AppointmentData from './appointment.detailspage.testdata'
import CheckInPage from '../../pageObjects/pages/checkin.page'
import PaymentPage from '../../pageObjects/pages/payment.details.page'
import PaymentDetailsPageData from '../../specs/ui/paymentdetails.testdata'
import DemographicPage from '../../pageObjects/pages/demographic.page'
import ReviewDemographicsPageData from '../../specs/ui/review.demographicsPage.testdata'

describe.skip(
  'Payment Details spec file ',
  {
    retries: {
      runMode: 3,
      openMode: 1
    }
  },
  () => {
    beforeEach(() => {
      WelcomePage.launchApp('ZZPOC')
      cy.clearCookies()
    })

    it.only('KIOS-2576|| Payment ||Verify As a Kiosk User  should not be able to skip the payment if an amount is due and  If skip payment Option set as N in set up configuration and copay is not applicable', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      cy.wait(3000)
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      )
      PaymentPage.clickOnMakePayment()
      //Cypress cannot go ahead because does not support third party application
    })
    it('KIOS-||Payment||Verify As a Kiosk User I should not be able to skip the payment if an amount is due and If skip payment Option set as Y in set up configuration but Copay is applicable', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      AppointmentPage.clickCheckInBtn()
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      )
      PaymentPage.clickOnMakePayment()
      //Cypress cannot go ahead because does not support third party application
    })
    it('KIOS-2577||Payment||Verify As a Kiosk User  should be able to skip the payment so that user can move on without making a payment', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      AppointmentPage.clickCheckInBtn()
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      )
      PaymentPage.clickSkipPayment()
      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
        ReviewDemographicsPageData.demographicPageUrl
      )
      //complete
    })
    it('KIOS-2578||Payment||Verify As a Kiosk User  should be able to enter the amount user is going to pay so that user can pay something other the full amount due', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      AppointmentPage.clickCheckInBtn()
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      )
      // PaymentPage.clickOnOtherForPaymentInsteadOfPayFullAmount();
      // PaymentPage.fillAmountByManually(PaymentDetailsPageData.minimumOtherAmountForCheckIn)
      //complete
    })

    it('KIOS-2579||Payment||Verify As a Kiosk User should be able to skip the Payment page if there is no dues to pay', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      AppointmentPage.clickCheckInBtn()

      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      )
      PaymentPage.clickSkipPayment()
      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
        ReviewDemographicsPageData.demographicPageUrl
      )
    })

    it('KIOS-2581||Payment||Verify As a Kiosk User should be able to view his balance and copay information', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      AppointmentPage.clickCheckInBtn()

      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      )
      //PaymentPage.copayAmount().should('be.gt',0)
      //    PaymentPage.totalDueAmount().should('be.gt',0);
      // complete
    })
    //  it('KIOS-2586||Log In || As kiosk User should be able to check in before X minutes of his first appointment according to the set up configuration',()=>{
    //     WelcomePage.startCheckIn(PatientData.lastNameOfBeforeNMinutesPatient,PatientData.dobOfBeforeNMinutesPatient)
    //     WelcomePage.getPopupMsgForBeforeNMinutesPatient().should('have.text',PatientData.popupMsgForBeforeNMinutesPatient)
    // })
    it('KIOS-2921||Payment || Verify As a Kiosk User I should be able to change the email address where I would like to receive the receipt', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      AppointmentPage.clickCheckInBtn()

      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      )
      PaymentPage.clickOnEditEmailForPaymentReceipt()
      PaymentPage.fillEmailField('MARIE1@GMAIL.COM')
      PaymentPage.clickOnMakePayment()
    })

    xit('KIOS-2920||Payment||Verify As a Kiosk User should not be able to view payment page if setup configuration defined to hide the page', () => {
      WelcomePage.startCheckIn(
        PatientData.userLastNameForSkipPaymentPage,
        PatientData.userDobForSkipPaymentPage
      )
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
      AppointmentPage.clickCheckInBtn()
    })
    it('KIOS-1602||Payment Details||Verify spanish version of payment details page', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPageInSpanish,
        AppointmentData.appointmentPageUrl
      )
      cy.verifyText(AppointmentPage.getTitlePatient, 'Paciente')
      cy.verifyText(AppointmentPage.getProviderTitle, 'Proveedor')
      cy.verifyText(AppointmentPage.getDateTitle, 'Fecha')
      cy.verifyText(AppointmentPage.getTimeTitle, 'Hora')
      cy.verifyText(AppointmentPage.getTypeOfAppointmentTitle, 'Tipo de Cita')
      cy.verifyText(AppointmentPage.getPatientDOB, AppointmentData.validDob)
      cy.verifyText(AppointmentPage.getPatientAge, AppointmentData.expectedAge)
      cy.verifyText(
        AppointmentPage.getGenderOfProvider,
        AppointmentData.expectedGender
      )
      cy.verifyText(
        AppointmentPage.getProviderName,
        AppointmentData.providerName
      )
      cy.verifyText(
        AppointmentPage.getSpeciality,
        AppointmentData.specialityOfProvider
      )
      cy.verifyText(
        AppointmentPage.getAppointmentDate,
        AppointmentData.expectedDate
      )
      cy.verifyText(
        AppointmentPage.getAptTime,
        AppointmentData.checkInTimeforSingleAppointment
      )
      cy.verifyText(
        AppointmentPage.getAppointmentType,
        AppointmentData.expectedTypeOfAppointment
      )
      cy.verifyText(AppointmentPage.getTitleOfCheckInButton, 'REGISTRARSE')
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPageInSpanish,
        AppointmentData.appointmentPageUrl
      )
      AppointmentPage.clickCheckInBtn()
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetailsInSpanish,
        PaymentDetailsPageData.PaymentPageUrl
      )
      cy.verifyText(PaymentPage.getPaymentTitleInSpanish, 'Pago Guardado')
      cy.verifyText(
        PaymentPage.getOtherModesOfPaymentInSpanish,
        'Otros Modos de Pago'
      )
      cy.verifyRadioButtonChecked(PaymentPage.checkboxForNewCreditDebitCard)
      cy.verifyText(
        PaymentPage.getNewCreditCardInSpanish,
        'Nueva tarjeta de Crédito/Débito'
      )
      cy.verifyRadioButtonChecked(PaymentPage.checkBoxForNewElectronicCheck)
      cy.verifyText(
        PaymentPage.getNewElectronicCheckInSpanish,
        'Nuevo Cheque Electrónico'
      )
      cy.verifyText(PaymentPage.getPayAtFrontDeskInSpanish, '')
      cy.verifyText(PaymentPage.getPaymentReceiptInSpanish, 'Recibo de Pago')
      cy.verifyText(PaymentPage.getEditEmailInSpanish, 'Editar')
      cy.verifyText(
        PaymentPage.getPaymentInformationInSpanish,
        'Información del pago'
      )
      cy.verifyText(PaymentPage.getCopayInSpanish, 'BalanceCopago')
      cy.verifyText(PaymentPage.getPaymentAmountInSpanish, 'Monto a Pagar')
      //cy.verifyText(PaymentPage.getTotalDueInSpanish,'Total Adeudado')
      cy.verifyText(PaymentPage.getCopayOnlyInSpanish, 'Solo Copago')
      cy.verifyText(PaymentPage.getOtherInSpanish, 'Otro')
      cy.verifyText(PaymentPage.getMakePaymentInSpanish, 'REALIZAR UN PAGO')
      cy.verifyText(PaymentPage.getTextOfSkipPaymentInSpanish, 'OMITIR PAGO')
    })
    it('KIOS-2922||Payment || Verify As a Kiosk User should be able to make the payment and see a confirmation message so that he can confirm the payment was processed', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      AppointmentPage.clickCheckInBtn()

      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      )
      PaymentPage.clickOnMakePayment()
      //partially
    })

    it('KIOS-2923||Payment || Verify As a Kiosk User should be able to pay at the desk and view a message to see the Front Desk so that he can pay with Cash or Check', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      AppointmentPage.clickCheckInBtn()

      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      ) //partially
    })
    it('KIOS-2924||Payment || Verify As a Kiosk UserI should be able to request and receive an emailed receipt so that he can have a copy for himself', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      AppointmentPage.clickCheckInBtn()

      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      )
      PaymentPage.clickOnEditEmailForPaymentReceipt()
      PaymentPage.fillEmailField('MARIE1@GMAIL.COM')
      PaymentPage.clickOnMakePayment()
      //complete
    })
    it('KIOS-1603||Payment||Verify spanish version of Pay at the Desk pop up window', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      AppointmentPage.clickCheckInBtn()

      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      )
      //Partially payment page not not loading
    })
    it('KIOS-2994||Payment || Verify As a Kiosk User should be able to add other payment methods and be directed to the 3rd party application so that he can add a new Credit Card or Electronic Check', () => {
      WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB)
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
      AppointmentPage.clickCheckInBtn()

      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      )
      //Partially payment page not not loading
    })
  }
)
