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
import InsurancePageData from "./insurancepage.testdata";
import InsurancePage from "../../pageObjects/pages/insurance.page";
import RTApiData from "../api/rt.api.testdata";
import FormListPage from "../../pageObjects/pages/formlist.page";
import FormListPageData from "./formlist.testdata";
import SubmitPage from "../../pageObjects/pages/submit.page";
import SubmitPageData from "./submitpage.testdata";

describe(
  "User story spec file",
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
        "BRI",
        "1",
        "3",
        "DAD",
        PatientData.pnName.concat(
          WelcomePage.generateRandomText(6) + "@Gmail.com"
        )
      );
      cy.addInsurance("2000");
      cy.wait(Cypress.env("myWait"));
    });
    beforeEach(() => {
      WelcomePage.launchApp("BRI");
      cy.clearCookies();
    });


it("KIOS-1606||Payment ||Verify if a returning patient with copay can skip payment and successfully check in", () => {
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
    PaymentPage.clickSkipPayment();
    
    cy.verifyText(
        PaymentPage.getPopUpForSkipPaymentInSpanish,
        PaymentDetailsPageData.popUpForIfUserClickOnSkipPayment
      );
    })
    
   
      after(() => {
         cy.deletePatient();
       });
    })