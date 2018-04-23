import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import client from './model'
import helper from '../../helpers/helper'

let router = express.Router()

router.post('/', (req, res) => {
  if (req.body.email && req.body.password) {
    if (helper.regexEmail.test(req.body.email)) {
      let newClient = new Client(req.body)
      newClient.password = bcrypt.hashSync(req.body.password, 10)
      newClient.save((err, client) => {
        if (err) {
          if (err.message.match(/^E11000 duplicate key error.+/)) {
            res
              .status(400)
              .json({ success: false, message: 'Email already used.' })
          } else res.status(500).json({ success: false, message: err.message })
        } else {
          //WIP a voir avec Luke
          // const msg = {
          //   to: '',
          //   from: 'milolib@milolib.com',
          //   subject: 'Your are register',
          //   text: 'Congrat you successfully registered into Milolib'
          // }
          //sendMail commenter jusau a ce que compte sendgrid creer
          // sendMail(req.body.email, msg)
          //WIP
          helper.beforeSendUser(client)
          res.status(200).json({
            success: true,
            message: 'New user successfully created!',
            content: client
          })
        }
      })
    } else
      res.status(400).json({ success: false, message: 'Valid email required.' })
  } else
    res
      .status(400)
      .json({ success: false, message: 'Missing email and/or password.' })
})

router.get('/', (req, res) => {
  Client.find({}, (err, clients) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else {
      for (let i = 0; i < clients.length; i++) {
        helper.beforeSendUser(clients[i])
      }
      res.status(200).json({
        success: true,
        message: 'Here is the list of clients!',
        content: clients
      })
    }
  })
})

router.get('/:id', (req, res) => {
  Client.findById(req.params.id, (err, client) => {
    if (err) {
      if (err.message.match(/^Cast to ObjectId failed.+/)) {
        res.status(400).json({ success: false, message: 'Invalid ID' })
      } else res.status(500).json({ success: false, message: err.message })
    } else if (!user)
      res.status(404).json({ success: false, message: 'User not found.' })
    else {
      helper.beforeSendUser(client)
      res.status(200).json({
        success: true,
        message: 'Here is the client profile!',
        content: client
      })
    }
  })
})

// router.put('/:id', (req, res) => {
//   // WIP, a voir
//   if (res.locals.user.role == 'Administrateur') {
//     delete req.body.active
//     delete req.body.calendar
//     delete req.body.appointment
//     if (req.body.password) {
//       req.body.password = bcrypt.hashSync(req.body.password, 10)
//     }
//     if (req.body.email) {
//       if (!helper.regexEmail.test(body.email)) {
//         return res
//           .status(400)
//           .json({ success: false, message: 'Valid email required.' })
//       }
//     }
//     User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
//       if (err) {
//         if (err.message.match(/^Cast to ObjectId failed.+/)) {
//           res.status(400).json({ success: false, message: 'Invalid ID' })
//         } else res.status(500).json({ success: false, message: err.message })
//       } else if (!user)
//         res.status(404).json({ success: false, message: 'User not found.' })
//       else res.status(200).json({ success: true, message: 'User updated!' })
//     })
//   } else res.status(403).json({ success: false, message: 'Forbidden.' })
// })

// router.post('/', (req, res) => {
//   if (res.locals.user.role == 'Administrateur') {
//     if (req.body.email && req.body.password) {
//       if (helper.regexEmail.test(req.body.email)) {
//         let newUser = new User(req.body)
//         newUser.password = bcrypt.hashSync(req.body.password, 10)
//         newUser.save((err, user) => {
//           if (err) {
//             if (err.message.match(/^E11000 duplicate key error.+/)) {
//               res
//                 .status(400)
//                 .json({ success: false, message: 'Email already used.' })
//             } else
//               res.status(500).json({ success: false, message: err.message })
//           } else {
//             //WIP a voir avec Luke
//             const msg = {
//               to: '',
//               from: 'milolib@milolib.com',
//               subject: 'Your are register',
//               text: 'Congrat you successfully registered into Milolib'
//             }
//             //sendMail commenter jusau a ce que compte sendgrid creer
//             // sendMail(req.body.email, msg)
//             //WIP
//             helper.beforeSendUser(user)
//             res.status(200).json({
//               success: true,
//               message: 'New user successfully created!',
//               content: user
//             })
//           }
//         })
//       } else
//         res
//           .status(400)
//           .json({ success: false, message: 'Valid email required.' })
//     } else
//       res
//         .status(400)
//         .json({ success: false, message: 'Missing email and/or password.' })
//   } else res.status(403).json({ succes: false, message: 'Forbidden.' })
// })

// 'DELETE' user
// router.put('/:id/active', (req, res) => {
//   if (res.locals.user.role == 'Administrateur') {
//     if (req.body.active) {
//       User.findByIdAndUpdate(
//         req.params.id,
//         { active: req.body.active },
//         (err, user) => {
//           if (err) {
//             if (err.message.match(/^Cast to ObjectId failed.+/)) {
//               res.status(400).json({ success: false, message: 'Invalid ID' })
//             } else if (err.message.match(/^Cast to boolean failed.+/)) {
//               res
//                 .status(400)
//                 .json({ success: false, message: 'Invalid request.' })
//             } else
//               res.status(500).json({ success: false, message: err.message })
//           } else if (!user)
//             res.status(404).json({ success: false, message: 'User not found.' })
//           else {
//             if (req.body.active == 'true')
//               res.status(200).json({
//                 success: true,
//                 message: 'User ' + user.email + ' reactivated =D'
//               })
//             else if (req.body.active == 'false')
//               res.status(200).json({
//                 success: true,
//                 message: 'User ' + user.email + " deactivated ='("
//               })
//           }
//         }
//       )
//     } else res.status(400).json({ success: false, message: 'Invalid request.' })
//   } else res.status(403).json({ success: false, message: 'Forbidden.' })
// })

export default router

// ???
// Gestion d'erreurs un peu different entre "router.get/put/delete" . A voir ce qui est le plus pertinent
