///<reference types="cypress" />

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

describe(
  "Userstory suite",
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
          WelcomePage.generateRandomText(6) + "@Gmail.com"
        )
      );

      cy.wait(Cypress.env("myWait"));
    });
    beforeEach(() => {
      WelcomePage.launchApp("ZZPOC");
      cy.clearCookies();
    });

    it("KIOS-1556 || Verify if a returning patient without copay  can successfully check in", () => {
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
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.get(AppointmentPage.getPatientName).contains(patient_ln);
      });

      cy.verifyText(AppointmentPage.getPatientDOB, AppointmentData.validDob);
      cy.verifyText(
        AppointmentPage.getSpeciality,
        AppointmentData.specialityOfProvider
      );
      cy.wait(Cypress.env("elementTimeout"));
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);
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
    });

    it("KIOS-1607 || Verify if a returning patient with missing Phone number edit his demographics details and successfully check in", () => {
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
      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);

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
      DemographicPage.clickSaveDemographicsBtn();
      cy.verifyText(
        DemographicPage.getMailingAddress,
        ReviewDemographicsPageData.mailingAddressOfUser
      );
      cy.wait(Cypress.env("elementTimeout"));
      DemographicPage.clickNoChangeNextBtn();
      cy.verifyPage(
        InsurancePage.titleOfInsurancePage,
        InsurancePageData.expectedTitleOfInsurancePage,
        InsurancePageData.insurancePageUrl
      );
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
    });

    it("KIOS-1609||Verify if a returning patient with  copay  can add his missing communication preference", () => {
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

      cy.ClickElementWithJS(AppointmentPage.checkInButtonJS);
      DemographicPage.clickEditButton();
      CommunicationPreferencePage.communicationPreferencePageToggle().should(
        "have.text",
        "No"
      );
      CommunicationPreferencePage.clickCommunicationPreferYesToggle();
      DemographicPage.editCommunicationBtn();
      cy.verifyPage(
        CommunicationPreferencePage.titleOfCommunicationPreference,
        CommunicationPreferencePageData.expectedTitleOfCommunicationPreference,
        CommunicationPreferencePageData.communicationPreferencePageUrl
      );
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.emailForAppointmentInfo
      ).click({ force: true });
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.textHealthInformationAndAlerts
      ).click({ force: true });
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.emailPatientSurveys
      ).click({ force: true });
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.textForVisitSummaries
      ).click({ force: true });
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.staffCommunicationBtn
      ).click();
      cy.verifyButtonEnabled(
        CommunicationPreferencePage.checkInForFuture
      ).click({ force: true });
      CommunicationPreferencePage.clickOnReadAgreement();
      CommunicationPreferencePage.clickSaveCommunicationPreBtn();
      cy.verifyPage(
        DemographicPage.titleEditDemographic,
        ReviewDemographicsPageData.expectedTitleOfEditDemographics,
        ReviewDemographicsPageData.editDemographicUrl
      );
    });
    describe("Multi Appointment Flows", () => {
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
            WelcomePage.generateRandomText(6) + "@Gmail.com"
          )
        );

        cy.wait(62000);
        cy.addAppointment("ZZPOC", "1");
      });
      beforeEach(() => {
        WelcomePage.launchApp("ZZPOC");
        cy.clearCookies();
      });

      it("KIOS-1614||Verify if a returning patient without  copay  having 2 appointments scheduled can successfully check in", () => {
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
        cy.wait(Cypress.env("elementTimeout"));
        CheckInPage.clickPatientBtn();
        cy.verifyPage(
          AppointmentPage.appointmentTitle,
          AppointmentData.expectedTitleOfAppointmentPage,
          AppointmentData.appointmentPageUrl
        );
        AppointmentPage.multiAppointment().then(($el) => {
          for (let index = 0; index < $el.length; index++) {
            AppointmentPage.verifyProviderDetails(index);
          }
        });
        AppointmentPage.getCompareTime();
      });
    });

  //  after(() => {
     // cy.deletePatient();
    //});
  }
);
