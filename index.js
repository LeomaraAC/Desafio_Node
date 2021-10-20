const express = require('express');
const faker = require('faker')
const mysql = require('mysql')

const app = express()
const port = 8080

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'desafio'
}

app.get('/', (req, res) => {
    const nome = faker.name.findName()
    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO people(nome) VALUES (?)`
    connection.query(sql, nome)
    let html = `
        <h1> Full Cycle </h1>
        <br>
        <ul>
    `
    connection.query('SELECT * FROM people;', (err, result) => {
        if (result) {
            result.forEach(row => {
                html += `<li>${row.nome}</li>`
            })
        } else {
            html += `<li>Sem dados</li>`
        }
        html += `</ul>`

        res.send(html)

    })

    connection.end()

})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})
