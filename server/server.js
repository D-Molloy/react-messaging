const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", socket => {
  // the id of the user sending the message
  // socket will try to create a new ID with every connection so we create a static id
  const id = socket.handshake.query.id

  socket.join(id)

  // fire whenever a new message is received
  socket.on("send-message", ({ recipients, text }) => {
    console.log('recipients, text', { recipients, text })
    recipients.forEach(recipient => {
      // removing the current recipient from the list of recipients
      const newRecipients = recipients.filter(r => r !== recipient)
      // adding the sender to the list of recipients
      newRecipients.push(id)

      // send the message to a particular room
      socket.broadcast.to(recipient).emit("receive-message", { recipients: newRecipients, sender: id, text })
    })
  })
})