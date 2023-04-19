const Event = require('../models/Event')



// add meetingLinks and remove description
exports.createEvent = async (req, res) => {
	if (req.user?.parent) {
		return res.status(400).json({ error: "Access denied" })
	}
	const { title, start, end, agenda, actionItems, meetingLink, followUp, attachments, invitations } = req.body
	if (!start) {
		return res.status(400).json({ error: "Start time is required" })
	}
	
	let data = {
		title,
		start,
		end,
		agenda,
		actionItems,
		followUp,
		meetingLink,
		status: "pending",
		attachments,
		createdBy: "6422af5d9153de6adce3b085",
		invitations: invitations || []
	}
	
	let newEvent = new Event(data)
	newEvent.save()
		.then(async event => {

			console.log(event)

			res.json({event})


		})
		.catch(err => {
			console.log(err);
			res.status(400).json({ error: "Something went wrong" })
		})
}

exports.getAllEvents = async (req, res)=>{
	try{

		let events = await Event.find({}).
		populate("createdBy", "username email")
		.populate("invitations", "username email")
		res.send(events)

	}catch(ex){
		res.status(500).json({message: ex.message})
	}
}