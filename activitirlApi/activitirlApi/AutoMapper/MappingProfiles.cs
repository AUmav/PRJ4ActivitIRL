using AutoMapper;
using ActivitIRLApi.Models.Entities;
using ActivitIRLApi.Models.DTOs;
using ActivitIRLApi.Models;

namespace ActivitIRLApi.AutoMapper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<string, DateTime>().ConvertUsing(new DateTimeStringTypeConverter());
            CreateMap<UserCreateDTO, User>();
            CreateMap<User, UserGetDTO>();
            CreateMap<Event, EventGetDTO>();
            CreateMap<Event, EventGetPublicDTO>();
            CreateMap<EventCreateDTO, Event>();
            CreateMap<Event, EventGetSignedupDTO>();
            CreateMap<User, EventUserDTO>();
            CreateMap<DateTime, string>().ConvertUsing(new DateOnlyStringTypeConverter());


        }
    }

    public class DateTimeStringTypeConverter : ITypeConverter<string, DateTime>
    {
        public DateTime Convert(string source, DateTime destination, ResolutionContext context)
        {
            return System.Convert.ToDateTime(source);
        }
    }

    public class DateOnlyStringTypeConverter : ITypeConverter<DateTime, string>
    {
        public string Convert(DateTime source, string destination, ResolutionContext context)
        {
            return DateOnly.FromDateTime(source).ToString();
        }
    }
}

