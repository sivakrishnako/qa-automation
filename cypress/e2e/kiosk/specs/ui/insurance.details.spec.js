///<reference types="cypress" />

import WelcomePage from "../../pageObjects/pages/welcome.page";
import AppointmentPage from "../../pageObjects/pages/appointment.page";
import DemographicPage from "../../pageObjects/pages/demographic.page";
import CommunicationPreferencePage from "../../pageObjects/pages/communication.preference.page";
import PatientData from "./patient.checkIn.TestData";
import AppointmentData from "./appointment.detailsPage.TestData";
import ReviewDemographicsPageData from "./review.DemographicsPage.TestData";

import CheckInPage from "../../pageObjects/pages/checkIn.page";
import InsurancePage from "../../pageObjects/pages/insurance.page";
import InsurancePageData from "./../ui/insurancepage.testdata";
import FormsPage from "../../pageObjects/pages/formlist.page";
import FormsPageData from "../../specs/ui/formlist.testdata";

describe.skip(
  "Insurance test suite",
  {
    retries: {
      runMode: 3,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      WelcomePage.launchApp();
      cy.clearCookies();
    });
    it.only("KIOS-2919 || Insurance || verify As a Kiosk User should be able to view his insurance cards and make no change so that he can move to the next step", () => {
      WelcomePage.startCheckIn("Mariez", PatientData.validDOB);
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
      cy.wait(20000);
      AppointmentPage.clickCheckInBtn();
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
      cy.verifyText(
        InsurancePage.frontSideTitle,
        InsurancePageData.expectedFrontSideTitle
      );
      cy.verifyText(
        InsurancePage.backSideTitle,
        InsurancePageData.expectedBackSideTitle
      );
      InsurancePage.clickNoChangeNextBtn();
      cy.verifyPage(
        FormsPage.titleOfFormsPage,
        FormsPageData.expectedTitleOfFormsPage,
        FormsPageData.formsPageUrl
      );
    });
    it("KIOS-2804 || Insurance || Verify functionality of cancel icon in desktop and mobile view", () => {
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
      cy.wait(20000);
      AppointmentPage.clickCheckInBtn();
      cy.wait(20000);
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
      InsurancePage.clickEditInsuranceBtn();
      InsurancePage.clickOnCancelBtnFrontCard();
    });
    it("KIOS-3985|| To verify contents of Edit Insurance page in Spanish when camera is not available in device", () => {
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
      cy.wait(2000);

      CheckInPage.clickPatientBtn();
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPageInSpanish,
        AppointmentData.appointmentPageUrl
      );
      cy.verifyText(AppointmentPage.getTitlePatient, "Paciente");
      cy.verifyText(AppointmentPage.getProviderTitle, "Proveedor");
      cy.verifyText(AppointmentPage.getDateTitle, "Fecha");
      cy.verifyText(AppointmentPage.getTimeTitle, "Hora");
      cy.verifyText(AppointmentPage.getTypeOfAppointmentTitle, "Tipo de Cita");
      cy.verifyText(
        AppointmentPage.getAppointmentType,
        AppointmentData.expectedTypeOfAppointment
      );
      cy.verifyText(AppointmentPage.getTitleOfCheckInButton, "REGISTRARSE");
      cy.wait(20000);
      AppointmentPage.clickCheckInBtn();
      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographicInSpanish,
        ReviewDemographicsPageData.demographicPageUrl
      );
      cy.verifyText(
        DemographicPage.getTitleOfPatientInformation,
        "Información Del Paciente"
      );
      cy.verifyText(DemographicPage.getNameInSpanish, "Nombre ");
      cy.verifyText(DemographicPage.getDobINSpanish, "Fecha de Nacimiento ");
      cy.verifyText(DemographicPage.getAgeInSpanish, "Edad ");
      cy.verifyText(
        DemographicPage.getPatientGenderInSpanish,
        "Sexo al Nacer "
      );
      cy.verifyText(
        DemographicPage.getPatientSocialSecurityInSpanish,
        "Seguro Social "
      );
      cy.verifyText(
        DemographicPage.getPatientEmailIdInSpanish,
        "Correo Electrónico "
      );
      cy.verifyText(
        DemographicPage.getTitleOfContactDetailsInSpanish,
        " Detalles de Contacto"
      );
      cy.verifyText(DemographicPage.getEditTextInSpanish, "EDITAR");
      cy.verifyText(
        DemographicPage.getCommunicationPreferenceInSpanish,
        " Preferencia de Comunicación"
      );
      DemographicPage.clickEditButton();
      CommunicationPreferencePage.clickCommunicationPreferYesToggle();
      cy.verifyText(DemographicPage.getYesTextInSpanish, "SI");
      cy.verifyText(
        DemographicPage.getCommunicateElectronicallyInSpanish,
        "¿Podemos comunicarnos con usted electrónicamente?"
      );
      cy.verifyText(
        DemographicPage.getMailingAddressTextInSpanish,
        " Dirección Postal"
      );
      DemographicPage.clickOnCancelButton();
      cy.verifyText(
        DemographicPage.getNoChangeNextTextInSpanish,
        "NO CAMBIAR – SIGUIENTE"
      );
      DemographicPage.clickNoChangeNextBtn();

      cy.verifyPage(
        InsurancePage.titleOfInsurancePage,
        InsurancePageData.expectedTitleOfInsurancePageInSpanish,
        InsurancePageData.insurancePageUrl
      );
      cy.verifyText(InsurancePage.frontSideTitleInSpanish, "Parte Frontal");
      cy.verifyText(InsurancePage.backSideTitleInSpanish, "Parte Trasera");
      cy.verifyText(InsurancePage.editButtonInSpanish, "Editar");
      cy.verifyText(InsurancePage.backButtonInSpanish, "ATRAS");
      cy.verifyText(
        InsurancePage.noChangeButtonInSpanish,
        "NO CAMBIAR – SIGUIENTE"
      );
      InsurancePage.clickEditInsuranceBtn();
      cy.verifyPage(
        InsurancePage.titleOfEditInsurancePageInSpanish,
        InsurancePageData.expectedTitleOfEditInsurancePageInSpanish,
        InsurancePageData.editInsurancePageUrl
      );
      cy.verifyText(
        InsurancePage.uploadCardNotificationInSpanish,
        "Please upload your Insurance Card here."
      );
      cy.verifyText(InsurancePage.saveButtonInSpanish, "GUARDAR");
      cy.verifyText(InsurancePage.editBackSideTitleInSpanish, "Parte Trasera");
      //cy.verifyText(InsurancePage.backButtonInSpanish,'ATRAS');

      //cy.verifyText(InsurancePage.frontSideTitleInSpanish,'Parte Frontal');
    });
    it("KIOS-3221 || Insurance || |Verify if send upload link gets enable once user select any checkbox option from send upload link page in desktop and mobile view", () => {
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
      cy.wait(20000);
      AppointmentPage.clickCheckInBtn();
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
      InsurancePage.clickEditInsuranceBtn();
    });
    it("KIOS-3207 || Insurance || Verify if user is able to upload new image from desktop and mobile view when camera is available", () => {
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
      cy.wait(20000);
      AppointmentPage.clickCheckInBtn();
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
      InsurancePage.clickEditInsuranceBtn();
      InsurancePage.clickOnCancelBtnFrontCard();
    });
    it("KIOS-3982|| To verify contents of Review Insurance page in Spanish", () => {
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
      cy.wait(2000);

      CheckInPage.clickPatientBtn();
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPageInSpanish,
        AppointmentData.appointmentPageUrl
      );
      cy.verifyText(AppointmentPage.getTitlePatient, "Paciente");
      cy.verifyText(AppointmentPage.getProviderTitle, "Proveedor");
      cy.verifyText(AppointmentPage.getDateTitle, "Fecha");
      cy.verifyText(AppointmentPage.getTimeTitle, "Hora");
      cy.verifyText(AppointmentPage.getTypeOfAppointmentTitle, "Tipo de Cita");
      cy.verifyText(
        AppointmentPage.getAppointmentType,
        AppointmentData.expectedTypeOfAppointment
      );
      cy.verifyText(AppointmentPage.getTitleOfCheckInButton, "REGISTRARSE");
      cy.wait(20000);
      AppointmentPage.clickCheckInBtn();

      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographicInSpanish,
        ReviewDemographicsPageData.demographicPageUrl
      );
      cy.verifyText(
        DemographicPage.getTitleOfPatientInformation,
        "Información Del Paciente"
      );
      cy.verifyText(DemographicPage.getNameInSpanish, "Nombre ");
      cy.verifyText(DemographicPage.getDobINSpanish, "Fecha de Nacimiento ");
      cy.verifyText(DemographicPage.getAgeInSpanish, "Edad ");
      cy.verifyText(
        DemographicPage.getPatientGenderInSpanish,
        "Sexo al Nacer "
      );
      cy.verifyText(
        DemographicPage.getPatientSocialSecurityInSpanish,
        "Seguro Social "
      );
      cy.verifyText(
        DemographicPage.getPatientEmailIdInSpanish,
        "Correo Electrónico "
      );
      cy.verifyText(
        DemographicPage.getTitleOfContactDetailsInSpanish,
        " Detalles de Contacto"
      );
      cy.verifyText(DemographicPage.getEditTextInSpanish, "EDITAR");
      cy.verifyText(
        DemographicPage.getCommunicationPreferenceInSpanish,
        " Preferencia de Comunicación"
      );
      DemographicPage.clickEditButton();
      CommunicationPreferencePage.clickCommunicationPreferYesToggle();
      cy.verifyText(DemographicPage.getYesTextInSpanish, "SI");
      cy.verifyText(
        DemographicPage.getCommunicateElectronicallyInSpanish,
        "¿Podemos comunicarnos con usted electrónicamente?"
      );
      cy.verifyText(
        DemographicPage.getMailingAddressTextInSpanish,
        " Dirección Postal"
      );
      DemographicPage.clickOnCancelButton();
      cy.verifyText(
        DemographicPage.getNoChangeNextTextInSpanish,
        "NO CAMBIAR – SIGUIENTE"
      );
      DemographicPage.clickNoChangeNextBtn();
      cy.verifyPage(
        InsurancePage.titleOfInsurancePage,
        InsurancePageData.expectedTitleOfInsurancePageInSpanish,
        InsurancePageData.insurancePageUrl
      );
      cy.verifyText(InsurancePage.frontSideTitleInSpanish, "Parte Frontal");
      cy.verifyText(InsurancePage.backSideTitleInSpanish, "Parte Trasera");
      cy.verifyText(InsurancePage.editButtonInSpanish, "Editar");
      cy.verifyText(InsurancePage.backButtonInSpanish, "ATRAS");
      cy.verifyText(
        InsurancePage.noChangeButtonInSpanish,
        "NO CAMBIAR – SIGUIENTE"
      );
      InsurancePage.clickOnHamburgerMenu();
      cy.verifyText(
        InsurancePage.reviewDemographicsInSpanish,
        "Revisar Información Demográfica"
      );
      cy.verifyText(
        InsurancePage.communicationPreferenceInSpanish,
        "Preferencia de Comunicación"
      );
    });
    it("KIOS-3984||To verify contents of Edit Insurance page in Spanish when camera is available in device and when insurance card images are added", () => {
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
      cy.wait(2000);

      CheckInPage.clickPatientBtn();
      cy.verifyPage(
        AppointmentPage.appointmentTitle,
        AppointmentData.expectedTitleOfAppointmentPageInSpanish,
        AppointmentData.appointmentPageUrl
      );
      cy.verifyText(AppointmentPage.getTitlePatient, "Paciente");
      cy.verifyText(AppointmentPage.getProviderTitle, "Proveedor");
      cy.verifyText(AppointmentPage.getDateTitle, "Fecha");
      cy.verifyText(AppointmentPage.getTimeTitle, "Hora");
      cy.verifyText(AppointmentPage.getTypeOfAppointmentTitle, "Tipo de Cita");
      cy.verifyText(
        AppointmentPage.getAppointmentType,
        AppointmentData.expectedTypeOfAppointment
      );
      cy.verifyText(AppointmentPage.getTitleOfCheckInButton, "REGISTRARSE");
      cy.wait(20000);
      AppointmentPage.clickCheckInBtn();
      cy.verifyPage(
        DemographicPage.titleReviewDemographic,
        ReviewDemographicsPageData.expectedTitleOfReviewDemographicInSpanish,
        ReviewDemographicsPageData.demographicPageUrl
      );
      cy.verifyText(
        DemographicPage.getTitleOfPatientInformation,
        "Información Del Paciente"
      );
      cy.verifyText(DemographicPage.getNameInSpanish, "Nombre ");
      cy.verifyText(DemographicPage.getDobINSpanish, "Fecha de Nacimiento ");
      cy.verifyText(DemographicPage.getAgeInSpanish, "Edad ");
      cy.verifyText(
        DemographicPage.getPatientGenderInSpanish,
        "Sexo al Nacer "
      );
      cy.verifyText(
        DemographicPage.getPatientSocialSecurityInSpanish,
        "Seguro Social "
      );
      cy.verifyText(
        DemographicPage.getPatientEmailIdInSpanish,
        "Correo Electrónico "
      );
      cy.verifyText(
        DemographicPage.getTitleOfContactDetailsInSpanish,
        " Detalles de Contacto"
      );
      cy.verifyText(DemographicPage.getEditTextInSpanish, "EDITAR");
      cy.verifyText(
        DemographicPage.getCommunicationPreferenceInSpanish,
        " Preferencia de Comunicación"
      );
      DemographicPage.clickEditButton();
      CommunicationPreferencePage.clickCommunicationPreferYesToggle();
      cy.verifyText(DemographicPage.getYesTextInSpanish, "SI");
      cy.verifyText(
        DemographicPage.getCommunicateElectronicallyInSpanish,
        "¿Podemos comunicarnos con usted electrónicamente?"
      );
      cy.verifyText(
        DemographicPage.getMailingAddressTextInSpanish,
        " Dirección Postal"
      );
      DemographicPage.clickOnCancelButton();
      cy.verifyText(
        DemographicPage.getNoChangeNextTextInSpanish,
        "NO CAMBIAR – SIGUIENTE"
      );
      DemographicPage.clickNoChangeNextBtn();

      cy.verifyPage(
        InsurancePage.titleOfInsurancePage,
        InsurancePageData.expectedTitleOfInsurancePageInSpanish,
        InsurancePageData.insurancePageUrl
      );
      cy.verifyText(InsurancePage.frontSideTitleInSpanish, "Parte Frontal");
      cy.verifyText(InsurancePage.backSideTitleInSpanish, "Parte Trasera");
      cy.verifyText(InsurancePage.editButtonInSpanish, "Editar");
      cy.verifyText(InsurancePage.backButtonInSpanish, "ATRAS");
      cy.verifyText(
        InsurancePage.noChangeButtonInSpanish,
        "NO CAMBIAR – SIGUIENTE"
      );
      InsurancePage.clickEditInsuranceBtn();
      cy.verifyPage(
        InsurancePage.titleOfEditInsurancePageInSpanish,
        InsurancePageData.expectedTitleOfEditInsurancePageInSpanish,
        InsurancePageData.editInsurancePageUrl
      );
      cy.verifyText(
        InsurancePage.uploadCardNotificationInSpanish,
        "Please upload your Insurance Card here."
      );
      cy.verifyText(InsurancePage.saveButtonInSpanish, "GUARDAR");
      cy.verifyText(InsurancePage.editBackSideTitleInSpanish, "Parte Trasera");
      //cy.verifyText(InsurancePage.backButtonInSpanish,'ATRAS');

      //cy.verifyText(InsurancePage.frontSideTitleInSpanish,'Parte Frontal');
    });
    it("KIOS-4227 || Insurance || |Verify As a Kiosk User I should be able to edit my insurance cards and upload new images using file upload so that I can let the clinic know if my insurance has changed or if I have not submitted the cards already", () => {
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
      cy.wait(20000);
      AppointmentPage.clickCheckInBtn();
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
      InsurancePage.clickEditInsuranceBtn();
    });
    it('KIOS-4196 || Insurance ||To verify if no image appears in box which have "No image to display" message', () => {
      WelcomePage.startCheckIn(
        PatientData.validLastNameForSingleInsuranceCard,
        PatientData.validDOB
      );
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
      cy.wait(20000);
      AppointmentPage.clickCheckInBtn();
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
      cy.verifyText(
        InsurancePage.frontSideTitle,
        InsurancePageData.expectedFrontSideTitle
      );
      cy.verifyText(
        InsurancePage.backSideTitle,
        InsurancePageData.expectedBackSideTitle
      );
      cy.verifyText(
        InsurancePage.noImageToDisplayMessage,
        InsurancePageData.expectedNoImageToDisplayMessage
      );
    });
  }
);
