let access_token = "";
let patient_id = "";
let patient_ln = "";
let isoDate = "";
let contact_id = "";
let insurance_id = "";
let appointment_id = "";

Cypress.Commands.add("enterText", (locatorValue, inputValue) => {
  cy.get(locatorValue).clear();
  cy.get(locatorValue).type(inputValue);
});

Cypress.Commands.add("verifyPage", (locatorValue, pageName, pageUrl) => {
  cy.get(locatorValue, { timeout: 10000 }).should("have.text", pageName);
  cy.url().should("include", pageUrl);
});

Cypress.Commands.add("verifyButtonEnabled", (locatorValue) => {
  cy.get(locatorValue).should("not.be.disabled");
});

Cypress.Commands.add("verifyCheckBoxChecked", (locatorValue) => {
  cy.get(locatorValue)
    .should("not.be.visible")
    .check({ force: true })
    .should("be.checked");
});

Cypress.Commands.add("verifyText", (locatorValue, text) => {
  cy.get(locatorValue).should("have.text", text);
});

Cypress.Commands.add("generateAdjustedTime", (strHours, strMins) => {
  let date = new Date();
  //date.setHours(date.getHours() + 1)
  date.setMinutes(date.getMinutes() + 1);
  isoDate = date.toISOString().slice(0, date.toISOString().length - 5);

  console.log("before adjustment-->" + date.toISOString());
  console.log("Adjusted time for appointment--> +" + isoDate);
});

Cypress.Commands.add(
  "getAccessToken",
  (strClientID, strClientSecKey, strGrantType, strAppId) => {
    cy.request({
      method: "POST",
      url: Cypress.env("rtApiURL") + "token",
      failOnStatusCode: false,
      form: true,
      body: {
        client_id: strClientID,
        client_secret: strClientSecKey,
        grant_type: strGrantType,
      },
      headers: {
        AppId: strAppId,
      },
    }).then((response) => {
      access_token = response.body.access_token;
    });
  }
);

Cypress.Commands.add("addPatient", (strName, strRandom, strEmail) => {
  cy.request({
    method: "POST",
    url: Cypress.env("rtApiURL") + "patients",
    failOnStatusCode: false,
    headers: {
      Authorization: "Bearer " + access_token,
      Accept: "application/json",
    },
    body: {
      firstName: strName.concat(strRandom),
      lastName: strName.concat(strRandom),
      birthDate: "2012-11-11",
      title: "Mr",
      prefPronoun: "",
      prefName: "",
      birthSex: "male",
      address: "123 Hallway",
      city: "",
      state: "",
      zipCode: "12927",
      phAddress: "",
      phCity: "",
      phState: "",
      phZipCode: "12072",
      homePhone: "",
      workPhone: "(789) 455-5565",
      cellPhone: "",
      cellPhone2: "",
      email: strEmail,
    },
  }).then((response) => {
    cy.log(response.body);
    expect(response.status).to.equal(201);
    patient_id = response.body.pn;
    cy.log("Patient Created is : " + patient_id);
  });
});

Cypress.Commands.add(
  "addAppointment",
  (strLocation, strCount, strAppointmentTime) => {
    let dateObj = new Date();
    dateObj.setHours(dateObj.getHours() - strAppointmentTime);
    dateObj.setMinutes(dateObj.getMinutes() + 10);
    isoDate = dateObj.toISOString().slice(0, dateObj.toISOString().length - 5);
    cy.log("pst Time is  ===>" + isoDate);
    for (let index = 0; index < strCount; index++) {
      cy.request({
        method: "POST",
        url:
          Cypress.env("rtApiURL") + "patients/" + patient_id + "/appointments",
        failOnStatusCode: false,
        headers: {
          Authorization: "Bearer " + access_token,
          Accept: "application/json",
        },
        body: {
          provider: "AUT",
          location: strLocation,
          referral: "",
          apType: "AUFUV",
          dateTime: isoDate,
          length: "5",
        },
      }).then((response) => {
        expect(response.status).equal(201);
        appointment_id = response.body.appointmentId;
        cy.log("Appointment  is created for Patient :" + patient_id);
      });
    }
  }
);

Cypress.Commands.add("getPatientDetails", (strAccept) => {
  cy.request({
    method: "GET",
    url: Cypress.env("rtApiURL") + "patients/" + patient_id,
    failOnStatusCode: false,
    headers: {
      Authorization: "Bearer " + access_token,
      Accept: strAccept,
    },
  }).then((response) => {
    expect(response.status).equal(200);
    patient_ln = response.body.name.family;
    cy.log("Patient Last name is : -> " + patient_ln);
    return cy.wrap(patient_ln);
  });
});

Cypress.Commands.add("addEmergencyContact", (strContactType) => {
  cy.request({
    method: "POST",
    url: Cypress.env("rtApiURL") + "patients/" + patient_id + "/contacts",
    failOnStatusCode: false,
    headers: {
      Authorization: "Bearer " + access_token,
      Accept: "application/json",
    },
    body: {
      type: strContactType,
      refCode: "",
      firstName: "MyEmergency",
      lastName: "Contact",
      middleName: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "12927",
      homePhone: "(789) 455-5565",
      workPhone: "",
      cellPhone: "",
      fax: "",
      email: "",
      startDate: "",
      endDate: "",
      employer: "",
      occupation: "",
      flags: ["AREP", "EMERG"],
    },
  }).then((response) => {
    expect(response.status).to.equal(201);
    contact_id = response.body.contactId;
    cy.log("Emergency Contact Created is : " + contact_id);
  });
});

