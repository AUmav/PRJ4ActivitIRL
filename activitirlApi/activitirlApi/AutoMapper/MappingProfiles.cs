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
            CreateMap<UserCreateDTO, User>();
            CreateMap<User, UserGetDTO>();
            CreateMap<Event, EventGetPrivateDTO>();
            CreateMap<Event, EventGetPublicDTO>();
            CreateMap<EventCreateDTO, Event>();

        }
    }
}
