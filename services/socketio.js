
module.exports = {
  connect: async (io) => {

    io.on('connection', socket => {
      console.log('socket連線成功')
      console.log(`Socket ${socket.id} connected`)

      socket.on('joinRoom', (membersData) => {
        console.log('membersData:', membersData)
        const roomName = membersData.gpMembers.sort().join("-")
        socket.join(roomName)
        socket.broadcast.emit('otherJoined', `${socket.id} joined room: ${roomName}`)
        console.log(`${socket.id} joined room: ${roomName}`);
      })

      socket.on('send-room-message', ({ roomName, message }) => {
        console.log(`Message from ${socket.id} to room ${roomName}: ${message}`)
        socket.to(roomName).emit('room-message', { message, fromSocketId: socket.id })
      })

      socket.on('disconnect', () => {
        console.log(`${socket.id}已離線`)
      })
    })
  }
}

