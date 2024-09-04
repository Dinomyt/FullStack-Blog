import axios from 'axios';

//This will hold our helper functions or method.
let userData = {};
//helper function to check our token.
const checkToken = () => {
  let result = false;
  let lsData = localStorage.getItem("Token");
  if (lsData && lsData != null) {
    result = true;
  }
  return result;
};

//helper function or method to createAccount, async and await
//fetch() json(), stringify
const createAccount = async (createduser) => {
  const result = await fetch("http://localhost:5129/api/User/AddUsers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createduser),
  });
  if (!result.ok) {
    const message = `Yo yo you have an Error Check your code!${result.status}`;
    throw new Error(message);
  }
  let data = await result.json();
  console.log(data);
};

const login = async (loginUser) => {
  const result = await fetch("http://localhost:5129/api/User/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginUser),
  });
  if (!result.ok) {
    const message = `Yo yo you have an Error Check your code!${result.status}`;
    throw new Error(message);
  }
  let data = await result.json();
  if(data.token != null)
    {
        localStorage.setItem("Token",data.token);
        // localStorage.setItem("UserData",JSON.stringify(data.user));// This was returning a token and was getting undefined
    }
  return data;
};

const GetLoggedInUser = async (username) => {
  let result = await fetch(
    `http://localhost:5129/api/User/GetUserByUsername/${username}`
  );

  userData = await result.json();
  console.log(userData,"getloggedinsuser method")
  localStorage.setItem("UserData",JSON.stringify(userData));
  userData = JSON.parse(localStorage.getItem("UserData"));
};

const LoggedInData = () => {
  if(!userData && localStorage.getItem("UserData")) {
    userData = JSON.parse(localStorage.getItem("UserData"))
  }
  return userData;
};


const AddBlogItems = async (blogItems) => {
    // try {
    //     let result = await axios.post(
    //         `http://localhost:5129/api/Blog/AddBlogItems`, 
    //         blogItems
    //     );
    //     console.log('Blog item added successfully:', result.data);
    // } catch (error) {
    //     console.error('Error adding blog item:', error);
    // }
    const data = await sendData('Blog', 'AddBlogItems', blogItems);
    console.log("data in AddBlogItems: ");
    console.log(data);
    return data;
};


const GetBlogItems = async () => {
  const data = await getData('Blog', 'GetBlogItems');
  return data;
}

const sendData = async (controller, endpoint, passedInData) => {
    try {
        const result = await axios.post(
          `http://localhost:5129/api/${controller}/${endpoint}`, 
          passedInData
        );
        console.log(`${controller} added successfuly`, result.data);
        return result.data;
      } catch (error) {
        console.error(`Error adding ${controller} :`, error);
      }
};


const getData = async (controller, endpoint) => {
  try {
    const result = await axios.get(`http://localhost:5129/api/${controller}/${endpoint}/}`);
    console.log(`${controller} retrieved successfully`, result.data);
    console.log("data after being retrieved: ");
    console.log(result)
    return result;
  } catch (error) {
    console.error(`Error retrieving ${controller}:`, error);
    throw error; // Re-throwing if further error handling is needed
  }
};
const GetBlogItemsByUserId = async (UserId) => {
  const data = await getDataById('Blog', 'GetBlogItemsByUserId', UserId);
  console.log("data in GetBlogItemsByUserId");
  console.log(data);
  return data.data;
}

const getDataById = async (controller, endpoint, passedInData) => {
  try {
    const result = await axios.get(`http://localhost:5129/api/${controller}/${endpoint}/${passedInData}`);
    console.log(`${controller} retrieved successfully`, result.data);
    console.log("data by id after being retrieved: ");
    console.log(result)
    return result;
  } catch (error) {
    console.error(`Error retrieving ${controller}:`, error);
    throw error; // Re-throwing if further error handling is needed
  }
};





export { checkToken, createAccount, login, GetLoggedInUser, LoggedInData, AddBlogItems, GetBlogItems, GetBlogItemsByUserId };
