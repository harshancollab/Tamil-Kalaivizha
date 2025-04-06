import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { deleteStageAPI, getAllStageListAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

const DefineStage = () => {
    const navigate = useNavigate();
    
    // Dummy data for testing
    const dummyStages = [
        { id: 1, name: "Discovery", description: "Initial assessment of client needs" },
        { id: 2, name: "Planning", description: "Project scope and resource allocation" },
        { id: 3, name: "Development", description: "Building the core functionality" },
        { id: 4, name: "Testing", description: "Quality assurance and bug fixes" },
        { id: 5, name: "Deployment", description: "Release to production environment" }
    ];
    
    const [Allstages, setStages] = useState(dummyStages);
    console.log(Allstages);

    useEffect(() => {
        // Comment out the API call when using dummy data
        // getAllstages();
    }, []);

    const getAllstages = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllStageListAPI(reqHeader)
                if (result.status === 200) {
                    setStages(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleAddClick = () => {
        navigate('/AddStage');
    };

    const handleEditClick = (stageId) => {
        navigate(`/EditStage`);
    };
    
    const handleDeleteClick = async(stageId) => {
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try{
          await deleteStageAPI(id,reqHeader)
          getAllStageListAPI()
            }catch(err){
                console.log(err);
                
            }
        }

        
        setStages(Allstages.filter(stage => stage.id !== stageId));
    };
    
    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
                            Stages
                        </h2>
                        <button onClick={handleAddClick} className="text-blue-500 border border-blue-500 py-2 px-6 rounded-full flex items-center">
                            Add Stage
                        </button>
                    </div>

                    <div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-center border-separate border-spacing-y-2 print-table">
                                <thead>
                                    <tr className="text-gray-700 ">
                                        <th className="p-2 md:p-3">Sl No</th>
                                        <th className="p-2 md:p-3">Stage Name</th>
                                        <th className="p-2 md:p-3">Stage description</th>
                                        <th className="p-2 md:p-3">Edit</th>
                                        <th className="p-2 md:p-3">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Allstages.length > 0 ? (
                                        Allstages.map((stage, index) => (
                                            <tr key={stage.id} className="hover:bg-gray-200">
                                                <td className="p-2 mr-5 md:p-3">{index + 1}</td>
                                                <td className="p-2 md:p-3">{stage.name}</td>
                                                <td className="p-2 md:p-3">{stage.description}</td>
                                                <td className="p-2 md:p-3">
                                                    <i 
                                                        className="fa-solid text-blue-500 fa-pen-to-square cursor-pointer"
                                                        onClick={() => handleEditClick(stage.id)}
                                                    ></i>
                                                </td>
                                                <td className="p-2 md:p-3">
                                                    <i 
                                                        className="fa-solid text-red-600 fa-trash cursor-pointer"
                                                        onClick={() => handleDeleteClick(stage.id)}
                                                    ></i>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="hover:bg-gray-200">
                                            <td colSpan="5" className="p-3">No stages found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DefineStage