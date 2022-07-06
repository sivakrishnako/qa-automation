///<reference types="cypress" />
import WelcomePage from "../../pageObjects/pages/welcome.page";
import AppointmentPage from "../../pageObjects/pages/appointment.page";
import PatientData from "./patient.checkIn.TestData";
import CheckInPage from "../../pageObjects/pages/checkIn.page";
import AppointmentData from "./appointment.detailsPage.TestData";


describe("CheckIn test suite", () => {
  beforeEach(() => {
    WelcomePage.launchApp();
    cy.clearCookies();
  });

  it(" KIOSK-2116 || CheckIn ||Verify  Valid  error message is getting displayed when patient appointment is not found due to incorrect last name, date of birth,and incorrect both lastName and date of birth ", () => {
    cy.wait(2000);
     WelcomePage.InvalidCheckIn(
      PatientData.invalidLastName,
      PatientData.validDOB,
      PatientData.popupMsg
    );
    WelcomePage.InvalidCheckIn(
      PatientData.validLastName,
      PatientData.invalidDOB,
      PatientData.popupMsg
    );
    WelcomePage.InvalidCheckIn(
      PatientData.invalidLastName,
      PatientData.invalidDOB,
      PatientData.popupMsg
    );
    WelcomePage.clickStartCheckInBtn();
    WelcomePage.getPopupForBlankCredentials().should(
      "have.text",
      PatientData.popupMsg
    );
  });

  it("KIOS-2119 || CheckIn ||Verify Start check In button functionality when user clicks on it and User is able to select Patient from Who are you to identify himself", () => {
    cy.wait(2000);
    WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB);
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
    cy.verifyText(AppointmentPage.getPatientName, PatientData.userFullName);
    cy.verifyText(AppointmentPage.getPatientDOB, AppointmentData.validDob);
  });

  it("KIOS-2120 || CheckIn ||Verify  User is able to select Patient /Authorized Representative from Who are you to identify himself ", () => {
    cy.wait(2000);
    WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB);
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
    cy.verifyText(AppointmentPage.getPatientName, PatientData.userFullName);
    cy.verifyText(AppointmentPage.getPatientDOB, AppointmentData.validDob);
    cy.verifyText(
      AppointmentPage.getSpeciality,
      AppointmentData.specialityOfProvider
    );
  });

  it("KIOSK-2122 || CheckIn ||Verify  User is able to select None from Who are you to identify himself", () => {
    cy.wait(2000);
    WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB);

    CheckInPage.patient().should("have.text", "Patient");
    CheckInPage.authorized().should(
      "have.text",
      "Parent / Authorized Representative"
    );
    CheckInPage.noneOfTheAbove().should("have.text", "None of the above");
    CheckInPage.clickNoneOfTheAbove();
    CheckInPage.getPopupMsgOfNoneOfTheAbove().should(
      "have.text",
      PatientData.popupMsgOfNoneOfTheAbove
    );
    CheckInPage.clickOkBtnPopupOfNoneOfTheAbove();
  });

  it("KIOSK 2123 || CheckIn ||Verify that user can check in with authorized guardian from the list of available option", () => {
    WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB);
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
    CheckInPage.clickGuardianBtn();
    CheckInPage.clickOptFromParent();
    CheckInPage.clickGuardianListContinueBtn();
    cy.verifyPage(
      AppointmentPage.appointmentTitle,
      AppointmentData.expectedTitleOfAppointmentPage,
      AppointmentData.appointmentPageUrl
    );

    AppointmentPage.clickCheckInBtn();

    //      
  });

  it("KIOSK-2124|| CheckIn || Verify that the user is able to logout from application when he clicks on Exit KIOSK ", () => {
    WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB);
    cy.verifyPage(
      CheckInPage.checkInTitle,
      PatientData.expectedTitleOfCheckIn,
      PatientData.checkInPageUrl
    );
    CheckInPage.clickPatientBtn();
    CheckInPage.clickOnDropDown();
    CheckInPage.clickOnExitKioskBtn();

    WelcomePage.titleWelcomePage().should("have.text", "Self Check-In Kiosk");
  });

  it(" KIOSK-2125 || CheckIn || Verify that user is able to translate English Language to spanish for check in page.", () => {
    WelcomePage.startCheckIn(PatientData.validLastName, PatientData.validDOB);
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
    CheckInPage.clickOnDropDown();
    CheckInPage.clickOnExitKioskBtn();
  });
});
