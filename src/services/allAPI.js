import commonAPI from "./commonAPI"
import SERVER_URL from "./serverurl"

// login 
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)

}
// add schooll details 
export const addSchooldetailsAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-schooldetails`,reqBody,reqHeader)

}