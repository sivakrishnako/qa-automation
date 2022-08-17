/// <reference types="cypress" />

class PatientData {
  
  static blankInput = ''
  static userLastNameForSkipPaymentPage = ''
  static userDobForSkipPaymentPage = ''
  static validDOB = '01/01/1990'
  static checkInPageUrl = '/check-in'
  static expectedTypeOfAppointmentTwo = 'Audiology Initial Visit'
  static specialityOfProvider = 'PA,PTA Assistant'
  static expectedTitleOfCheckIn = 'Who are you?'
  static expectedTitleOfCheckInSpanish = '¿Quién es usted'
  static  popupMsg = 'Please check in at the front desk.'
  static helpButtonPopupMsg = 'Please see front desk or call (916)555-1212'
  static popupMsgOfNoneOfTheAbove = 'Please check in at the front desk.'
  static popupMsgForBlankCredentials =
    'Please enter Last Name and Date of Birth to continue.'
  static popupMsgForIncorrectCredentialsInSpanish =
    'Por favor regístrese en la recepción.'
  static lastNameOfBeforeNMinutesPatient = ''
  static dobOfBeforeNMinutesPatient = ''
 
  static popupMsgForBeforeNMinutesPatient =
    'Please come back no more than x minutes before your appointment to check'
  static invalidLastName = "@112c"
  static validLastName = "Mariez"
  static invalidDOB = '10/01/1990'
  static pnName = 'Auto'
}
export default PatientData
