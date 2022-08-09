///<reference types="cypress" />
import WelcomePage from '../../pageObjects/pages/welcome.page';
import AppointmentPage from '../../pageObjects/pages/appointment.page';
import DemographicPage from '../../pageObjects/pages/demographic.page';
import CommunicationPreferencePage from '../../pageObjects/pages/communication.preference.page';
import PatientData from './patient.checkin.testdata'
import AppointmentData from './appointment.detailspage.testdata'
import ReviewDemographicsPageData from './review.demographicspage.testdata'
import CommunicationPreferencePageData from './communication.preferencepage.testdata'
import CheckInPage from '../../pageObjects/pages/checkin.page';
import InsurancePage from '../../pageObjects/pages/insurance.page';
import InsurancePageData from './insurancepage.testdata';
import RTApiData from '../../specs/api/rt.api.testdata'

describe(
'Demographics epic test suite',
  {
    retries: {
      runMode: 3,
      openMode: 1
    }
  },
  () => {
    
    
  before(() => {
 cy.myPatientAppointment(
 RTApiData.clientIdDemographics,
 RTApiData.clientSecretKeyDemographics,
 RTApiData.grantType,
 RTApiData.appId,
PatientData.pnName,
 WelcomePage.generateRandomText(6).slice(1),
'ZZPOC',
'1',
cy.generateAdjustedTime(1),
 'DAD'
 )
 cy.wait(Cypress.env('myWait'))
})
beforeEach(() => {
WelcomePage.launchApp('ZZPOC')
      cy.clearCookies()
    })
it('KIOS-2162|| Demographic Details || Verify As a Kiosk User should be able to edit demographic information so that user can update missing or incorrect information', () => {
    cy.getPatientDetails('application/json').then(patient_ln => {
        cy.wait(Cypress.env('elementTimeout'))
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })
    cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
    CheckInPage.patient().should('have.text', 'Patient');
    CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
    CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
    CheckInPage.clickPatientBtn();
    cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
    cy.wait(Cypress.env('elementTimeout'))
    cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographic,ReviewDemographicsPageData.demographicPageUrl);
      
       DemographicPage.clickEditButton();
    
 for (let index = 0; index < 2; index++) {
        cy.log("for loop" +index)
           DemographicPage.editTypesOfPhoneNumber(index)
   
 }

DemographicPage.fillMailingAddress();
DemographicPage.clickEmergencyContactPhoneType()
DemographicPage.clickOptionFromEmergencyPhoneType()
DemographicPage.clickSaveDemographicsBtn();
   cy.verifyText(DemographicPage.getMailingAddress,ReviewDemographicsPageData.mailingAddressOfUser)
})

   it('KIOS-2163|| Demographic Details || Verify a Kiosk User should be able to view his demographic information', () => {
    cy.getPatientDetails('application/json').then(patient_ln => {
       cy.wait(Cypress.env('elementTimeout'))
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })  
        cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
    CheckInPage.patient().should('have.text', 'Patient');
    CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
    CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
    CheckInPage.clickPatientBtn();
    cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
    cy.wait(Cypress.env('elementTimeout'))
    cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
   
cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographic,ReviewDemographicsPageData.demographicPageUrl);
cy.verifyText(DemographicPage.getWorkPhoneNumber,ReviewDemographicsPageData.workPhoneNumber);
cy.verifyText(DemographicPage.getMailingAddress,ReviewDemographicsPageData.mailingAddressOfUser)
   DemographicPage.clickNoChangeNextBtn()
   cy.verifyPage(InsurancePage.titleOfInsurancePage,InsurancePageData.expectedTitleOfInsurancePage,InsurancePageData.insurancePageUrl)

    });
    it("KIOS-2584||Demographic Details||Verify As a Kiosk User should be able to disable electronic communications so that user stop getting electronic notices",()=>{
        cy.getPatientDetails('application/json').then(patient_ln => {
            cy.wait(Cypress.env('elementTimeout'))
            WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
        })   
    cy.verifyPage(CheckInPage.checkInTitle,PatientData.expectedTitleOfCheckIn,PatientData.checkInPageUrl);
    CheckInPage.patient().should('have.text', 'Patient');
    CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
    CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');

CheckInPage.clickPatientBtn()
cy.wait(Cypress.env('elementTimeout'))
cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)

   
    cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographic,ReviewDemographicsPageData.demographicPageUrl);
