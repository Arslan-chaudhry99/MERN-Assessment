import * as Yup from "yup"
export const signup = Yup.object({
    username: Yup.string().min(4).max(20).required("Please Enter Your Name*"),
    Password: Yup.string().min(6).max(12).required("Please Enter Your Password*"),
})
