//<reference types="cypress" />

import WelcomePage from "../../pageObjects/pages/welcome.page";
import AppointmentPage from "../../pageObjects/pages/appointment.page";
import DemographicPage from "../../pageObjects/pages/demographic.page";
import CommunicationPreferencePage from "../../pageObjects/pages/communication.preference.page";
import PatientData from "./patient.checkin.testdata";
import AppointmentData from "./appointment.detailspage.testdata";
import ReviewDemographicsPageData from "./review.demographicspage.testdata";
import CommunicationPreferencePageData from "./communication.preferencePage.testdata";
import CheckInPage from "../../pageObjects/pages/checkin.page";
import InsurancePageData from "./insurancepage.testdata";
import InsurancePage from "../../pageObjects/pages/insurance.page";
import RTApiData from "../api/rt.api.testdata";
import FormListPage from "../../pageObjects/pages/formlist.page";
import FormListPageData from "./formlist.testdata";
import SubmitPage from "../../pageObjects/pages/submit.page";
import SubmitPageData from "./submitpage.testdata";
import PaymentPage from "../../pageObjects/pages/payment.details.page";
import PaymentDetailsPageData from "../../specs/ui/paymentdetails.testdata";

describe(
  "Test Suite For Payment Details Epic",
  {
    retries: 1,
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
      cy.wait(60000);
      cy.getPatientIds().then((patient_id) => {
        cy.getInsuranceIds().then((insurance_id) => {
          let bodyParams = {
            PatientId: patient_id,
            InsuranceId: insurance_id,
            InsuranceCards: [
              {
                ImageType: "front",
                Image:
                  "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",
              },
              {
                ImageType: "back",
                Image:
                  "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",
              },
            ],
          };
          cy.addInsuranceCard(bodyParams);
        });
      });
    });
    beforeEach(() => {
      WelcomePage.launchApp("ZZPOC");
      cy.clearCookies();
    });

    it("KIOS-1521||Demographics Details||To verify save functionality with all valid details and check if its navigated to the next screen or not.", () => {
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
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      );
      PaymentPage.clickSkipPayment();
      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
        ReviewDemographicsPageData.demographicPageUrl
      );
      DemographicPage.clickEditButton();
      for (let index = 0; index < 2; index++) {
        DemographicPage.editTypesOfPhoneNumber(index);
      }
      DemographicPage.fillMailingAddress();
      DemographicPage.clickEmergencyContactPhoneType();
      DemographicPage.clickOptionFromEmergencyPhoneType();
      DemographicPage.fillMiddleName();
      DemographicPage.clickSaveDemographicsBtn();
      cy.verifyPage(
        InsurancePage.titleOfInsurancePage,
        InsurancePageData.expectedTitleOfInsurancePage,
        InsurancePageData.insurancePageUrl
      );
    });

    it("KIOS-5151||Demographics Details||Verify As a Kiosk User  should be able to edit  demographic information so that he can update missing or incorrect information", () => {
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
      AppointmentPage.getCheckInButton().click();
      cy.verifyPage(
        PaymentPage.titleOfPaymentDetails,
        PaymentDetailsPageData.expectedTitleOfPaymentDetails,
        PaymentDetailsPageData.PaymentPageUrl
      );
      PaymentPage.clickSkipPayment();
      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographic,
        ReviewDemographicsPageData.demographicPageUrl
      );
      DemographicPage.clickEditButton();
      DemographicPage.clickOnBirthSexDropDown();
      DemographicPage.getBirthSexValue().click();
      DemographicPage.fillMailingAddress();
      DemographicPage.clickEmergencyContactPhoneType();
      DemographicPage.clickOptionFromEmergencyPhoneType();
      DemographicPage.clickSaveDemographicsBtn();
  
  }

    )

    after(() => {
      cy.deletePatient();
    });
  }
);
