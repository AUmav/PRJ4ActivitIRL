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
            CreateMap<string, DateTime>().ConvertUsing(new DateTimeTypeConverter());
            CreateMap<UserCreateDTO, User>();
            CreateMap<User, UserGetDTO>();
            CreateMap<Event, Event>();
            CreateMap<Event, EventGetPublicListDTO>();
            CreateMap<EventCreateDTO, Event>();

        }
    }

    public class DateTimeTypeConverter : ITypeConverter<string, DateTime>
    {
        public DateTime Convert(string source, DateTime destination, ResolutionContext context)
        {
            return System.Convert.ToDateTime(source);
        }
    }
}

