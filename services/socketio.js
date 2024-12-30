
module.exports = {
  connect: async (io) => {

    io.on('connection', socket => {
      console.log('socket連線成功')
      console.log(`Socket ${socket.id} connected`)

      socket.on('joinRoom', data => {
        const roomName = data.gpMembers.sort().join("-")
        socket.join(roomName)
        socket.broadcast.emit('otherJoined', { broadcast: `${socket.id} 已加入 ${roomName} 的群聊` })
        console.log(`${socket.id} joined room: ${roomName}`);

        // 檢查房間中是否已經有其他 socket
        const roomSockets = io.sockets.adapter.rooms.get(roomName);
        console.log('roomSockets:', roomSockets)

        if (roomSockets && roomSockets.size > 1) {
          // 如果房間內已經有 socket，通知當前加入的 socket
          socket.emit('otherJoined', {
            broadcast: `${[...roomSockets][0]} 已經在線`
          });
        }
      })

      socket.on('send-room-message', data => {
        const roomName = data.roomMembers.sort().join("-")
        console.log(`Message from ${socket.id} to room ${roomName}: ${data.message}`)
        socket.to(roomName).emit('room-message', { message: data.message, fromSocketId: socket.id })
      })

      socket.on('disconnect', () => {
        console.log(`${socket.id}已離線`)
        socket.broadcast.emit('user-disconnected', `${socket.id}已離線`)
      })
    })
  }
}

