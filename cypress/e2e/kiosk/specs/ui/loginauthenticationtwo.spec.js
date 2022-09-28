///<reference types="cypress" />

import WelcomePage from "../../pageObjects/pages/welcome.page";
import PatientData from "./patient.checkin.testdata";
import RTApiData from "../../specs/api/rt.api.testdata";

describe(
  "LogIn /Authentication Epic test suite",
  {
    retries: 1,
  },
  () => {
    before(() => {
      cy.myPatientAppointment(
        RTApiData.clientIdLogIn,
        RTApiData.clientSecretKeyLogIn,
        RTApiData.grantType,
        RTApiData.appId,
        PatientData.pnName,
        WelcomePage.generateRandomText(6).slice(1),
        "CHE",
        "1", //Number of appointments required
        "3", // Time difference ye comment bhi add kru in all spec file
        "DAD",
        PatientData.pnName.concat(
          WelcomePage.generateRandomText(6) + "@gmail.com"
        )
      );

      cy.wait(Cypress.env("myWait"));
    });
    beforeEach(() => {
      WelcomePage.launchApp("CHE");
      cy.clearCookies();
    });

    it("KIOSK-1130 || logIn ||Verify UI content of pop up window for Error message when user tries to check in more than n minutes in spanish ", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        WelcomePage.convertToggleEnglishToSpanish();
        WelcomePage.welcomeInSpanish().should("have.text", "Bienvenidos");
        WelcomePage.startCheckInForXMinutesForSpanish(
          patient_ln,
          PatientData.validDOB,
          "X minutes"
        );
      });
    });
    it("KIOSK-2586 || logIn ||As kiosk User should be able to check in before X minutes of his first appointment according to the set up configuration ", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB, "X minutes");
      });
    });

    after(() => {
      //This deletes the patient created from Core RT App
      cy.deletePatient();
    });
  }
);
