/// <reference types="cypress" />

class AppointmentData {
  static appointmentTitle = ".cardTittle > .MuiTypography-root";
  static validDob = " 01/01/1990";
  static appointmentPageUrl = "/appointment";
  static expectedTitleOfAppointmentPage = "Appointment Details";
  static expectedTitleOfAppointmentPageInSpanish="Detalles de la Cita"
  static specialityOfProvider = "PA,PTA Assistant";
  static helpButtonPopupMsg = "Please check in at the front desk.";
  static dobOfPatient=" 01/01/1990"
  static optionFromAuthorizedParent = "MyEmergency Contact";
  static expectedTypeOfAppointment = "Behavioral Health Intake";

}
export default AppointmentData;
