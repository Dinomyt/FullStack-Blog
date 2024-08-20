using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Models.DTO;
using API.Services.Context;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace API.Services;

public class UserService : ControllerBase
{
    private readonly DataContext _context;
    public UserService(DataContext context){
        _context = context;
    }

    public bool DoesUserExist (string username){
        return _context.UserInfo.SingleOrDefault(user => user.Username == username) != null;
    }

    public bool AddUser(CreateAccountDTO UserToAdd){
        bool result = false;

        if (!DoesUserExist(UserToAdd.Username)){
            UserModel newUser = new UserModel();
            var newHashedPassword = HashPassword(UserToAdd.Password);
            
            newUser.Id = UserToAdd.Id;
            newUser.Username = UserToAdd.Username;
            newUser.Salt = newHashedPassword.Salt;
            newUser.Hash = newHashedPassword.Hash;

            _context.Add(newUser);
            result = _context.SaveChanges() != 0;

        }
        return result;
    }

    public PasswordDTO HashPassword(string password){
        PasswordDTO newHashedPassword = new PasswordDTO();
        byte[] SaltBytes = new byte[64];
        var provider = new RNGCryptoServiceProvider();
        provider.GetNonZeroBytes(SaltBytes);
        var Salt = Convert.ToBase64String(SaltBytes);
        var Rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, SaltBytes, 10000);
        var Hash = Convert.ToBase64String(Rfc2898DeriveBytes.GetBytes(256));
        newHashedPassword.Salt = Salt;
        newHashedPassword.Hash = Hash;

        return newHashedPassword;
    }

    public bool VerifyUserPassword(string? Password, string?StoredHash, string? StoredSalt){
        var SaltBytes = Convert.FromBase64String(StoredSalt);
        var rfc2898DeriveBytes = new Rfc2898DeriveBytes(Password,SaltBytes,10000);
        var newHash = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

        return newHash == StoredHash;
    }

    public IEnumerable<UserModel> GetAllUsers(){
        return _context.UserInfo;
    }

    public IActionResult Login(LoginDTO User)
    {
        IActionResult Result = Unauthorized();
        if (DoesUserExist(User.Username)){
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("reallyLongKeysuperSecretKey@345678Hello"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:5001/",
                audience: "http://localhost:5001/",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString });
        }
        return Result;
    }

    public UserIdDTO GetUserIdDTOByUserName(string? Username)
    {
        throw new NotImplementedException();
    }

    public UserModel GetUserByUserName(string? Username){
        return _context.UserInfo.SingleOrDefault(user => user.Username == Username);
    }
        public UserModel GetUserByUserId(int Id){
        return _context.UserInfo.SingleOrDefault(user => user.Id == Id);
    }
    public bool DeleteUser(string UsernameToDelete)
    {
        UserModel foundUser = GetUserByUserName(UsernameToDelete);
        bool result = false;
        if(foundUser != null){
            foundUser.Username = UsernameToDelete;
            _context.Remove<UserModel>(foundUser);
            result = _context.SaveChanges() != 0;
        }
        return result;
    }

    public bool UpdateUser(int id, string username)
    {
        UserModel foundUser = GetUserByUserId(id);
        bool result = false;
        if(foundUser != null){
            foundUser.Username = username;
            _context.Update<UserModel>(foundUser);
            result = _context.SaveChanges() != 0;
        }
        return result;
    }
}