Cypress.Commands.add(
  "myPatientAppointment",

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
    cy.getAccessToken(strClientID, strClientSecKey, strGrantType, strAppId);

    cy.addPatient(strName, strRandom, strEmail);

    cy.addAppointment(strLocation, strCount, strAppointmentTime);

    cy.addEmergencyContact(strContactType);
  }
);

Cypress.Commands.add("deletePatient", () => {
  cy.request({
    method: "DELETE",
    url: Cypress.env("rtApiURL") + "patients/" + patient_id,
    failOnStatusCode: false,
    headers: {
      Authorization: "Bearer " + access_token,
      Accept: "application/json",
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).has.to.deep.equal({
      success: true,
    });

    cy.request({
      method: "GET",
      url: Cypress.env("rtApiURL") + "patients/" + patient_id,
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + access_token,
        Accept: "application/json",
      },
    }).then((response) => {
      expect(response.status).equal(404);
      cy.log(
        "Patient :  " + patient_ln + "   deleted from Core RT Application"
      );
    });
  });
});

Cypress.Commands.add("ClickElementWithJS", (strLocator) => {
  cy.window().then((win) => {
    win.document.querySelector(strLocator).click();
  });
});

Cypress.Commands.add("addInsurance", (strAmount) => {
  cy.request({
    method: "POST",
    url: Cypress.env("rtApiURL") + "patients/" + patient_id + "/insurances",
    failOnStatusCode: false,
    headers: {
      Authorization: "Bearer " + access_token,
      Accept: "application/json",
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
        name: "TRICARE WEST UCHMV",
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
        phone: "(789) 455-5555",
      },
      copay: {
        amount: strAmount,
        stdCopayType: "visit",
      },
    },
  }).then((response) => {
    cy.log(response.body);
    expect(response.status).to.equal(201);
    insurance_id = response.body.insuranceId;
    cy.log("Insurance is added  : " + insurance_id);
    expect(response.body.success).to.equal(true);
  });
});

Cypress.Commands.add("getCheckInConfirmation", () => {
  cy.request({
    method: "GET",
    url:
      Cypress.env("rtApiURL") +
      "patients/" +
      patient_id +
      "/appointments/" +
      appointment_id,
    failOnStatusCode: false,
    headers: {
      Authorization: "Bearer " + access_token,
      Accept: "application/json",
    },
  }).then((response) => {
    expect(response.status).equal(200);
    cy.log("Check in status is : -> " + response.body.status);
    expect(response.body.status).to.equal("Pending");
  });
});

Cypress.Commands.add("getPaymentId", () => {
  cy.request({
    method: "GET",
    url:
      Cypress.env("rtApiURL") +
      "modules/kioskapi/patients/" +
      patient_id +
      "/paymenturl?FormType=paymentOnly&PayMethod=CreditCard&SaleMethod=K&loc=01",
    failOnStatusCode: false,
    headers: {
      Authorization: "Bearer " + access_token,
      Accept: "application/json",
    },
    Params: {
      Amount: "10",
    },
  }).then((response) => {
    console.log("response -->   " + JSON.stringify(response.body));
    expect(response.status).equal(200);
    payment_id = response.body.paymentId;
    cy.log("Patient Payment id is : -> " + payment_id);
    return cy.wrap(payment_id);
  });
});

Cypress.Commands.add("getPaymentConfirmation", () => {
  cy.request({
    method: "GET",
    url: Cypress.env("rtApiURL") + "payment/PaymentResult?",
    failOnStatusCode: false,
    headers: {
      ClientId: "C0A6A6A6A6A6",
      PartnerId: "dat",
      TenantId: "c5b6b2c0-5d9b-4b42-bb1b-5e1c0357131d",
    },
    Params: {
      PatientId: patient_id,
      PaymentId: payment_id,
    },
  }).then((response) => {
    expect(response.status).equal(200);
    successful_msg = response.body.message;
    cy.log("Patient payment successful: -> " + successful_msg);
    return cy.wrap(successful_msg);
  });
});
Cypress.Commands.add("addInsuranceCard", (strBodyParams) => {
  cy.request({
    method: "POST",
    url: Cypress.env("apiURL") + "Patient/InsuranceCard",
    failOnStatusCode: false,
    headers: {
      TenantId: "c5b6b2c0-5d9b-4b42-bb1b-5e1c0357131d",
      "content-type": "application/json",
      Accept: "*/*",
      AcceptEncoding: "gzip, deflate, br",
    },
    body: JSON.stringify(strBodyParams),
  }).then((response) => {
    cy.log("response  -->" + JSON.stringify(response.body));
    cy.log("Insurance Card added for : " + patient_id);
  });
});
Cypress.Commands.add("getPatientIds", () => {
  return cy.wrap(patient_id);
});
Cypress.Commands.add("getInsuranceIds", () => {
  return cy.wrap(insurance_id);
});
