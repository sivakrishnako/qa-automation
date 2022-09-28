let access_token = ''
let patient_id = ''
let patient_ln = ''
let isoDate = ''
let contact_id = ''
let insurance_id = ''
let appointment_id = ''

Cypress.Commands.add('enterText', (locatorValue, inputValue) => {
  cy.get(locatorValue).clear()
  cy.get(locatorValue).type(inputValue)
})

Cypress.Commands.add('verifyPage', (locatorValue, pageName, pageUrl) => {
  cy.get(locatorValue, { timeout: 10000 }).should('have.text', pageName)
  cy.url().should('include', pageUrl)
})

Cypress.Commands.add('verifyButtonEnabled', locatorValue => {
  cy.get(locatorValue).should('not.be.disabled')
})

Cypress.Commands.add('verifyCheckBoxChecked', locatorValue => {
  cy.get(locatorValue)
    .should('not.be.visible')
    .check({ force: true })
    .should('be.checked')
})

Cypress.Commands.add('verifyText', (locatorValue, text) => {
  cy.get(locatorValue).should('have.text', text)
})

Cypress.Commands.add('generateAdjustedTime', (strHours, strMins) => {
  let date = new Date()
  //date.setHours(date.getHours() + 1)
  date.setMinutes(date.getMinutes() + 1)
  isoDate = date.toISOString().slice(0, date.toISOString().length - 5)

  console.log('before adjustment-->' + date.toISOString())
  console.log('Adjusted time for appointment--> +' + isoDate)
})

Cypress.Commands.add(
  'getAccessToken',
  (strClientID, strClientSecKey, strGrantType, strAppId) => {
    cy.request({
      method: 'POST',
      url: Cypress.env('rtApiURL') + 'token',
      failOnStatusCode: false,
      form: true,
      body: {
        client_id: strClientID,
        client_secret: strClientSecKey,
        grant_type: strGrantType
      },
      headers: {
        AppId: strAppId
      }
    }).then(response => {
      access_token = response.body.access_token
    })
  }
)

Cypress.Commands.add('addPatient', (strName, strRandom,strEmail) => {
  cy.request({
    method: 'POST',
    url: Cypress.env('rtApiURL') + 'patients',
    failOnStatusCode: false,
    headers: {
      Authorization: 'Bearer ' + access_token,
      Accept: 'application/json'
    },
    body: {
      firstName: strName.concat(strRandom),
      lastName: strName.concat(strRandom),
      birthDate: '2012-11-11',
      title: 'Mr',
      prefPronoun: '',
      prefName: '',
      birthSex: 'male',
      address: '123 Hallway',
      city: '',
      state: '',
      zipCode: '12927',
      phAddress: '',
      phCity: '',
      phState: '',
      phZipCode: '12072',
      homePhone: '',
      workPhone: '(789) 455-5565',
      cellPhone: '',
      cellPhone2: '',
      email: strEmail
    }
  }).then(response => {
    cy.log(response.body)
    expect(response.status).to.equal(201)
    patient_id = response.body.pn
    cy.log('Patient Created is : ' + patient_id)
  })
})

Cypress.Commands.add(
  'addAppointment',
  (strLocation, strCount, strAppointmentTime) => {
  
    let dateObj = new Date()
    dateObj.setHours(dateObj.getHours() - strAppointmentTime)
    dateObj.setMinutes(dateObj.getMinutes() + 10)
    isoDate = dateObj.toISOString().slice(0, dateObj.toISOString().length - 5)
    cy.log('pst Time is  ===>' + isoDate)
    for (let index = 0; index < strCount; index++) {
      cy.request({
        method: 'POST',
        url:
          Cypress.env('rtApiURL') + 'patients/' + patient_id + '/appointments',
        failOnStatusCode: false,
        headers: {
          Authorization: 'Bearer ' + access_token,
          Accept: 'application/json'
        },
        body: {
          provider: 'AUT',
          location: strLocation,
          referral: '',
          apType: 'AUFUV',
          dateTime: isoDate,
          length: '5'
        }
      }).then(response => {
        expect(response.status).equal(201)
        appointment_id = response.body.appointmentId
        cy.log('Appointment  is created for Patient :' + patient_id)
      })
    }
  }
)

Cypress.Commands.add('getPatientDetails', strAccept => {
  cy.request({
    method: 'GET',
    url: Cypress.env('rtApiURL') + 'patients/' + patient_id,
    failOnStatusCode: false,
    headers: {
      Authorization: 'Bearer ' + access_token,
      Accept: strAccept
    }
  }).then(response => {
    expect(response.status).equal(200)
    patient_ln = response.body.name.family
    cy.log('Patient Last name is : -> ' + patient_ln)
    return cy.wrap(patient_ln)
  })
})

