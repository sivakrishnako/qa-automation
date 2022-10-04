///<reference types="cypress" />

import WelcomePage from "../../pageObjects/pages/welcome.page";
import AppointmentPage from "../../pageObjects/pages/appointment.page";
import DemographicPage from "../../pageObjects/pages/demographic.page";
import PatientData from "./patient.checkin.testdata";
import AppointmentData from "./appointment.detailspage.testdata";
import ReviewDemographicsPageData from "./review.demographicspage.testdata";
import CheckInPage from "../../pageObjects/pages/checkin.page";
import InsurancePageData from "./insurancepage.testdata";
import InsurancePage from "../../pageObjects/pages/insurance.page";
import RTApiData from "../api/rt.api.testdata";
import FormListPage from "../../pageObjects/pages/formlist.page";
import FormListPageData from "./formlist.testdata";
import SubmitPage from "../../pageObjects/pages/submit.page";
import SubmitPageData from "./submitpage.testdata";
import PaymentPage from "../../pageObjects/pages/payment.details.page";


describe(
  "Test Suite For Appointment confirmation part 2",
  {
    retries: 0,
  },
  () => {
    before(() => {
      cy.myPatientAppointment(
        RTApiData.clientIDForUserStory,
        RTApiData.clientSecretKeyForUserStory,
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
      //cy.addInsuranceCard();
      cy.wait(Cypress.env("myWait"));
    });
    beforeEach(() => {
      WelcomePage.launchApp("ZZPOC");
      cy.clearCookies();
    });

    it("KIOS-4481|| Appointment confirmation ||Verify As a Raintree user I should see the status of the appointment updated after check in is complete so I know who has checked in", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
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
      AppointmentPage.getCheckInButton().click()
      PaymentPage.clickSkipPayment();
      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
        ReviewDemographicsPageData.demographicPageUrl
      );
      DemographicPage.clickNoChangeNextBtn();
      cy.verifyPage(
        InsurancePage.titleOfInsurancePage,
        InsurancePageData.expectedTitleOfInsurancePage,
        InsurancePageData.insurancePageUrl
      );
      cy.wait(Cypress.env("myWait"));
      InsurancePage.clickOnNoChangeNext();
      InsurancePage.clickOnNoChangeNext();
      cy.verifyPage(
        FormListPage.getTitleOfPage,
        FormListPageData.expectedTitleOfFormList,
        FormListPageData.formListPageUrl
      );
      FormListPage.clickOnNoChangeNext();
      cy.verifyPage(
        SubmitPage.getTitleOfSubmitPage,
        SubmitPageData.expectedTitleOfSubmit,
        SubmitPageData.submitPageUrl
      );
      cy.getCheckInConfirmation();
    });
    after(() => {
      cy.deletePatient();
    });
  }
);
