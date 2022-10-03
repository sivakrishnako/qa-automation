///<reference types="cypress" />
import WelcomePage from "../../pageObjects/pages/welcome.page";
import AppointmentPage from "../../pageObjects/pages/appointment.page";
import DemographicPage from "../../pageObjects/pages/demographic.page";
import PatientData from "./patient.checkin.testdata";
import AppointmentData from "./appointment.detailspage.testdata";
import CheckInPage from "../../pageObjects/pages/checkin.page";
import RTApiData from "../../specs/api/rt.api.testdata";

describe(
  "Demographics epic test suite",
  {
    retries: 1,
  },
  () => {
    before(() => {
      cy.myPatientAppointment(
        RTApiData.clientIDForDemographicsThree,
        RTApiData.clientSecretkeyForDemographicsThree,
        RTApiData.grantType,
        RTApiData.appId,
        PatientData.pnName,
        WelcomePage.generateRandomText(6).slice(1),
        "NOR",
        "1",
        "3",
        "DAD",

        PatientData.pnName.concat(
          WelcomePage.generateRandomText(6) + "@gmail.com"
        )
      );
      cy.addInsurance();
      cy.wait(Cypress.env("myWait"));
    });
    beforeEach(() => {
      WelcomePage.launchApp("NOR");
      cy.clearCookies();
    });

    it("KIOSK-2583||Demographic Details|| Verify As a Kiosk User should be able to view his demographics once per x days based on the clinic setup option so that he not asked on every visit ", () => {
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
      AppointmentPage.getChekInButton().click()
      DemographicPage.clickNoChangeNextBtn();
      cy.go("back");
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      );
    });
    it("KIOSK-2582||Demographic Details || Verify As a Kiosk User should skip the demographics based on the clinic setup option so that he can make the check in process faster ", () => {
      WelcomePage.launchApp("NOR");
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
      DemographicPage.clickNoChangeNextBtn();
      cy.go("back");
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      );
    });

    after(() => {
      cy.deletePatient();
    });
  }
);
