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
// user schooll details 
export const userSchooldetailsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-schooldetails`,{},reqHeader)

}
// update school details
// export const updateSchoolDetailsAPI = async (body, reqHeader) => {
//     return await commonAPI('PUT', `${SERVER_URL}/update-schooldetails`, body, reqHeader);
//   };

// add participate
export const addparticipateAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-partcipate`,reqBody,reqHeader)
}

// all  participate
export const allparticipateAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-partcipate`,{},reqHeader)
}


// add participate
export const updateparticipateAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/partcipate${id}edit`,reqBody,reqHeader)
}

// item wise 
export const allItemWiseAPI = async (reqHeader) => {
    return await commonAPI("GET"`${SERVER_URL}/all-itemwise`, reqHeader);
  };