using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Models.DTO;
using API.Services.Context;
using System.Security.Cryptography;
namespace API.Services;
public class UserService
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
}
