/// <reference types="cypress" />



class ReviewDemographicsPageData {

  static demographicPageUrl="/demographics"

  static editDemographicUrl = "/demographics/edit"

  static expectedTitleOfReviewDemographic="Review Demographics"

  static expectedTitleOfReviewDemographicInSpanish="Revisar Información Demográfica"

  static homePhoneNumber="(789) 455-5555"

  static invalidHomePhoneNumber="1023456gh"

  static addMailAddress="123 Hallway"

  static cellPhoneNumber="(789) 455-5565"

  static workPhoneNumber="(789) 455-5565"

  static mailingAddressOfUser="123 Hallway"

static expectedTitleOfEditDemographicInSpanish="Datos Demográficos"

static expectedTitleOfEditDemographics=" Review Demographics"

static expectedTitlePatientInformationInSpanish = "Información Del Paciente"

static popUpForInvalidEmailInSpanish = "Se requiere la dirección de correo electrónico."

static popUpMsg = "Please correct the invalid fields to continue."

static invalidEmailAddress = "++@fgf@"

static errorMessageForFutureDOBInEnglish="Invalid date (cannot be in the future)."

static errorMessageForFutureDOBInSpanish="Fecha no válida (no puede ser en el futuro)."

static errorMessageForNotRealDOBInSpanish="Formato no válido (no es una fecha real)."

static errorMessageForNotRealDOBInEnglish="Invalid format (not a real date)."

static errorMessageForInvalidFormatDOBInEnglish="Invalid format (not a real date)."

static errorMessageForInvalidFormatDOBInSpanish="Formato no válido (no es una fecha real)."

}

export default ReviewDemographicsPageData;