///<reference types="cypress" />
import WelcomePage from "../../pageObjects/pages/welcome.page";
import AppointmentPage from "../../pageObjects/pages/appointment.page";
import PatientData from "../../specs/ui/patient.checkin.testdata";
import CheckInPage from "../../pageObjects/pages/checkin.page";
import RTApiData from "../../specs/api/rt.api.testdata";
import AppointmentData from "../../specs/ui/appointment.detailspage.testdata";


describe(
  "Test Suite For Appointment confirmation",
  {
    retries: {
      runMode: 3,
      openMode: 1,
    },
  },
  () => {
    before(() => {

      cy.myPatientAppointment(

        RTApiData.clientIdAppointment,

        RTApiData.clientSecretKeyAppointment,

        RTApiData.grantType,

        RTApiData.appId,

        PatientData.pnName,

        WelcomePage.generateRandomText(6).slice(1),

        'ZZPOC',

        '1',

        cy.generateAdjustedTime(1),

        'DAD',

        PatientData.pnName.concat(WelcomePage.generateRandomText(6)+"@Gmail.com")

      )

      cy.wait(Cypress.env('myWait'))

    })

    beforeEach(() => {
      WelcomePage.launchApp("ZZPOC");
      cy.clearCookies();
    });
    it("KIOS-2161 ||Appointment confirmation||Verify a Kiosk User should be able to check in for all his appointment(s) booked", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env('elementTimeout'));
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
      cy.verifyText(AppointmentPage.getPatientAge, AppointmentData.expectedAge);

      cy.verifyText(
        AppointmentPage.getProviderName,
        AppointmentData.providerName
      );
      cy.verifyText(
        AppointmentPage.getSpeciality,
        AppointmentData.specialityOfProvider
      );

      cy.verifyText(
        AppointmentPage.getAppointmentType,
        AppointmentData.expectedTypeOfAppointment
      );
    });
    it("KIOS-2275 ||Appointment confirmation ||Verify that user should be able to view the patient information of the single child if logged in as a Parent/Authorized Representative ", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env('elementTimeout'));
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
      CheckInPage.clickGuardianBtn();
      CheckInPage.clickOptFromParent();
      CheckInPage.clickGuardianListContinueBtn();
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      );
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.get(AppointmentPage.getPatientName).contains(patient_ln);
      });
      cy.verifyText(AppointmentPage.getPatientDOB, AppointmentData.validDob);

      cy.verifyText(AppointmentPage.getPatientAge, AppointmentData.expectedAge);

      cy.verifyText(
        AppointmentPage.getProviderName,
        AppointmentData.providerName
      );
      cy.verifyText(
        AppointmentPage.getSpeciality,
        AppointmentData.specialityOfProvider
      );

      cy.verifyText(
        AppointmentPage.getAppointmentType,
        AppointmentData.expectedTypeOfAppointment
      );
    });
    it("KIOS-2273||Appointment Confirmation || Verify that Appointment details like details of patient, details of provider and separate tile with appointment Date, Time & Type are dislayed", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env('elementTimeout'));
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
      AppointmentPage.getDateOfAppointment()
      AppointmentPage.getTimeOfAppointment()
      cy.verifyText(
        AppointmentPage.getPatientDOB,
        AppointmentData.dobOfPatient
      );
      cy.verifyText(AppointmentPage.getPatientAge, AppointmentData.expectedAge);

      cy.verifyText(
        AppointmentPage.getProviderName,
        AppointmentData.providerName
      );
      cy.verifyText(
        AppointmentPage.getSpeciality,
        AppointmentData.specialityOfProvider
      );

      cy.verifyText(
        AppointmentPage.getAppointmentType,
        AppointmentData.expectedTypeOfAppointment
      );
    });
    it("KIOS-2272||Appointment Confirmation || Verify that user should be able to view the user details dropdown on top of Parent/Authorized representative Appointment page", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env('elementTimeout'));
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

      CheckInPage.clickGuardianBtn();
      CheckInPage.clickOptFromParent();
      CheckInPage.clickGuardianListContinueBtn();

      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      );
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.get(AppointmentPage.getPatientName).contains(patient_ln);
      });
      cy.verifyText(
        AppointmentPage.getPatientDOB,
        AppointmentData.dobOfPatient
      );

    });
    it("KIOS-2171|| Appointment Confirmation || Verify that appointment details header displayed On Appointment Detail Page has user detail dropdown with name displayed", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env('elementTimeout'));
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
      cy.verifyText(
        AppointmentPage.getPatientDOB,
        AppointmentData.dobOfPatient
      );

    });

    it("KIOS-2692||Appointment Confirmation || verify As a Kiosk User ,i should be able to view the details of the child when he has a Authorized Guardian or Representative", () => {
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.wait(Cypress.env('elementTimeout'));
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

      CheckInPage.clickGuardianBtn();
      CheckInPage.clickOptFromParent();
      CheckInPage.clickGuardianListContinueBtn();

      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPage,
        AppointmentData.appointmentPageUrl
      );
      cy.getPatientDetails("application/json").then((patient_ln) => {
        cy.get(AppointmentPage.getPatientName).contains(patient_ln);
      });
      cy.verifyText(
        AppointmentPage.getPatientDOB,
        AppointmentData.dobOfPatient
      );

    });
    describe("Two Appointment", () => {
      before(() => {
        cy.myPatientAppointment(
          RTApiData.clientIdAppointment,

          RTApiData.clientSecretKeyAppointment,

          RTApiData.grantType,

          RTApiData.appId,

          PatientData.pnName,

          WelcomePage.generateRandomText(6).slice(1),

          "ZZPOC",

          "1",

          cy.generateAdjustedTime(1),

          "DAD",

          PatientData.pnName.concat(WelcomePage.generateRandomText(6)+"@Gmail.com")
        );

        cy.wait(62000);

        cy.addAppointment("ZZPOC", "1");
      });

      beforeEach(() => {
        WelcomePage.launchApp("ZZPOC");

        cy.clearCookies();
      });
      it("KIOS-2276||Appointment Confirmation|| Verify that user is able to view Two appointments details scheduled for same day according to time of appointment booked", () => {
        cy.getPatientDetails("application/json").then((patient_ln) => {
          cy.wait(Cypress.env('elementTimeout'));
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

        AppointmentPage.multiAppointment().then(($el) => {
          const count = $el.length;
          for (var index = 0; index < $el.length; index++) {
            AppointmentPage.verifyProviderDetails(index);
          }
        });
        AppointmentPage.getCompareTime()
      });
    });
    describe("Three Appointment", () => {
      before(() => {

        cy.myPatientAppointment(
  
          RTApiData.clientIdAppointment,
  
          RTApiData.clientSecretKeyAppointment,
  
          RTApiData.grantType,
  
          RTApiData.appId,
  
          PatientData.pnName,
  
          WelcomePage.generateRandomText(6).slice(1),
  
          'ZZPOC',
  
          '1',
  
          cy.generateAdjustedTime(1),
  
          'DAD',
  
          PatientData.pnName.concat(WelcomePage.generateRandomText(6)+"@Gmail.com")
  
        )
  
        cy.wait(62000);
        cy.addAppointment("ZZPOC", "2");
  
      })
        

      beforeEach(() => {
        WelcomePage.launchApp("ZZPOC");

        cy.clearCookies();
      });
      it("KIOS-2274||Appointment Confirmation || Verify that user is able to view maximum three appointments details scheduled for same day according to time of appointment", () => {
        cy.getPatientDetails("application/json").then((patient_ln) => {
          cy.wait(Cypress.env('elementTimeout'));
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

        AppointmentPage.multiAppointment().then(($el) => {
        
          for (var index = 0; index < $el.length; index++) {
            AppointmentPage.verifyProviderDetails(index);
          }
        });
      });
    });

    after(() => {
      cy.deletePatient();
    });
  }
);
