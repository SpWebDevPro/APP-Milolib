import User from './../routes/users/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import dotEnv from 'dotenv'
dotEnv.config()

mongoose.connect(process.env.DB, {}, (err) => {
    if (err) { throw err; } else {
        console.log('Connection to the Database etablished (' + process.env.DB + ')...')
    }
})


let suivits = [
    new User({
        email: 'suivit',
        password: bcrypt.hashSync('suivit', 10),
        role: 'Suivit',
        calendar: {} 
    })
]


//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
let done = 0
for (let i = 0; i < suivits.length; i++) {
    suivits[i].save( (err, result) => {
        done++
        if (done === suivits.length) {
            console.log("Suivits seeding complete. Yeah (╭☞⫑益⫒)╭☞ !")
            exit()
        }
    })
}

function exit() {
    mongoose.disconnect()
}