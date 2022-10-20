require('../src/db/mongoose')
const User = require('../src/models/user')
// 617d5141d840cf70bdf78aba

// User.findByIdAndUpdate('617d5141d840cf70bdf78aba',{age: 1}).then((user)=>{
//     console.log(user)

//     return User.countDocuments({age:1})
// }).then((result)=>{
//       console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async(id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age})
    console.log(user)
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('617d5141d840cf70bdf78aba',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})

