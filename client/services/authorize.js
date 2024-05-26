// เก็บ token / username => session storage
export const authenticate = (response, next) => {
    if (typeof window !== "undefined") {
      // เก็บข้อมูลลง session storage
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      sessionStorage.setItem("user", JSON.stringify(response.data.user.username));
      // console.log('Stored token:', response.data.token); // เพิ่ม log เพื่อตรวจสอบการเก็บ token
      // console.log('Stored user:', response.data.user.username); // เพิ่ม log เพื่อตรวจสอบการเก็บ user
    }
    next();
  };
  
  // ดึงข้อมูล token
  export const getToken = () => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("token")) {
        // console.log('getToken:', sessionStorage.getItem("token")); // เพิ่ม log เพื่อตรวจสอบการดึง token
        return JSON.parse(sessionStorage.getItem("token"));
      } else {
        // console.log('getToken: No token found'); // เพิ่ม log เพื่อตรวจสอบเมื่อไม่พบ token
        return false;
      }
    }
  };
  
  // ดึงข้อมูล user
  export const getUser = () => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("user")) {
        return JSON.parse(sessionStorage.getItem("user"));
      } else {
        return false;
      }
    }
  };
  
  // logout
  export const logout = (next) => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }
    next();
  };
  