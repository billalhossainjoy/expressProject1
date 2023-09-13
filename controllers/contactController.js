const asyncHandler = require('express-async-handler')
const ContactModel = require('../models/contactModels')
const contactContoller = {}

contactContoller.getContact = asyncHandler(async (req, res) => {
    const Contacts = await ContactModel.find({
        user_id: req.user.id
    })
    res.status(200).json(Contacts)
})


contactContoller.postContact = asyncHandler(async (req, res) => {
    const {
        name,
        roll,
        email,
    } = req.body;
    if (!name || !roll || !email) {
        res.status(403)
        throw new Error("anything else...")
    } else {
        const contact = await ContactModel.create({
            user_id: req.user.id,
            name,
            roll,
            email
        })
        res.status(201).json({
            message: "create content"
        })
    }
})

contactContoller.getidContact = asyncHandler(async (req, res) => {
    const Contacts = await ContactModel.findById(req.params.id)
    if (!Contacts) {
        res.status(404)
        throw new Error("contact not found")
    }
    res.status(201).json(Contacts)
})

contactContoller.updateContact = asyncHandler(async (req, res) => {
    const Contacts = await ContactModel.findById(req.params.id)
    if (!Contacts) {
        res.status(404)
        throw new Error("contact not found")
    } else {
        if (Contacts.user_id.toString() === req.user.id) {
            const updateContact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })
            res.status(201).json(updateContact)
        }
    }
})

contactContoller.deleteContact = asyncHandler(async (req, res) => {
    const Contact = await ContactModel.findById(req.params.id);
    if (!Contact) {
        res.status(404)
        throw new Error("contact not found")
    } else {
        if (Contact.user_id.toString() === req.user.id) {
            console.log("billal");
            const deleteContact = await ContactModel.findByIdAndDelete(req.params.id, Contact)
            res.send(`this is contact hase been deleted`)
        } 
    }
})

module.exports = contactContoller