DemographicPage.clickEditButton();
    cy.verifyButtonEnabled(DemographicPage.saveDemographicsButton);
    CommunicationPreferencePage.communicationPreferencePageToggle().should('have.text','No')
    CommunicationPreferencePage.clickCommunicationPreferNoToggle()
    cy.verifyButtonEnabled(CommunicationPreferencePage.buttonForDisableElectronicCommunication)
    
})
   

it("KIOS-2585||Demographic Details || Verify As a Kiosk User should be able to edit his communication preferences so that he can update missing or incorrect information ",()=>{
    cy.getPatientDetails('application/json').then(patient_ln => {
        cy.wait(Cypress.env('elementTimeout'))
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })   
        cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
        CheckInPage.patient().should('have.text', 'Patient');
        CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
        CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
        CheckInPage.clickPatientBtn();
    cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
       
    cy.wait(Cypress.env(''))
    cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
DemographicPage.clickEditButton();
      CommunicationPreferencePage.communicationPreferencePageToggle().should('have.text', 'No')
        CommunicationPreferencePage.clickCommunicationPreferYesToggle();
        DemographicPage.editCommunicationBtn();
        cy.verifyPage(CommunicationPreferencePage.titleOfCommunicationPreference,CommunicationPreferencePageData.expectedTitleOfCommunicationPreference, CommunicationPreferencePageData.communicationPreferencePageUrl);
        
       cy.verifyButtonEnabled(CommunicationPreferencePage.emailForAppointmentInfo).click({force:true})
        cy.verifyButtonEnabled(CommunicationPreferencePage.textHealthInformationAndAlerts).click({force:true})
        cy.verifyButtonEnabled(CommunicationPreferencePage.emailPatientSurveys).click({force:true})
      cy.verifyButtonEnabled(CommunicationPreferencePage.textForVisitSummaries).click({force:true})
           cy.verifyButtonEnabled(CommunicationPreferencePage.staffCommunicationBtn).click({force:true})
   cy.verifyButtonEnabled(CommunicationPreferencePage.checkInForFuture).click({force:true})
 CommunicationPreferencePage.clickSaveCommunicationPreBtn({force:true})
 cy.verifyPage(DemographicPage.titleEditDemographic,ReviewDemographicsPageData.expectedTitleOfEditDemographics,ReviewDemographicsPageData.editDemographicUrl);
 })

