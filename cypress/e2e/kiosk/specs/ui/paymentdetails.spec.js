/// <reference types="cypress" />

import WelcomePage from "../../pageObjects/pages/welcome.page";
import AppointmentPage from "../../pageObjects/pages/appointment.page";
import PatientData from "./patient.checkin.testdata";
import AppointmentData from "./appointment.detailspage.testdata";
import CheckInPage from "../../pageObjects/pages/checkin.page";
import PaymentPage from "../../pageObjects/pages/payment.details.page";
import PaymentDetailsPageData from "../../specs/ui/paymentdetails.testdata";
import DemographicPage from "../../pageObjects/pages/demographic.page";
import ReviewDemographicsPageData from "../../specs/ui/review.demographicsPage.testdata";
import RTApiData from "../../specs/api/rt.api.testdata";

describe(
  "Payment Details epic spec file",
  {
    retries: 1,
  },
  () => {
    before(() => {
      cy.myPatientAppointment(
        RTApiData.clientIdPaymentDetails,
       RTApiData.clientSecretKeyPaymentDetails,
      RTApiData.grantType,
        RTApiData.appId,
        PatientData.pnName,
        WelcomePage.generateRandomText(6).slice(1),
        "ZZPOC",
        "1", 
        "7",
        "DAD",
        PatientData.pnName.concat(
          WelcomePage.generateRandomText(6) + "@gmail.com"
        )
      );
      cy.addInsurance("2000");
      cy.wait(Cypress.env("myWait"));
    });
    beforeEach(() => {
      WelcomePage.launchApp("ZZPOC");
      cy.clearCookies();
    });

    it.only("KIOS-2578||Payment Details||Verify As a Kiosk User  should be able to enter the amount user is going to pay so that user can pay something other the full amount due", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env("elementTimeout"));
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB);
      });
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      );
      CheckInPage.patient().should("have.text", "Patient");
      CheckInPage.authorized().should(
        "have.text",
        "Parent / Authorized Representative"
      );
      CheckInPage.noneOfTheAbove().should("have.text", "None of the above");
      CheckInPage.clickPatientBtn();
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      );
      cy.wait(Cypress.env("elementTimeout"));
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      );
      PaymentPage.clickOnOtherForPaymentInsteadOfPayFullAmount();
      PaymentPage.fillAmountByManually();
      PaymentPage.verifyAmount();
    });

    it("KIOS-2581||Payment Details||Verify As a Kiosk User should be able to view his balance and copay information", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env("elementTimeout"));
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB);
      });
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      );
      CheckInPage.patient().should("have.text", "Patient");
      CheckInPage.authorized().should(
        "have.text",
        "Parent / Authorized Representative"
      );
      CheckInPage.noneOfTheAbove().should("have.text", "None of the above");
      CheckInPage.clickPatientBtn();
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      );
      cy.wait(Cypress.env("elementTimeout"));
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);

      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      );
      PaymentPage.totalDueAmount();
      
    });

    it("KIOS-1602||Payment Details||Verify spanish version of payment details page", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env("elementTimeout"));
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB);
      });
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      );

      WelcomePage.convertToggleEnglishToSpanish();
      CheckInPage.patient().should("have.text", "Paciente");
      CheckInPage.authorized().should(
        "have.text",
        "Padre / Representante Autorizado"
      );
      CheckInPage.noneOfTheAbove().should(
        "have.text",
        "Ninguna de las Anteriores"
      );
      CheckInPage.clickPatientBtn();
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPageInSpanish,
        AppointmentData.appointmentPageUrl
      );
      cy.verifyText(AppointmentPage.getTitlePatient, "Paciente");
      cy.verifyText(AppointmentPage.getProviderTitle, "Proveedor");
      cy.verifyText(AppointmentPage.getDateTitle, "Fecha");
      cy.verifyText(AppointmentPage.getTimeTitle, "Hora");
      cy.verifyText(AppointmentPage.getTypeOfAppointmentTitle, "Tipo de Cita");
      cy.verifyText(AppointmentPage.getTitleOfCheckInButton, "REGISTRARSE");
      cy.wait(Cypress.env("elementTimeout"));
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);

      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetailsInSpanish,
        PaymentDetailsPageData.PaymentPageUrl
      );
      cy.verifyText(PaymentPage.getPaymentTitleInSpanish, "Pago Guardado");
      cy.verifyText(
        PaymentPage.getOtherModesOfPaymentInSpanish,
        "Otros Modos de Pago"
      );

      cy.verifyText(
        PaymentPage.getNewCreditCardInSpanish,
        "Nueva tarjeta de Crédito/Débito"
      );

      cy.verifyText(
        PaymentPage.getNewElectronicCheckInSpanish,
        "Nuevo Cheque Electrónico"
      );
      cy.verifyText(
        PaymentPage.getPayAtFrontDeskInSpanish,
        "Paga en el Mostrador"
      );
      cy.verifyText(PaymentPage.getPaymentReceiptInSpanish, "Recibo de Pago");
      cy.verifyText(PaymentPage.getEditEmailInSpanish, "Editar");
      cy.verifyText(
        PaymentPage.getPaymentInformationInSpanish,
        "Información del pago"
      );

      cy.verifyText(PaymentPage.getPaymentAmountInSpanish, "Monto a Pagar");
      cy.verifyText(PaymentPage.getCopayOnlyInSpanish, "Solo Copago");
      cy.verifyText(PaymentPage.getOtherInSpanish, "Otro");
      cy.verifyText(PaymentPage.getMakePaymentInSpanish, "REALIZAR UN PAGO");
      cy.verifyText(PaymentPage.getTextOfSkipPaymentInSpanish, "OMITIR PAGO");
    });

    it("KIOS-2923||Payment || Verify As a Kiosk User should be able to pay at the desk and view a message to see the Front Desk so that he can pay with Cash or Check", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env("elementTimeout"));
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB);
      });
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      );
      CheckInPage.patient().should("have.text", "Patient");
      CheckInPage.authorized().should(
        "have.text",
        "Parent / Authorized Representative"
      );
      CheckInPage.noneOfTheAbove().should("have.text", "None of the above");
      CheckInPage.clickPatientBtn();
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      );
      cy.wait(Cypress.env("elementTimeout"));
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      );
      cy.wait(Cypress.env("elementTimeout"));
      PaymentPage.clickPayAtFrontDesk();

      cy.verifyText(
        PaymentPage.getPopUpForPayAtFrontDesk,
        PaymentDetailsPageData.popUpForPayAtFrontDesk
      );

      
    });

   

    it("KIOS-1603||Payment Details||Verify spanish version of Pay at the Desk pop up window", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env("elementTimeout"));
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB);
      });
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      );
      WelcomePage.convertToggleEnglishToSpanish();
      CheckInPage.clickPatientBtn();
      cy.wait(Cypress.env("elementTimeout"));
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetailsInSpanish,
        PaymentDetailsPageData.PaymentPageUrl
      );
      cy.verifyText(PaymentPage.getPaymentTitleInSpanish, "Pago Guardado");
      PaymentPage.clickPayAtFrontDesk();

      cy.verifyText(
        PaymentPage.getPopUpForPayAtFrontDesk,
        PaymentDetailsPageData.popUpForPayAtfrontDeskInSpanish
      );
    });

    it("KIOS-3920||Payment Details||To verify user can able to see Do you want to save this payment for future use? toggle switch with YES or NO option or not.", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env("elementTimeout"));
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB);
      });
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      );
      CheckInPage.clickPatientBtn();
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      );
      cy.wait(Cypress.env("elementTimeout"));
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      );
      PaymentPage.paymentPageYesToggleForFutureUse().should("have.text", "Yes");
      PaymentPage.paymentPageYesToggleForFutureUse().should("be.exist");
      PaymentPage.paymentPageNoToggleForFutureUse().should("have.text", "No");
      PaymentPage.paymentPageNoToggleForFutureUse().should("be.exist");
     
    });

    it("KIOS-4159||Payment Details||To verify what message should user able to see when there is no saved cards present on payment screen.", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env("elementTimeout"));
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB);
      });
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      );
      CheckInPage.clickPatientBtn();
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      );
      cy.wait(Cypress.env("elementTimeout"));
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      );
      cy.verifyText(
        PaymentPage.textWhenCardsAreNotAvailable,
        PaymentDetailsPageData.textWhenCardsNotAvailable
      );
    });
    it("KIOS-2577||Payment||Verify As a Kiosk User  should be able to skip the payment so that user can move on without making a payment", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env("elementTimeout"));
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB);
      });
      cy.verifyPage(
        CheckInPage.checkInTitle,
        PatientData.expectedTitleOfCheckIn,
        PatientData.checkInPageUrl
      );
      CheckInPage.patient().should("have.text", "Patient");
      CheckInPage.authorized().should(
        "have.text",
        "Parent / Authorized Representative"
      );
      CheckInPage.noneOfTheAbove().should("have.text", "None of the above");
      CheckInPage.clickPatientBtn();
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      );
      cy.wait(Cypress.env("elementTimeout"));
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      );
PaymentPage.clickSkipPayment()
      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
        ReviewDemographicsPageData.demographicPageUrl
      );
     
    });
    describe("Payment Details||Patient with no dues", () => {
      before(() => {
        cy.myPatientAppointment(
          RTApiData.clientIdDemographics,
          RTApiData.clientSecretKeyDemographics,
          RTApiData.grantType,
          RTApiData.appId,
          PatientData.pnName,
          WelcomePage.generateRandomText(6).slice(1),
          "ZZPOC",
          "1",
          "7",
          "DAD",
          PatientData.pnName.concat(
            WelcomePage.generateRandomText(6) + "@Gmail.com"
          )
        );

        cy.wait(Cypress.env("myWait"));
      });
      it("KIOS-2579||Payment||Verify As a Kiosk User should be able to skip the Payment page if there is no dues to pay", () => {
        cy.getPatientDetails("application/json").then((patient_ln) => {
          cy.wait(Cypress.env("elementTimeout"));
          WelcomePage.startCheckIn(patient_ln, PatientData.validDOB);
        });
        cy.verifyPage(
          CheckInPage.checkInTitle,
          PatientData.expectedTitleOfCheckIn,
          PatientData.checkInPageUrl
        );
        CheckInPage.patient().should("have.text", "Patient");
        CheckInPage.authorized().should(
          "have.text",
          "Parent / Authorized Representative"
        );
        CheckInPage.noneOfTheAbove().should("have.text", "None of the above");
        CheckInPage.clickPatientBtn();
        cy.verifyPage(
          AppointmentPage.appointmentTitle,
          AppointmentData.expectedTitleOfAppointmentPage,
          AppointmentData.appointmentPageUrl
        );
        cy.wait(Cypress.env("elementTimeout"));
        cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);
  
        cy.verifyPage(
          DemographicPage.titleReviewDemographic,
          ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
          ReviewDemographicsPageData.demographicPageUrl
        );
        
      });
  
      
    });


    after(() => {
     cy.deletePatient()
     })
  }
);
