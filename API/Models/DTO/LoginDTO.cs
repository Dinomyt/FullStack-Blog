using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.DTO
{
    public class LoginDTO
    {
        public string? Username {get;set;}
        public string? Password {get;set;}
    }
    public class AuthenticatedResponse
    {
        public string? Token { get; set; }
    }
}