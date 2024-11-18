const {axiosInstance} = require('./index')

//Register new User

export const RegisterUser = async (value) => {
    try{
        const response = await axiosInstance.post("/api/users/register", value);
        return response.data;
    }catch(error){
        console.log(error);
    }
}


// login user

export const LoginUser = async (value) => {
    try {
      const response = await axiosInstance.post("/api/users/login", value);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log('Login error:', error.response.data.message);
        throw new Error(error.response.data.message);
      }
      console.log('Network or unexpected error:', error.message);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  };
  

// get current user from the frontend
export const GetCurrentUser = async () =>{
    try {
        const response = await axiosInstance.get('api/users/get-current-user')
        return response.data
    } catch (error) {
       console.log(error)
    }
}






