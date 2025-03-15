
async function dynamicUpdateFunction(dynamic_cln,dynamic_data,dynamic_query) {
    
    return new Promise(async(resolve,reject)=>{

        try {
          var data = await dynamic_cln.updateOne(dynamic_query,dynamic_data,{
                new: true,
                upsert: true
            })
            if(data){
                resolve(data)
            }
            
        } catch (error) {
            reject(error)
        }

    })
}


async function dynamicFindFunction(dynamic_cln, dynamic_query) {

    return new Promise(async (resolve, reject) => {

        try {
            const data = await dynamic_cln.find(dynamic_query)
            if (data) {
                resolve(data)
            }
        } catch (error) {
            reject(error)
        }
    })

}


async function dynamicDeleteFunction(dynamic_cln, dynamic_query) {

    return new Promise(async (resolve, reject) => {

        try {
            const data = await dynamic_cln.deleteOne(dynamic_query)
            if (data) {
                resolve(data)
            }
        } catch (error) {
            reject(error)
        }
    })

}



module.exports={
    dynamicUpdateFunction,
    dynamicFindFunction,
    dynamicDeleteFunction
}


