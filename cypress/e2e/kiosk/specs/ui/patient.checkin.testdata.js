/// <reference types="cypress" />

class PatientData {
  static blankInput = ''
  static userLastNameForSkipPaymentPage = ''
  static userDobForSkipPaymentPage = ''
  static validDOB = '11/11/2012'
  static checkInPageUrl = '/check-in'
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
  static invalidLastName = '@123c'
  static invalidDOB = '45/23'
  static invalidDOBRealDate = '01/32/1990'
  static invalidDOBFutureDate = '01/02/2026'
  static invalidDOBMissingDigits = '01/0'
  static invalidLastName = '@112c'
  static validLastName = 'Mariez'
  static invalidDOB = '10/01/1990'

  static popupMsgForBeforeNMinutesPatient =
    'Please come back no more than 5 minutes before your appointment to check'

  static errorMessageForInvalidDob = 'Invalid format (not a real date).'
  static errorMessageForInvalidDobFutureDate =
    'Invalid date (cannot be in the future).'
  static errorMessageForInvalidDobFutureDateInSpanish =
    'Fecha no válida (no puede ser en el futuro).'
  static errorMessageForInvalidDobDigits = 'Invalid format (not a real date).'
  static errorMessageForInvalidDobDigitsInSpanish =
    'Formato no válido (no es una fecha real).'
  static errorMessageForInvalidDobInSpanish =
    'Formato no válido (no es una fecha real).'
  static helpButtonPopupMsg = 'Please see front desk or call (916)555-1212'
  static popupMsgOfNoneOfTheAbove = 'Please check in at the front desk.'
  static popupMsgForBlankCredentials =
    'Please enter Last Name and Date of Birth to continue.'
  static popupMsgForIncorrectCredentialsInSpanish =
    'Por favor regístrese en la recepción.'

  static lastNameOfBeforeNMinutesPatient = ''

  static pnName = 'Auto'
}
export default PatientData
