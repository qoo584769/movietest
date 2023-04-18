/* eslint-disable prefer-const */
const WebSocket = require('ws')

const websocketServer = (expressServer) => {
  // 大廳使用者變數
  let lobbyUser = []
  // 私人聊天室變數
  let privateUser = []

  // 建立大廳ws伺服器
  const lobbyRoom = new WebSocket.Server({
    noServer: true
  })
  // 建立私人ws伺服器
  const privateRoom = new WebSocket.Server({
    noServer: true
  })

  // 大廳伺服器
  lobbyRoom.on(
    'connection',
    async function connection (websocketConnection, connectionRequest) {
      const [_path, params] = connectionRequest?.url?.split('?')
      console.log(12345)
      console.log(_path)
      console.log(params)
      const user = params.split('=')[1]

      websocketConnection.userid = user

      lobbyUser.push({ userid: user, ws: websocketConnection })

      websocketConnection.on('message', async (message) => {
        const data = JSON.parse(message)
        console.log(data)
        lobbyUser.forEach((item, index) => {
          item.ws.send(JSON.stringify(data))
        })
        // websocketConnection.send(JSON.stringify(data))
      })
    }
  )
  // 私人伺服器
  privateRoom.on(
    'connection',
    async function connection (websocketConnection, connectionRequest) {
      const [_path, params] = connectionRequest?.url?.split('?')
      console.log(456)
      console.log(_path)
      console.log(params)

      // const data = {
      //   userid: params,
      //   roomid: msgData.roomid,
      //   content: msgData.msg,
      // }

      // websocketConnection.userid = params

      privateUser.push({ userid: params, ws: websocketConnection })

      websocketConnection.on('message', async (message) => {
        const data = JSON.parse(message)
        websocketConnection.send(JSON.stringify(data))
      })
    }
  )

  expressServer.on('upgrade', (request, socket, head) => {
    const [_path, params] = request?.url?.split('?')
    if (_path === '/lobby') {
      lobbyRoom.handleUpgrade(request, socket, head, (ws) => {
        console.log(123)
        lobbyRoom.emit('connection', ws, request)
      })
    } else if (_path === '/private') {
      privateRoom.handleUpgrade(request, socket, head, (ws) => {
        console.log(456)
        privateRoom.emit('connection', ws, request)
      })
    } else {
      socket.destroy()
    }
  })

  return websocketServer
}

module.exports = websocketServer
