// <reference types="cypress" />

import WelcomePage from "../../pageObjects/pages/welcome.page";
import AppointmentPage from "../../pageObjects/pages/appointment.page";
import PatientData from "./patient.checkin.testdata";
import AppointmentData from "./appointment.detailspage.testdata";
import CheckInPage from "../../pageObjects/pages/checkin.page";
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
        RTApiData.clientIDForPaymentDetailsThree,
        RTApiData.clientSecretkeyPaymentDetailsThree,
        RTApiData.grantType,
        RTApiData.appId,
        PatientData.pnName,
        WelcomePage.generateRandomText(6).slice(1),
        "WEX",
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
      WelcomePage.launchApp("WEX");
      cy.clearCookies();
    });
    it("KIOS-2920||Payment||Verify As a Kiosk User should not be able to view payment page if setup configuration defined to hide the page", () => {
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
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
        ReviewDemographicsPageData.demographicPageUrl
      );
    });
    after(() => {
      cy.deletePatient();
    });
  }
);
