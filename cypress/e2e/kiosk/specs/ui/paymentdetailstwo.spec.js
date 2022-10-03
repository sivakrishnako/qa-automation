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
  "Payment Details spec for hide the page",
  {
    retries: 0,
  },
  () => {
    before(() => {
      cy.myPatientAppointment(
        RTApiData.clientIdForPaymentDetailsTwo,
        RTApiData.clientSecretkeyPaymentDetailsTwo,
        RTApiData.grantType,
        RTApiData.appId,
        PatientData.pnName,
        WelcomePage.generateRandomText(6).slice(1),
        "BRI",
        "1",
        "3",
        "DAD",
        PatientData.pnName.concat(
          WelcomePage.generateRandomText(6) + "@gmail.com"
        )
      );
      cy.addInsurance("2000");
      cy.wait(Cypress.env("myWait"));
    });
    beforeEach(() => {
      WelcomePage.launchApp("BRI");
      cy.clearCookies();
    });

    it("KIOS-3154||Payment Details||To verify the Pop-up message and other UI content in the English version when the skip payment setup configuration does not allow the user to skip the payment.", () => {
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
      AppointmentPage.getChekInButton().click()
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      );

      PaymentPage.clickSkipPayment();
      WelcomePage.getPopupMsg().should(
        "have.text",
        PaymentDetailsPageData.popUpForIfUserClickOnSkipPayment
      );
    });

    it("KIOS-3155||Payment Details||To verify the Pop-up message and other UI content in the Spanish version when the skip payment setup configuration does not allow the user to skip the payment.", () => {
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
      AppointmentPage.getChekInButton().click()
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetailsInSpanish,
        PaymentDetailsPageData.PaymentPageUrl
      );
      PaymentPage.clickSkipPayment();
      WelcomePage.getPopupMsg().should(
        "have.text",
        PaymentDetailsPageData.popUpForIfUserClickOnSkipPaymentInSpanish
      );
    });

    it("KIOS-3300||Payment||Verify As a Kiosk User I should not be able to skip the payment if an amount is due and If skip payment Option set as Y in set up configuration but Copay is applicable", () => {
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
      AppointmentPage.getChekInButton().click()
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      );
      PaymentPage.clickSkipPayment();
      WelcomePage.getPopupMsg().should(
        "have.text",
        PaymentDetailsPageData.popUpForIfUserClickOnSkipPayment
      );
    });

    it("KIOS-2576|| Payment ||Verify As a Kiosk User should not be able to skip the payment if an amount is due and  If skip payment Option set as N in set up configuration and copay is not applicable", () => {
      //unable to create patient with copay 0 .Defect KIOS-3345
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
      AppointmentPage.getChekInButton().click()
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      );
      PaymentPage.clickSkipPayment();
      WelcomePage.getPopupMsg().should(
        "have.text",
        PaymentDetailsPageData.popUpForIfUserClickOnSkipPayment
      );
    });
    after(() => {
      cy.deletePatient();
    });
  }
);
