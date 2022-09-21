/// <reference types="cypress" />

class PaymentDetailPageData {
  static expectedTitleOfPaymentDetails = 'Payment Details'
  static expectedTitleOfPaymentDetailsInSpanish = 'Detalles del Pago'
  static PaymentPageUrl = '/payment'
  static minimumOtherAmountForCheckIn = '$5'
    static popUpForPayAtFrontDesk ="See the front desk about payment arrangements."
  static popUpForIfUserClickOnSkipPaymentInSpanish="Por favor, finalice el proceso de registro en la recepción si no puede realizar el pago hoy."
static popUpForPayAtfrontDeskInSpanish="Consulte en la recepción sobre cómo proceder con el pago"
static nameOnCard="Auto Automation"
static popUpForIfUserClickOnSkipPayment="Please finish the check-in process at the front desk if you cannot make your payment today."
static textWhenCardsNotAvailable="There are no saved payment methods on file at this time."
}
export default PaymentDetailPageData
