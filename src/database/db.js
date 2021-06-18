 // importar a dependencia do SQLite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que ira fazer operacoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db


 // utilizar o objeto de banco de dados para nossas operacoes com comandos sql
db.serialize(() => {
    // criando uma tabela 
     db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
     `)
    // inserindo dados
    const query = `
        INSERT INTO places (
            image, 
            name, 
            address, 
            address2, 
            state, 
            city, 
            items
        ) VALUES (
            ?,?,?,?,?,?,?
        );
    `
    const values = [
        "https://saiunorio.com.br/wp-content/uploads/2017/07/painelrocinha1-e1500915082195.jpg",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
]
function afterInsertData(err) {
    if(err) {
        return console.log(err)
    }
    console.log("Cadastrado com sucesso!")
    console.log(this)
}

db.run(query, values, afterInsertData)

    // consultar os dados da tabela
db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão os seus registros: ")
        console.log(rows)
})

// deletar um dado da tabela
    db.run(`DELETE FROM places`, function(err) {
    if(err) {
        return console.log(err)
    }

    console.log("Registro deletado com sucesso")
}) 
 



}) 