const mongoose = require('mongoose')
const cln_task_info = require('../model/cln_task_info')
const {dynamicUpdateFunction, dynamicFindFunction,dynamicDeleteFunction} = require('../utils/dbOperations')

const createTask=async(req,res)=>{

    try {
        const requestInfo = req.body

        const savedInfo = await dynamicUpdateFunction(cln_task_info,requestInfo, { _id: req.body._id || new mongoose.Types.ObjectId() })
        if(savedInfo){
            res.status(200).json({
                message:"data created successfully"
            })
        }
        
    } catch (error) {
        res.status(500).json({ error })
    }

}

const retriveTask=async(req,res)=>{

    try {
        const retriveInfo = await dynamicFindFunction(cln_task_info, { })
        if(retriveInfo){
            res.status(200).json({
                message:"data retrived successfully",
                data:retriveInfo
            })
        }
        
    } catch (error) {
        res.status(500).json({ error })
    }

}


const deleteTask=async(req,res)=>{

    try {
        const retriveInfo = await dynamicDeleteFunction(cln_task_info, { _id: new mongoose.Types.ObjectId(req.body._id)})
      console.log(retriveInfo,'retriveInfo')
      
        if(retriveInfo){
            res.status(200).json({
                message:"data deleted successfully",
                data:retriveInfo
            })
        }
        
    } catch (error) {
        console.log("error",error)
        res.status(500).json({ error })
    }

}



module.exports={
    createTask,
    retriveTask,
    deleteTask
}