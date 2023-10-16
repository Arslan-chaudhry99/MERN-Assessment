import * as Yup from "yup";
export const Query = Yup.object({
  Query: Yup.string().min(2).max(20).required("Please Enter Country Name First")
});
