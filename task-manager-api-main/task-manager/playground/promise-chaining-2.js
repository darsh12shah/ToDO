require('../src/db/mongoose')
const Task=require('../src/models/task')

// Task.findByIdAndDelete('617d6e9e8bb20ee8d222d8e8').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async(id)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('617d6e9e8bb20ee8d222d8e8').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
