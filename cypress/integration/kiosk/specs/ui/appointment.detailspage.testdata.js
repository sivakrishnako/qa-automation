/// <reference types="cypress" />

class AppointmentData {
  static appointmentTitle = ".cardTittle > .MuiTypography-root";
  static providerName = "Ameena  Assistant";
  static validDob = " 01/01/1990";
  static appointmentPageUrl = "/appointment";
  static expectedTitleOfAppointmentPage = "Appointment Details";
  static expectedTitleOfAppointmentPageInSpanish="Detalles de la Cita"
  static missingMandatoryFieldProvider = "Ameena  Assistant";
  static specialityOfProvider = "PA,PTA Assistant";
  static helpButtonPopupMsg = "Please check in at the front desk.";
  static optionFromAuthorizedParent = "Nathan Mariez";
  static checkInTimeForFirstApt = "03:30 PM";
  static checkInTimeforSingleAppointment="11:00 AM"
  static expectedProviderName = "Felix Mariez";
  static expectedAge = " 32 Yrs";
  static expectedDate = "July  7,  2022";
  static expectedGender = " Female";
  static expectedTypeOfAppointment = "Behavioral Health Intake";
  static expectedPatientNameAtHeader = "Felix  M";
  static dobOfPatient=" 01/01/1990"
}
export default AppointmentData;
