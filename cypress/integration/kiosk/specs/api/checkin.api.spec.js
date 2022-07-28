/// <reference types="cypress" />

import ApiData from './checkin.api.testdata'

describe.skip('Patient demographics', () => {

    it('TC_API-001: GET patient phone number', function() {

      cy.request( {
        method: 'GET',
        url: Cypress.env('apiURL')
            + 'api/KioskConfig?subdomain=RT&location='+ ApiData.locationId,
        failOnStatusCode: false
        
        }).then(function(response){

            var res = response.body
            expect(response.status).equal(200)
            expect(res.contact).equal(ApiData.contactNumber)
        })
      })

    it('TC_API-002: GET zip code', function() {
    
        cy.request( {
            method: 'GET',
            url: Cypress.env('apiURL') 
                + 'api/KioskConfig/GetZipCode?code='+ ApiData.zipCode,
            failOnStatusCode: false
            
            }).then(function(response){

                var res = response.body
                expect(response.status).equal(200)
                expect(res[0].code).equal(ApiData.zipCode)
            })
    })

    it('TC_API-003: POST patient details', function() {
        
        cy.request( {
            method : "POST",
            url : Cypress.env('apiURL')
                + 'api/Patient/AuthenticatePatientAndGetDetails',
            body : {

                "locationId": ApiData.locationId,
                "lastName": ApiData.lastName,
                "dateOfBirth": ApiData.dateOfBirth,
                "appointmentDate": ApiData.appointmentDate
            }
            
        }).then(function(response){
            expect(response.status).equal(201)
            var res = response.body
            expect(res.lastName).equal(ApiData.lastName)
        })
    })

})