it(" KIOS-2925||Demographic Details || Verify As a Kiosk user should be able to view his dropdown option for the contact type field in edit demographics page",()=>{
    cy.getPatientDetails('application/json').then(patient_ln => {
        cy.wait(Cypress.env('elementTimeout'))
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })   
    cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
    CheckInPage.patient().should('have.text', 'Patient');
    CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
    CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
    CheckInPage.clickPatientBtn();
cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
    
cy.wait(Cypress.env('elementTimeout'))
cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographic,ReviewDemographicsPageData.demographicPageUrl);
DemographicPage.clickEditButton();
DemographicPage.clickOnEmergencyContactType(); 
DemographicPage.clickOptionFromEmergencyContactType();
})
it("KIOS-2914|| Demographic Details || Verify As a Koisk User should be able to search the zip codes by entering the zip code numbers.",()=>{
    cy.getPatientDetails('application/json').then(patient_ln => {
        cy.wait(Cypress.env('elementTimeout'))
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })   
    cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
    CheckInPage.patient().should('have.text', 'Patient');
    CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
    CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
    CheckInPage.clickPatientBtn();
cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
cy.getPatientDetails('application/json').then(patient_ln => {

  cy.get(AppointmentPage.getPatientName).contains(patient_ln)
})
    
 cy.wait(Cypress.env('elementTimeout'))
 cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
   DemographicPage.clickEditButton()
DemographicPage.clickOnZipField()

    
})
it("KIOS-2915||Demographic Details || Verify As a Koisk User should be able to see English to Spanish version of review demographics page",()=>{
    cy.getPatientDetails('application/json').then(patient_ln => {
        cy.wait(Cypress.env('elementTimeout'))
        WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
      })   
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
    cy.wait(Cypress.env('elementTimeout'))
  
    CheckInPage.clickPatientBtn();
    cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPageInSpanish, AppointmentData.appointmentPageUrl);
   cy.verifyText(AppointmentPage.getTitlePatient,'Paciente')
    cy.verifyText(AppointmentPage.getProviderTitle,'Proveedor')
    cy.verifyText(AppointmentPage.getDateTitle,'Fecha')
    cy.verifyText(AppointmentPage.getTimeTitle,'Hora')
    cy.verifyText(AppointmentPage.getTypeOfAppointmentTitle,'Tipo de Cita')
  
cy.verifyText(AppointmentPage.getTitleOfCheckInButton,'REGISTRARSE');
cy.wait(Cypress.env('elementTimeout'))
cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographicInSpanish,ReviewDemographicsPageData.demographicPageUrl);
cy.verifyText(DemographicPage.getTitleOfPatientInformation,'Información Del Paciente')
cy.verifyText(DemographicPage.getNameInSpanish,'Nombre ')
cy.verifyText(DemographicPage.getDobINSpanish,'Fecha de Nacimiento ')
cy.verifyText(DemographicPage.getAgeInSpanish,'Edad ')
cy.verifyText(DemographicPage.getPatientGenderInSpanish,'Sexo al Nacer ')
cy.verifyText(DemographicPage.getPatientSocialSecurityInSpanish,'Seguro Social ')
cy.verifyText(DemographicPage.getPatientEmailIdInSpanish,'Correo Electrónico ')
cy.verifyText(DemographicPage.getTitleOfContactDetailsInSpanish,' Detalles de Contacto')
cy.verifyText(DemographicPage.getEditTextInSpanish,'EDITAR')
cy.verifyText(DemographicPage.getCommunicationPreferenceInSpanish,' Preferencia de Comunicación')
DemographicPage.clickEditButton();
CommunicationPreferencePage.clickCommunicationPreferYesToggle();
cy.verifyText(DemographicPage.getYesTextInSpanish,'SI')
cy.verifyText(DemographicPage.getCommunicateElectronicallyInSpanish,'¿Podemos comunicarnos con usted electrónicamente?')
cy.verifyText(DemographicPage.getMailingAddressTextInSpanish,' Dirección Postal')
DemographicPage.clickOnCancelButton();
cy.verifyText(DemographicPage.getNoChangeNextTextInSpanish,'NO CAMBIAR – SIGUIENTE')



})
it("KIOS-2917||Demographic Details || As a Kiosk User I should be able to view the Hamburger Menu and can navigate to the payment page if payment is not made",()=>{
  cy.getPatientDetails('application/json').then(patient_ln => {
    cy.wait(Cypress.env('elementTimeout'))
    WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
  })   
    cy.verifyPage(CheckInPage.checkInTitle,PatientData.expectedTitleOfCheckIn,PatientData.checkInPageUrl);
    CheckInPage.patient().should('have.text', 'Patient');
    CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
    CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');

CheckInPage.clickPatientBtn()
cy.wait(Cypress.env('elementTimeout'))
    cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
   cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographic,ReviewDemographicsPageData.demographicPageUrl)
   
   
})
xit("KIOS-1444||Verify spanish version of error message for wrong email format in patient information section on Edit demographics page in all devices",()=>{
  cy.getPatientDetails('application/json').then(patient_ln => {
    cy.wait(Cypress.env('elementTimeout'))
    WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
  })   
    cy.verifyPage(
      CheckInPage.checkInTitle,
      PatientData.expectedTitleOfCheckIn,
      PatientData.checkInPageUrl
    );

    WelcomePage.convertToggleEnglishToSpanish();
    CheckInPage.clickPatientBtn();
    cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPageInSpanish, AppointmentData.appointmentPageUrl);
    cy.wait(Cypress.env('elementTimeout'))
    cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
    cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographicInSpanish,ReviewDemographicsPageData.demographicPageUrl);
    
    cy.verifyText(DemographicPage.getCommunicationPreferenceInSpanish,' Preferencia de Comunicación');
    cy.verifyText(DemographicPage.getEditTextInSpanish,'EDITAR')