Cypress.Commands.add('addEmergencyContact', strContactType => {
  cy.request({
    method: 'POST',
    url: Cypress.env('rtApiURL') + 'patients/' + patient_id + '/contacts',
    failOnStatusCode: false,
    headers: {
      Authorization: 'Bearer ' + access_token,
      Accept: 'application/json'
    },
    body: {
      type: strContactType,
      refCode: '',
      firstName: 'MyEmergency',
      lastName: 'Contact',
      middleName: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '12927',
      homePhone: '(789) 455-5565',
      workPhone: '',
      cellPhone: '',
      fax: '',
      email: '',
      startDate: '',
      endDate: '',
      employer: '',
      occupation: '',
      flags: ['AREP', 'EMERG']
    }
  }).then(response => {
    expect(response.status).to.equal(201)
    contact_id = response.body.contactId
    cy.log('Emergency Contact Created is : ' + contact_id)
  })
})

Cypress.Commands.add(

  'myPatientAppointment',

  (

    strClientID,

    strClientSecKey,

    strGrantType,

    strAppId,

    strName,

    strRandom,

    strLocation,

    strCount,

    strAppointmentTime,

    strContactType,

    strEmail

  ) => {

    cy.getAccessToken(strClientID, strClientSecKey, strGrantType, strAppId)

    cy.addPatient(strName, strRandom,strEmail)

    cy.addAppointment(strLocation, strCount, strAppointmentTime)

    cy.addEmergencyContact(strContactType)

  }

)

Cypress.Commands.add('deletePatient', () => {
  cy.request({
    method: 'DELETE',
    url: Cypress.env('rtApiURL') + 'patients/' + patient_id,
    failOnStatusCode: false,
    headers: {
      Authorization: 'Bearer ' + access_token,
      Accept: 'application/json'
    }
  }).then(response => {
    expect(response.status).to.equal(200)
    expect(response.body).has.to.deep.equal({
      success: true
    })

    cy.request({
      method: 'GET',
      url: Cypress.env('rtApiURL') + 'patients/' + patient_id,
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + access_token,
        Accept: 'application/json'
      }
    }).then(response => {
      expect(response.status).equal(404)
      cy.log('Patient :  ' + patient_ln + '   deleted from Core RT Application')
    })
  })
})

Cypress.Commands.add('ClickElementWithJS', strLocator => {
  cy.window().then(win => {
    win.document.querySelector(strLocator).click()
  })
}) 

Cypress.Commands.add('addInsurance',strAmount => {
  cy.request({
    method: 'POST',
    url: Cypress.env('rtApiURL') + 'patients/' + patient_id + '/insurances',
    failOnStatusCode: false,
    headers: {
      Authorization: 'Bearer ' + access_token,
      Accept: 'application/json'
    },
    body: {
        priority: "primary",
        effectiveFrom: "2022-09-13",
        effectiveTo: "2024-09-13",
        caseId: "00000",
        subscriberId: "23424",
        groupId: "",
        insurance: {
          code: "10028",
          name: "TRICARE WEST UCHMV"
        },
        subscriber: {
          relationship: "self",
          firstName: "Automation",
          lastName: "insurance",
          middleName: "",
          birthSex: "male",
          dob: "2012-11-11",
          address: "123 Hall ways",
          city: "Soldotna",
          state: "AK",
          zipCode: "99669",
          phone: "(789) 455-5555"
      },
      "copay": {
        "amount": strAmount,
        "stdCopayType": "visit"
      }
    }
  }).then(response => {
    cy.log(response.body)
    expect(response.status).to.equal(201)
    insurance_id = response.body.insuranceId
    cy.log('Insurance is added  : ' + insurance_id)
    expect(response.body.success).to.equal(true)
  })
})


Cypress.Commands.add('getCheckInConfirmation', ()=> {
  cy.request({
    method: 'GET',
    url: Cypress.env('rtApiURL') + 'patients/' + patient_id + '/appointments/'+appointment_id,
    failOnStatusCode: false,
    headers: {
      Authorization: 'Bearer ' + access_token,
      Accept: 'application/json'
    }
  }).then(response => {
    expect(response.status).equal(200)
    cy.log('Check in status is : -> ' + response.body.status)
    expect(response.body.status).to.equal("Pending")
  })
})

Cypress.Commands.add('addInsuranceCard', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('apiURL') + 'Patient/InsuranceCard',
    failOnStatusCode: false,
    headers: {
      TenantId: "c94e605d-ea4b-4889-902b-dcfa4bb2fc29"
    },
    body: {
      PatientId: patient_id ,
      InsuranceId: insurance_id,
      InsuranceCards: [
      {
      ImageType: "front",
          "Image":"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"
     },    
     {
      ImageType: "back",
      "Image": "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"
     }
  ]   
  }
  }).then(response => {
    expect(response.status).to.equal(201)
    cy.log('Insurance Card added for : ' + patient_id)
  })
})
