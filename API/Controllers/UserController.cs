using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Models.DTO;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _data;

        public UserController(UserService dataFromService)
        {
            _data = dataFromService;
        }


        //Add a User
        [HttpPost("AddUsers")]

        public bool AddUser(CreateAccountDTO UserToAdd)
        {
            //create a variable with a type of service
           return  _data.AddUser(UserToAdd);
        }


        [HttpGet("GetAllUsers")]

        public IEnumerable<UserModel> GetAllUsers()
        {
            return _data.GetAllUsers();
        }

        [HttpGet("GetUserByUsername/{UserName}")]
            public UserIdDTO GetUserIdDTOByUserName(string username)
            {
                return _data.GetUserIdDTOByUserName(username);
            }
        
    

        [HttpPost("Login")]

        public IActionResult Login([FromBody] LoginDTO User)
        {
            return _data.Login(User);
        }


        [HttpPost("DeleteUser/{userToDelete}")]
        public bool DeleteUser(string userToDelete)
        {
            return _data.DeleteUser(userToDelete);   
        }

        [HttpPost("UpdateUser")]

        public bool UpdateUser(int id, string username)
        {
            return _data.UpdateUser(id,username);
        }

    }
}