DemographicPage.clickEditButton();
cy.verifyPage(DemographicPage.titleEditDemographic,ReviewDemographicsPageData.expectedTitleOfEditDemographicInSpanish,ReviewDemographicsPageData.editDemographicUrl);
cy.verifyText(DemographicPage.getTitleOfPatientInformation,ReviewDemographicsPageData.expectedTitlePatientInformationInSpanish);
DemographicPage.fillEmailAddress();

cy.focused().clear();
cy.wait(Cypress.env('elementTimeout'))
    DemographicPage.clickSaveDemographicsBtn();
    cy.wait(Cypress.env('elementTimeout'))
DemographicPage.errorMessageEmail().should("have.text",ReviewDemographicsPageData.popUpForInvalidEmailInSpanish);
cy.wait(Cypress.env('elementTimeout'))


})
it("KIOS-1455||Verify communication preferences Spanish screen UI content ",()=>{
  cy.getPatientDetails('application/json').then(patient_ln => {
    cy.wait(Cypress.env('elementTimeout'))
    WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
  })   
    
    cy.verifyPage(
      CheckInPage.checkInTitle,
      PatientData.expectedTitleOfCheckIn,
      PatientData.checkInPageUrl
    );

    WelcomePage.convertToggleEnglishToSpanish();
    CheckInPage.clickPatientBtn();
    cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPageInSpanish, AppointmentData.appointmentPageUrl);
    cy.wait(Cypress.env('elementTimeout'))
    cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
    cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographicInSpanish,ReviewDemographicsPageData.demographicPageUrl);
    cy.verifyText(DemographicPage.getCommunicationPreferenceInSpanish,' Preferencia de Comunicación')
    cy.verifyText(DemographicPage.getEditTextInSpanish,'EDITAR')
