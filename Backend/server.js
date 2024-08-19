const express = require('express')
const path = require('path')


const app = express()
const frontEndBuildPath = path.join(__dirname, '..', 'ScreenTimeTracker-Frontend', 'dist')

app.use(express.static(frontEndBuildPath));
app.get('/',(req, res) => {
    res.sendFile(path.join(frontEndBuildPath, 'index.html'))
})

app.listen(3000)