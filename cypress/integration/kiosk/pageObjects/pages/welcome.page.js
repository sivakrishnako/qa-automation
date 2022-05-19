/// <reference types="cypress" />

class WelcomePage
{
    static launchApp() {
        cy.visit('/')
    }
    static fillLastName(value) { 
        const field = cy.get('#patientLastName');
        field.clear();
        field.type(value);
        return this;
    }

    static fillPatientDoB(dateOfBirth) { 
        const field = cy.get('#mui-3');
        field.clear();
        field.type(dateOfBirth);

        return this;
    }
    
    static clickStartCheckinbtn() { 
        const button = cy.get('[data-testid="startCheckIn"]');
        button.click();

        return this;
     }

    static clickResetBtn() {
        const button = cy.get('[data-testid="AutorenewIcon"]');
        button.click();

        return this;
    }
        
    static getPopupMsg() { 
        return cy.get('#modal-modal-description');
     }
    
    static clickPopupBtnOk() { 
        const button = cy.get('.MuiGrid-container > .MuiGrid-root > .MuiButton-root');
        button.click;

        return this;
    }

    static clickPatientBtn() { 
        const button = cy.get(':nth-child(1) > .MuiListItemButton-root > .MuiListItemText-root > .MuiTypography-root');
        button.click();

        return this;
     }

     static clickGuardianBtn() { 
        const button = cy.get(':nth-child(2) > .MuiListItemButton-root');
        button.click();

        return this;
     }

     static clickNoneBtn() { 
        const button = cy.get(':nth-child(3) > .MuiListItemButton-root');
        button.click();

        return this;
     }

     static clickExistKioskBtn() { 
        const button = cy.get('.MuiButton-root');
        button.click();

        return this;
     }

    static startCheckin(lastName, dateOfBirth) {
        cy.visit('/');
        this.fillLastName(lastName)
        this.fillPatientDoB(dateOfBirth)
        this.clickStartCheckinbtn();
    }
}
export default WelcomePage;