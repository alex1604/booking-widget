const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const server = express();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.text(); // convert the request body object to a javascript object

const areas = require('./areas.js')


server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET")
    res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const searchMe = (term, areas, res) => {
    let results = [];
    let sendResults = results => {
        res
            .send(results)
            .end()
    }
    let searchOperation = (term,areas) => {
        for (let key in areas) {
            for (let i = 0; i < areas[key].length; i++) {
                let data = areas[key][i].data;

                for( let j = 0; j < data.length; j++){
                    if (data[j].includes(term)) {
                        
                        results.push({title: areas[key][i].name, description: areas[key][i].data[j]})
                    }
                }
            }
        }
        sendResults(results)
    }
    searchOperation(term, areas)
}

server.get('/api/search', (req, res) => {
    let term = req.query.q.toLowerCase()
    searchMe(term, areas, res)
});

const port = 3000;
server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
})
