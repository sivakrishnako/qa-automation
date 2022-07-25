/// <reference types="cypress" />

class PatientData {
  static validLastName = 'Mariez'
  static providerName = 'Ameena  Assistant'
  static userFullName = 'Felix  Mariez'
  static userLastNameSkippedDemographics = ' ' //2582 Demographics
  static userLastNameForViewDemographicsForXDays = ' ' //2582 Demographics
  static userDobForViewDemographicsForXDays = ' ' //2583 Demographics
  static usersDobSkippedDemographics = ' ' //2583 Demographics
  static blankInput = ''
  static userLastNameForSkipPaymentPage = ''
  static userDobForSkipPaymentPage = ''
  static validDOB = '01/01/1990'
  static userForCardDetails = 'Oliver'
  static userDobForCardDetails = '03/31/1991'
  static invalidLastName = 'rio'
  static invalidDOB = '03/31/1990'
  static checkInPageUrl = '/check-in'
  static missingHomeNumUserLastName = 'Mariez'
  static missingHomeNumUserDOB = '01/01/1990'
  static missingMandatoryFieldUser = 'Mariez'
  static missingMandatoryFieldUserDOB = '01/01/1990'
  static userLastNameTwoApt = 'Carla'
  static userLastNameThreeApt = 'Rio'
  static userDOBTwoApt = '04/06/1985'
  static expectedTypeOfAppointmentFirst = 'Gym Workout'
  static expectedTypeOfAppointmentTwo = 'Audiology Initial Visit'
  static specialityOfProvider = 'PA,PTA Assistant'
  static expectedTitleOfCheckIn = 'Who are you?'
  static expectedTitleOfCheckInSpanish = '¿Quién es usted'
  static popupMsg = 'Please check in at the front desk.'
  static helpButtonPopupMsg = 'Please see front desk or call (916)555-1212'
  static popupMsgOfNoneOfTheAbove = 'Please check in at the front desk.'
  static popupMsgForBlankCredentials =
    'Please enter Last Name and Date of Birth to continue.'
  static popupMsgForIncorrectCredentialsInSpanish =
    'Por favor regístrese en la recepción.'
  static lastNameOfBeforeNMinutesPatient = ''
  static dobOfBeforeNMinutesPatient = ''
  static checkInTimeForFirstApt = '03:45 PM'
  static checkInTimeTwoApt = '04:30 PM'
  static popupMsgForBeforeNMinutesPatient =
    'Please come back no more than x minutes before your appointment to check'

  static pnName = 'Auto'
}
export default PatientData