DemographicPage.clickEditButton()
CommunicationPreferencePage.communicationPreferencePageToggle().should('have.text', 'No')
CommunicationPreferencePage.clickCommunicationPreferYesToggle();
DemographicPage.editCommunicationBtn();
cy.verifyPage(CommunicationPreferencePage.titleOfCommunicationPreference,CommunicationPreferencePageData.expectedTitleOfCommunicationPreferenceInSpanish,CommunicationPreferencePageData.communicationPreferencePageUrl);
cy.verifyText(CommunicationPreferencePage.cancelButtonInSpanish,CommunicationPreferencePageData.expectedCancelInSpanish);
cy.verifyText(CommunicationPreferencePage.saveButtonInSpanish,CommunicationPreferencePageData.expectedSaveInSpanish);
cy.verifyText(CommunicationPreferencePage.staffCommunicationInSpanish,CommunicationPreferencePageData.expectedStaffCommunicationInSpanish);
cy.verifyText(CommunicationPreferencePage.checkInForFutureInSpanish,CommunicationPreferencePageData.expectedCheckInForFutureInSpanish);
cy.verifyText(CommunicationPreferencePage.receiveAppointmentInformation,CommunicationPreferencePageData.expectedReceiveAppointmentInformationInSpanish);
cy.verifyText(CommunicationPreferencePage.healthInformationAndAlerts,CommunicationPreferencePageData.expectedHealthInformationAndAlertsInSpanish);
cy.verifyText(CommunicationPreferencePage.patientSurveys,CommunicationPreferencePageData.expectedPatientSurveysInSpanish);
cy.verifyText(CommunicationPreferencePage.visitSummaries,CommunicationPreferencePageData.expectedVisitSummariesInSpanish);
cy.verifyText(CommunicationPreferencePage.SendNotificationInSpanish,CommunicationPreferencePageData.expectedSendNotificationInSpanish);
cy.verifyText(CommunicationPreferencePage.textForAppointmentInfoInSpanish,CommunicationPreferencePageData.expectedTextForAppointmentInfoInSpanish);
cy.verifyText(CommunicationPreferencePage.textForHealthInformationAndAlertsInSpanish,CommunicationPreferencePageData.expectedTextForAppointmentInfoInSpanish);
cy.verifyText(CommunicationPreferencePage.textForPatientSurveysInSpanish,CommunicationPreferencePageData.expectedTextForAppointmentInfoInSpanish);
cy.verifyText(CommunicationPreferencePage.textForVisitSummariesInSpanish,CommunicationPreferencePageData.expectedTextForAppointmentInfoInSpanish);
cy.verifyText(CommunicationPreferencePage.readAgreement,CommunicationPreferencePageData.expectedReadAgreementInSpanish);
cy.verifyText(CommunicationPreferencePage.fullNameInSpanish,CommunicationPreferencePageData.expectedFullNameInSpanish);
cy.verifyText(CommunicationPreferencePage.cellNumberInSpanish,CommunicationPreferencePageData.expectedCellNumberInSpanish);
cy.verifyText(CommunicationPreferencePage.emailInSpanish,CommunicationPreferencePageData.expectedEmailInSpanish);

})
it("KIOS-1457||Demographics Details|| To check the agreement page Spanish translation UI content",()=>{
  cy.getPatientDetails('application/json').then(patient_ln => {
    cy.wait(Cypress.env('elementTimeout'))
    WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
  })   
    cy.verifyPage(
      CheckInPage.checkInTitle,
      PatientData.expectedTitleOfCheckIn,
      PatientData.checkInPageUrl
    );

    WelcomePage.convertToggleEnglishToSpanish();
    CheckInPage.clickPatientBtn();
    cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPageInSpanish, AppointmentData.appointmentPageUrl);
    cy.wait(Cypress.env('elementTimeout'))
    cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
    cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographicInSpanish,ReviewDemographicsPageData.demographicPageUrl);
    cy.verifyText(DemographicPage.getCommunicationPreferenceInSpanish,' Preferencia de Comunicación')
    cy.verifyText(DemographicPage.getEditTextInSpanish,'EDITAR')
