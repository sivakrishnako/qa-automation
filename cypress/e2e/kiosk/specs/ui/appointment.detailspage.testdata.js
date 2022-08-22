/// <reference types="cypress" />

class AppointmentData {
  static appointmentTitle = ".cardTittle > .MuiTypography-root";
  static validDob = "11/11/2012";
  static appointmentPageUrl = "/appointment";
  static expectedTitleOfAppointmentPage = "Appointment Details";
  static expectedTitleOfAppointmentPageInSpanish="Detalles de la Cita"
  static specialityOfProvider = "PA,PTA Assistant";
  static helpButtonPopupMsg = "Please check in at the front desk.";
  static optionFromAuthorizedParent = "MyEmergency Contact";
  static expectedTypeOfAppointment = "Audiology Follow Up Visit";
  static expectedAge=" 10 Yrs"
  static providerName="Auto  Provider"
}
export default AppointmentData;
