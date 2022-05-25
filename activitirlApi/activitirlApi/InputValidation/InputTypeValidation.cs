using System.Net.Mail;
using ActivitIRLApi.Models;

namespace ActivitIRLApi.Validaion
{
    public interface IInputTypeValidationManager
    {
        public bool IsValidEmail(string email);
        public bool IsValidPassword(string password);
        public bool IsValidDateOnly(string userName);
        public bool IsValidDateTime(string dateTime);
        public bool IsDateOfBirthValid(string dateOfBirth);
        public bool IsValidRegistrationDate(string registrationDate, string date);
        public bool IsDateValid(string date);
        public void ParseMaxMinAgeMaxUser(ref Event @event);
    }


    public class InputTypeValidationManager : IInputTypeValidationManager
    {

        public void ParseMaxMinAgeMaxUser(ref Event @event)
        {
            if(@event.MinAge == null)
            {
                @event.MinAge = "0";
            }

            if (@event.MaxAge == null)
            {
                @event.MaxAge = "999999999";
            }

            if (@event.MaxUsers == null)
            {
                @event.MaxUsers = "999999999";
            }
        }

        public bool IsValidPassword(string password)
        {
            return true;
        }

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

        public bool IsValidDateOnly(string date)
        {
            DateOnly ignoreMe;
            return DateOnly.TryParse(date, out ignoreMe);
        }

        public bool IsValidDateTime(string date)
        {
            DateTime ignoreMe;
            return DateTime.TryParse(date, out ignoreMe);
        }

        public bool IsDateOfBirthValid(string dateOfBirth)
        {
            if(!IsValidDateOnly(dateOfBirth))
            {
                return false;
            }
            // Credit to stackoverflow
            // Save today's date.
            var today = DateTime.Today;

            DateTime _dateOfBirth = DateTime.Parse(dateOfBirth);
            // Calculate the age.
            var age = today.Year - _dateOfBirth.Year;

            // Go back to the year in which the person was born in case of a leap year
            if (_dateOfBirth.Date > today.AddYears(-age)) age--;
            
            if(age <= 0)
            {
                return false;
            }

            return true;
        }

        public bool IsValidRegistrationDate(string registrationDate,string date)
        {
            if (!IsValidDateTime(registrationDate))
            {
                return false;
            }

            DateTime _registrationDate = DateTime.Parse(registrationDate);

            if (!IsValidDateTime(date))
            {
                return false;
            }

            DateTime _date = DateTime.Parse(date);

            var today = DateTime.Today;

            if(_registrationDate < today)
            {
                return false;
            }
           

            if(_registrationDate > _date)
            {
                return false;
            }

            return true;

        }

        public bool IsDateValid(string date)
        {
            if (!IsValidDateOnly(date))
            {
                return false;
            }

            DateOnly _date = DateOnly.Parse(date);

            if (DateOnly.FromDateTime(DateTime.Now) > _date)
            {
                return false;
            }

            return true;
        }
    }
}
