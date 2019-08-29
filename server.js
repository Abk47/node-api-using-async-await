const http = require('http')
const port = process.env.NODE_ENV === 'production' ? 80 : 3000
const app = require('./app')

const server = http.createServer(app)

server.listen(port, () => console.log(`Server is listening at ${port}`))
