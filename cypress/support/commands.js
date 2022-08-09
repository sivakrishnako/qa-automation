let access_token = ''
let patient_id = ''
let patient_ln = ''
let isoDate = ''
let contact_id = ''
let isoDate1 = ''
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

Cypress.Commands.add('addPatient', (strName, strRandom) => {
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
      birthDate: '1990-01-01',
      title: 'Mr',
      prefPronoun: '',
      prefName: '',
      birthSex: 'male',
      address: '123 Hallway',
      city: '',
      state: '',
      zipCode: '',
      phAddress: '',
      phCity: '',
      phState: '',
      phZipCode: '',
      homePhone: '',
      workPhone: '(789) 455-5565',
      cellPhone: '',
      cellPhone2: '',
      email: strName.concat(strRandom) + '@gmail.com'
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
    dateObj.setHours(dateObj.getHours() - 7)
    dateObj.setMinutes(dateObj.getMinutes() + 10)
    isoDate = dateObj.toISOString().slice(0, dateObj.toISOString().length - 5)
    console.log('pst Time is  ===>' + isoDate)
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
        cy.log(response.body)
        expect(response.status).equal(201)
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
      zipCode: '',
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
    strContactType
  ) => {
    cy.getAccessToken(strClientID, strClientSecKey, strGrantType, strAppId)
    cy.addPatient(strName, strRandom)
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
