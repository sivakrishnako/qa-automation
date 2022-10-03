/// <reference types="cypress" />
import AppointmentData from "../../specs/ui/appointment.detailspage.testdata";
import PatientData from "../../specs/ui/patient.checkin.testdata";
class AppointmentPage {
  static appointmentTitle = '[data-testid="card-tittle"]';
  static getPatientName = '[data-testid="patient-name"]';
  static getProviderName = '[data-testid="provider-name"]';
  static getPatientDOB = '[data-testid="patient-DOB"]';
  static getPatientAge = '[data-testid="patient-age"]';
  static getGenderOfProvider = '[data-testid="patient-gender"]';
  static getAppointmentDate = '[data-testid="appointment-date"]';
  static getSpeciality = '[data-testid="provider-specialty"]';
  static getAptTime = '[data-testid="appointment-time"]';
  static getAppointmentType = '[data-testid="appointment-type"]';
  static getPatientNameAtDropDowN = ".MuiButton-root > .MuiTypography-root";
  static getTitlePatient = '[data-testid="title"]';
  static getProviderTitle = '[data-testid="provider-title"]';
  static getDateTitle = '[data-testid="appointment-date-label"]';
  static getTimeTitle = '[data-testid="appointment-time-label"]';
  static getTypeOfAppointmentTitle = '[data-testid="appointment-type-label"]';
  static getTitleOfCheckInButton = '[data-testid="singleAppointmentCheckIn"]';
  static checkInButtonJS = "#mui-6";
  static checkInButtonForAuthRepJS = "#mui-7";
  static getCompareTime() {
    cy.get(
      "div:nth-of-type(1) > .providerWrapper > h6:nth-of-type(2) > .providerInfo"
    )
      .invoke("text")
      .then((strTime1) => {
        cy.get(
          "[data-testid='providerWrapper_1'] .providerInfo[data-testid='appointment-time']"
        )
          .invoke("text")
          .then((strTime2) => {
            assert(strTime2 > strTime1);
          });
      });
    return this;
  }
  static clickHelpButtonOfAppointmentPage() {
    const Button = cy.get('[data-testid="HelpOutlineIcon"]', {
      timeout: Cypress.env("elementTimeout"),
    });
    Button.click();
  }
  static popupMsg() {
    return cy.contains(AppointmentData.helpButtonPopupMsg);
  }
  static clickOkButtonPopup() {
    const button = cy.get('[data-testid="helpModalOk"]');
    button.click();
    return this;
  }
  static clickCheckInForMultiApt() {
    const button = cy.get('[data-testid="multiAppointmentCheckIn"]');
    button.click();
    return this;
  }
  static multiAppointment() {
    return cy.get(".providerWrapper", {
      timeout: Cypress.env("elementTimeout"),
    });
  }
  static getProvidersName(index) {
    const strProviderName =
      "[data-testid='providerWrapper_" +
      index +
      "'] [data-testid='provider-name']";

    return cy.get(strProviderName);
  }
  static getSpecialityOfProvider(index) {
    const strProviderSpeciality =
      "[data-testid='providerWrapper_" +
      index +
      "'] [data-testid='provider-specialty']";
    cy.log(strProviderSpeciality);
    return cy.get(strProviderSpeciality);
  }
  static TypeOfPhone(index) {
    const strTypeOfPhone =
      "[data-testid='emergency-phone-type-" + index + "-label']";
    cy.log(strTypeOfPhone);
    return cy.get(strTypeOfPhone);
  }

  static getTimeOfAppointment(index) {
    const strTimeOfAppointment =
      "[data-testid='providerWrapper_" +
      index +
      "'] [data-testid='appointment-time']";
    cy.log(strTimeOfAppointment);
    return cy.get(strTimeOfAppointment);
  }
  static getTimeOfAppointmentTwo(index) {
    const strTimeOfAppointment =
      "[data-testid='providerWrapper_" +
      index +
      "'] [data-testid='appointment-time']";
    cy.log(strTimeOfAppointment);
    return cy.get(strTimeOfAppointment);
  }
  static convertedTimeTwo() {
    const convertTime12to24ForSecondApt = (time12h) => {
      const [time, modifier] = time12h.split(" ");
      let [hours, minutes] = time.split(":");
      if (hours === "12") {
        hours = "00";
      }
      if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
      }
      return `${hours}:${minutes}`;
    };

    let convertedTimeTwo = convertTime12to24ForSecondApt(
      PatientData.checkInTimeTwoApt
    );

    console.log(convertedTimeTwo);
    return convertedTimeTwo;
  }

  static getTypeOfAppointment(index) {
    const strTypeOfAppointment =
      "[data-testid='providerWrapper_" +
      index +
      "'] [data-testid='appointment-type']";
    cy.log(strTypeOfAppointment);
    return cy.get(strTypeOfAppointment);
  }
  static verifyProviderDetails(index) {
    this.getProvidersName(index).should(
      "have.text",
      AppointmentData.providerName
    );
    this.getSpecialityOfProvider(index).should(
      "have.text",
      PatientData.specialityOfProvider
    );
  }

  static getDateOfAppointment() {
    cy.get('[data-testid="appointment-date"]').should("be.visible");
    return this;
  }
  static getTimeOfAppointment() {
    cy.get('[data-testid="appointment-time"]').should("be.visible");

    return this;
  }

  static clickOnDropDown() {
    const button = cy.get(
      '[data-testid="KeyboardArrowDownIcon"]',

      { timeout: Cypress.env("elementTimeout") }
    );

    button.click();

    return this;
  }

  static clickOnExitKioskBtn() {
    this.clickOnDropDown();

    const button = cy.get(
      '[data-testid="exit-kiosk"]',

      { timeout: Cypress.env("elementTimeout") }
    );

    button.click();

    return this;
  }
  static getChekInButton(){

    return cy.get('[data-testid="singleAppointmentCheckIn"]')

  }
}

export default AppointmentPage;
