using AutoMapper;
using ActivitIRLApi.Models.Entities;
using ActivitIRLApi.Models.DTOs;


namespace ActivitIRLApi.AutoMapper
{
    public class UserMappingProfiles : Profile
    {
        public UserMappingProfiles()
        {
            CreateMap<UserCreateDTO, User>();
            CreateMap<User, UserGetDTO>();
        }
    }
}
