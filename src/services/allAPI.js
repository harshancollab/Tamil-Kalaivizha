import commonAPI from "./commonAPI"
import SERVER_URL from "./serverurl"

// login 
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)

}
// reset
export const resetPasswordAPI = async (data) => {
    return await commonAPI("POST", `${SERVER_URL}/reset-password`, data, "");
  }
  // otp
export const verifyOtpAPI = async (data) => {
    return await commonAPI("POST", `${SERVER_URL}/verify-otp`, data, "");
  }
//   resnd
  export const resendOtpAPI = async (data) => {
    return await commonAPI("POST", `${SERVER_URL}/resend-otp`, data, "");
  }
//   new password 
export const newPasswordAPI = async (data) => {
    
      return await commonAPI("POST" `${SERVER_URL}/new-password`, data,"");
  
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
    return await commonAPI("GET",`${SERVER_URL}/all-itemwise`, reqHeader);
  };
//   a grade
export const getAGradeResultsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/results-agrade`, "", reqHeader);
  }




  //  AllKalolsavam
  export const getAllKalolsavamAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/kalolsavam/all`, {}, reqHeader);
};

//  edit a Kalolsavam
export const editKalolsavamAPI = async (kalolsavamId, reqBody, reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/kalolsavam/edit/${kalolsavamId}`, reqBody, reqHeader);
};


// add School entry

export const addSchoolEntryAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/school/add`, reqBody, reqHeader);
};

//  all cluster schools
export const allClusterSchoolsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/cluster-schools`, "", reqHeader);
};



// add spl entry
export const addSpecialOrderAPI = async (reqBody,reqHeader)=>{
  return await commonAPI("POST",`${SERVER_URL}/add-splentry`,reqBody,reqHeader)
}

// addstatge duration
export const addStageDurationAPI = async (reqBody,reqHeader)=>{
  return await commonAPI("POST",`${SERVER_URL}/add-stage`,reqBody,reqHeader)
}



// get all stage durationlist
export const getAllStageDurationsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-stagesduration`, {}, reqHeader);
};

// Add Stage API
export const addStageAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/stages/add`,reqBody, reqHeader);
};


// all stage api
export const getAllStageListAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-stages`, {}, reqHeader);
};
// edit stage 


// Delete a stage
export const deleteStageAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE", `${SERVER_URL}/stages/${id}`,{},reqHeader)
};

// Update a stage
export const updateStageAPI = async (stageId, reqBody, reqHeader) => {
  return await commonAPI("PUT", `${{SERVER_URL}}/stages/${stageId}`, reqBody, reqHeader);
};
// delete stage 

// Add ItemwiseStage API
export const  addStageItemwiseAPI  = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/itemwisestages/add`,reqBody, reqHeader);
};
// updateItemwiseStage API
export const  updateStageItemwiseAPI  = async (id,reqBody, reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/itemwisestages-edit/${id}`,reqBody, reqHeader);
};

// Get stage item by ID
export const getStageItemByIdAPI = async (id, reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/stage-itemwise/${id}`, {}, reqHeader);
};

// all stage  api
export const getAllItemStageListAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-itemwisestages`, {}, reqHeader);
};

// 
// Add festStage API
export const  addStagefestAPI  = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/festvelwisestages/add`,reqBody, reqHeader);
};

// all festwise
export const AllStageFestivalwise = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-festvelwestages`, {}, reqHeader);
};
// add callsheet
export const AddCallSheetAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/callsheet-add`, reqBody, reqHeader);
};


// all Eligblescl  api
export const getAllElgibleSclListAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/allelgiblescllist`, {}, reqHeader);
};

// all getAllPartcipteSclList  api
export const getAllPartcipteSclListAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/allparticipatelist`, {}, reqHeader);
};
// all getAllScl contact  api
export const getAllSchoolContactAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/allsclcontactlist`, {}, reqHeader);
};

// all getFestvelwise contact  api
export const getAllfestParticipantsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/allfestvellist`, {}, reqHeader);
};


// Add stage reports
export const getAllStageReportAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/stage-reports`, "", reqHeader);
};



// // Function to fetch all cluster data
// export const fetchClusterDataAPI = async (reqHeader) => {
//   return await axios.get(`${BASE_URL}/cluster-report`, { headers: reqHeader });
// };

// // Function to get cluster report based on provided data
// export const getClusterReportAPI = async (reqBody, reqHeader) => {
//   return await axios.post(`${BASE_URL}/cluster-report`, reqBody, { headers: reqHeader });
// };

// add result entry 
export const  addResultentryAPI  = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/add-resultentry`,reqBody, reqHeader);
};

// all result entry api
export const getAllResultentryListAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-resultentry`, {}, reqHeader);
};
// update result entry api API
export const  updateResultentryAPI  = async (id,reqBody, reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/Resultentry-edit/${id}`,reqBody, reqHeader);
};

// delete result entry
export const deleteresultentryAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE", `${SERVER_URL}/stages/${id}`,{},reqHeader)
};
// all result entry api
export const getAllitemtentryListAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-itementry`, {}, reqHeader);
};

// all publish entry api
export const getAllPublishentryListAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-publish`, {}, reqHeader);
};

// all getAllConfidentialResult api
export const getAllConfidentialAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-ConfidentialResult`, {}, reqHeader);
};
// all //getAllItemwiswpoint api
export const getAllItemwisepointAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-/Itemwiswpoint(`, {}, reqHeader);
};



// allSchool Wise Point List api
export const getAllsclwisepoitAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-sclwise-point(`, {}, reqHeader);
};

// allSchoolGrade wise  Wise Point List api
export const getAllsclGradewiseAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-sclwise-grade(`, {}, reqHeader);
};

// getAllCertificate itemwise
export const getAllCertificateitemwiseAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-certficate-item(`, {}, reqHeader);
};
// getAllCertificate School wise

export const getAllCertificateSclwiseAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-certficate-scl(`, {}, reqHeader);
};
// getAllhigher level comp School wise

export const getAllHigherlvlcompAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-Higherlvlcomp`, {}, reqHeader);
};
// Get all certificate participants
export const getAllParticipantsAPI = async (reqHeader) => {
  return await commonAPI('GET', `${BASE_URL}/participants`, null, reqHeader);
};

// Get participant by ID
export const getParticipantByIdAPI = async (id, reqHeader) => {
  return await commonAPI('GET', `${BASE_URL}/participants/${id}`, null, reqHeader);
};

// 
// In your API service file
export const getDisAllPartcipteSclListAPI = (reqHeader, subDistrict) => {
  return axios.get(`${BASE_URL}/api/schools?subDistrict=${subDistrict}`, reqHeader);
};