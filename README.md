<!-- 
GOAL: 
Create FullStack web app for Blog Site

Backend:
Will be done through .net 8, web api, ef core, sql server
dotnet new webapi -o API -controllers
Add Microsoft.EntityFrameworkCore
Add Microsoft.EntityFrameworkCore.SqlServer
Add Microsoft.EntityFrameworkCore.Tools


dotnet ef migrations add Initial
    -Create our model first


dotnet ef database update (everytime we need to update our database)
dotnet watch run (to run in swagger)
------------------------------------------
Create an API for our blog to handle our CRUD functions within our api folder (controllers)
*Create
    AddUser//endpoint
*Read
*Update
    UpdateUser//endpoint
*Delete
    DeleteUser//endpoint


Blog Controller
*Post
    AddBlogItems//endpoint 
*GET
    GetAllBLogItems//endpoint
    GetAllBlogItemsByCategory//endpoint
    GetAllBlogItemsByTag//
    GetAllBlogItemsByDate//

*POST
    UpdateBlogItems//endpoint

*DELETE
    DeleteBlogItems//endpoint


UserModel
    id: int
    username: string
    Salt: string
    Hash: string

BlogItemModel
    id: int
    UserId: int
    PublisherName: string
    Title: string
    Image: string
    Description: string
    Date: string
    Category: string
    isPublished: boolean
    isDeleted: boolean

CreateAccountModel
    id: int
    Username: string
    Password: string

LoginModel
    Username: string
    Password: string

PasswordModel
    Salt: string
    Hash: string
------------------------------------------


Frontend:
Will be done through react

Deploy with Azure Static web apps:
Host the site through azure


Services//Folder
    UserService//file
        GetUserByUsername
        Login
        AddUser
        DeleteUser
    BlogItemService
        AddBlogItems
        UpdateBlogItems
        GetAllBlogItems
        GetAllBlogItemsByCategory//functions
        GetAllBlogItemsByTag
        GetAllBlogItemsByDate
        GetUsersById

    PasswordServices//file
        Hash password
        Very hash password


Notes:
In this app we need the following...
*Login Page
*Create account Page
*Blog view post page of published items
*Dashboard page (This is the profile page, will edit, delete, publish, unpublish your blog posts)



-->