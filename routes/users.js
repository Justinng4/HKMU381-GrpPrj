const express = require('express')
const router = express.Router()
const User = require('../models/User')

//Get
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Create
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password 
    })
    try {
        const newUser = await user.save()
        res.status(201).json({newUser})
    } catch (err) {
        res.status(404).json({message: err.message})
    }
})

// Middleware to get user for both PATCH and DELETE operations
async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
        res.user = user
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// PATCH 
router.patch('/:id', getUser, async (req, res) => {
    console.log('Received PATCH request:', req.body)
    
    const updates = {}
    // Only add fields that are actually provided
    if (req.body.name != null) {
        updates.name = req.body.name
    }
    if (req.body.email != null) {
        updates.email = req.body.email
    }
    if (req.body.password != null) {
        updates.password = req.body.password
    }
    
    try {
        // Update only the provided fields
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        )
        
        console.log('Updated user:', updatedUser)
        res.json(updatedUser)
    } catch (err) {
        console.error('Update error:', err)
        return res.status(400).json({ message: err.message })
    }
})

//Delete
router.delete('/:id', getUser, async (req, res) => {
    console.log('Received DELETE request for user:', req.params.id)
    
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({ message: 'User deleted successfully' })
    } catch (err) {
        console.error('Delete error:', err)
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router