DemographicPage.clickEditButton();
CommunicationPreferencePage.communicationPreferencePageToggle().should('have.text', 'No')
CommunicationPreferencePage.clickCommunicationPreferYesToggle();
DemographicPage.editCommunicationBtn();
cy.verifyPage(CommunicationPreferencePage.titleOfCommunicationPreference,CommunicationPreferencePageData.expectedTitleOfCommunicationPreferenceInSpanish,CommunicationPreferencePageData.communicationPreferencePageUrl);
CommunicationPreferencePage.clickOnAgreement();
cy.wait(20000);
cy.verifyText(CommunicationPreferencePage.titleOfAgreementInSpanish,CommunicationPreferencePageData.expectedTitleOfAgreementInSpanish);

})
it("KIOS-2565||Demographics||To check the Birth sex drop-down list.",()=>{
  cy.getPatientDetails('application/json').then(patient_ln => {
    cy.wait(Cypress.env('elementTimeout'))
    WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
  })  
 
  
cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
CheckInPage.patient().should('have.text', 'Patient');
CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
CheckInPage.clickPatientBtn();
cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
cy.wait(Cypress.env('elementTimeout'))
cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
DemographicPage.clickEditButton()
DemographicPage.clickOnBirthSexDropDown()
DemographicPage.verifyDropdownOption()

})
it('KIOS-2993|| Demographic Details || Demographic Details || Verify As a Koisk User able to see Pop up window when the user type anything invalid and clicks on the Save button.', () => {
  cy.getPatientDetails('application/json').then(patient_ln => {
    cy.wait(Cypress.env('elementTimeout'))
    WelcomePage.startCheckIn(patient_ln, PatientData.validDOB)
  })   
    cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
    CheckInPage.patient().should('have.text', 'Patient');
    CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
    CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
    CheckInPage.clickPatientBtn();
    cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
    cy.wait(Cypress.env('elementTimeout'))
    cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
    cy.verifyPage(DemographicPage.titleReviewDemographic,ReviewDemographicsPageData.expectedTitleOfReviewDemographic,ReviewDemographicsPageData.demographicPageUrl);
     DemographicPage.clickEditButton();
     DemographicPage.fillInvalidFirstName()
    cy.focused().clear();
    cy.get('body').click(50, 50, { force: true })
    
    DemographicPage.clickSaveDemographicsBtn();
    
    
    
    DemographicPage.popupMsgForInvalidFirstName().should("have.text",ReviewDemographicsPageData.popUpMsg)
    cy.wait(Cypress.env('elementTimeout'))
    DemographicPage.clickPopupButtonOkMsgDemo();
   });
    

  describe('Verifying demographics page', () => {
      before(() => {
        cy.myPatientAppointment(
        RTApiData.clientIdDemographics,
        RTApiData.clientSecretKeyDemographics,
        RTApiData.grantType,
        RTApiData.appId,
       PatientData.pnName,
        WelcomePage.generateRandomText(6).slice(1),
       'NOR',
       '1',
       cy.generateAdjustedTime(1),
        'DAD'
        )
       })

      it('KIOSK-2582||Demographic Details || Verify As a Kiosk User should skip the demographics based on the clinic setup option so that he can make the check in process faster ', () => {
        WelcomePage.launchApp('NOR')
        cy.getPatientDetails('application/json').then(patient_ln => {
          cy.wait(Cypress.env('elementTimeout'))
          WelcomePage.startCheckIn(
            patient_ln,
            PatientData.validDOB,

          )
        })
        cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
        CheckInPage.patient().should('have.text', 'Patient');
        CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
        CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
        CheckInPage.clickPatientBtn();
    cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
        
    cy.wait(Cypress.env('elementTimeout'))
        cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
        DemographicPage.clickNoChangeNextBtn()
        cy.go('back')
        cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
        

      })

 it('KIOSK-2583||Demographic Details|| Verify As a Kiosk User should be able to view his demographics once per x days based on the clinic setup option so that he not asked on every visit ', () => {
        WelcomePage.launchApp('NOR')
        cy.getPatientDetails('application/json').then(patient_ln => {
          cy.wait(Cypress.env('elementTimeout'))
          WelcomePage.startCheckIn(
            patient_ln,
            PatientData.validDOB,
            
          )
        })
        cy.verifyPage(CheckInPage.checkInTitle, PatientData.expectedTitleOfCheckIn, PatientData.checkInPageUrl);
        CheckInPage.patient().should('have.text', 'Patient');
        CheckInPage.authorized().should('have.text', 'Parent / Authorized Representative');
        CheckInPage.noneOfTheAbove().should('have.text', 'None of the above');
        CheckInPage.clickPatientBtn();
    cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
    cy.wait(Cypress.env('elementTimeout'))
        cy.ClickElementWithJS(AppointmentPage.checkInButtonJS)
        DemographicPage.clickNoChangeNextBtn()
        cy.go('back')
        cy.verifyPage(AppointmentPage.appointmentTitle,AppointmentData.expectedTitleOfAppointmentPage, AppointmentData.appointmentPageUrl);
        

        
      })


      
  })
  after(() => {
    
       cy.deletePatient()
   })
  

})
