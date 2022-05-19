/// <reference types="cypress" />

class AppointmentPage
{
    static getPatientName() { 
        return cy.get('.patient-info > .MuiTypography-h4');
    }
                                    
    static getPatientDOB() { 
        return cy.get('.patient-info > :nth-child(3) > :nth-child(2)'); 
    }

    static getAppointmentDate() { 
        return cy.get(':nth-child(1) > .appointment-info'); 
    }
    
    static getProviderName() { 
        return cy.get('.provider-info > .MuiTypography-h4'); 
    }

    static clickCheckinBtn() { 
        const button = cy.get('.cardFooter > .MuiButton-root');
        button.click();

        return this;
    }
    
}
export default AppointmentPage;