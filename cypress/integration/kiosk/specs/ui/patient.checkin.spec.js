/// <reference types="cypress" />

import WelcomePage from '../../pageObjects/pages/welcome.page';
import AppointmentPage from '../../pageObjects/pages/appointment.page';

import patientData from './patient.checkin.testdata'

describe.skip('Patient Check-in KIOSK', () => {

    it('TC_UI_001 - Patient Successful Check-in', () => {
      
        WelcomePage.startCheckin(patientData.validLastName, patientData.validDOB);
        WelcomePage.clickPatientBtn();
        
        AppointmentPage.getPatientName().should('include.text', patientData.validLastName);
        AppointmentPage.getPatientDOB().should('have.text', patientData.validDOB);
        
    })

    it('TC_UI_002 - Patient Appointment not found', () => {

        WelcomePage.startCheckin(patientData.invalidLastName, patientData.invalidDOB)
        WelcomePage.getPopupMsg().should('have.text', patientData.popupMsg)
        WelcomePage.clickPopupBtnOk();
    
    })
  
    it('TC_UI_003 - Check-in by Authorized guardian', () => {

      WelcomePage.startCheckin(patientData.validLastName, patientData.validDOB);
      WelcomePage.clickGuardianBtn();
      //Add pending steps once pages are available
    })
  
})
