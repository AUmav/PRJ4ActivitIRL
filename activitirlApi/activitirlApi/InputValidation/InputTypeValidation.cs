using System.Net.Mail;

namespace ActivitIRLApi.Validaion
{
    public class InputTypeValidation
    {
        public bool IsValidEmail(string email)
        {
            try
            {
                MailAddress mail = new MailAddress(email);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
