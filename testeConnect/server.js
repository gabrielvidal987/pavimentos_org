const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'user2',
    password: 'Vid@l9871',
    database: 'obras_lajes'
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

// Habilitar CORS
app.use(cors());

// Habilitar o middleware para parsing do corpo das requisições
app.use(express.json()); // Mover essa linha para cima

// Endpoint para obter os dados
app.get('/api/dados', (req, res) => {
    db.query('SELECT * FROM obras', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint para obter dados de uma obra específica pelo nome
app.get('/api/dados/:nome_obra', (req, res) => {
    const nome_obra = req.params.nome_obra;
    db.query(`SELECT * FROM obras WHERE nome_obra = '${nome_obra}'`, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar dados' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Obra não encontrada' });
        }
        res.json(results);
        console.log(results);
    });
});

// Endpoint para inserir dados
app.post('/api/dados', (req, res) => {
    const { projetista, nome_obra, endereco, torre, data_concreto, pavimento_ativo, pilar, cor_pilar, grade, cor_grade, viga, cor_viga, garfo, cor_garfo, laje, cor_laje } = req.body;
    // Primeiro INSERT na tabela obras
    const sqlObras = 'INSERT INTO obras (projetista, nome_obra, endereco, torre, data_concreto, pavimento_ativo, pilar, cor_pilar, grade, cor_grade, viga, cor_viga, garfo, cor_garfo, laje, cor_laje) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const valuesObras = [projetista, nome_obra, endereco, torre, data_concreto, pavimento_ativo, pilar, cor_pilar, grade, cor_grade, viga, cor_viga, garfo, cor_garfo, laje, cor_laje];
    db.query(sqlObras, valuesObras, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao inserir dados na tabela de obras' });
        }
        // Segundo INSERT na tabela pavimentos
        const sqlPavimentos = 'INSERT INTO pavimentos (obra, nome_pavimento, data_prev) VALUES (?, ?, ?)';
        const valuesPavimentos = [nome_obra, pavimento_ativo, data_concreto];
        db.query(sqlPavimentos, valuesPavimentos, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao inserir dados na tabela de pavimentos' });
            }
            // Resposta de sucesso após ambos os inserts
            res.status(201).json({ message: 'Dados inseridos com sucesso nas tabelas de obras e pavimentos'});
        });
    });
});

// Endpoint para atualizar dados usando nome_obra como identificador
app.put('/api/dados/:nome_obra', (req, res) => {
    const { nome_obra } = req.params;
    const { projetista, endereco, torre, data_concreto, pavimento_ativo, pilar, cor_pilar, grade, cor_grade, viga, cor_viga, garfo, cor_garfo, laje, cor_laje } = req.body;
    console.log('Atualizando obra:', nome_obra);  // Para verificar o nome_obra recebido
    const sqlUpdate = `UPDATE obras SET projetista = ?, endereco = ?, torre = ?, data_concreto = ?, pavimento_ativo = ?, pilar = ?, cor_pilar = ?, grade = ?, cor_grade = ?, viga = ?, cor_viga = ?, garfo = ?, cor_garfo = ?, laje = ?, cor_laje = ? WHERE nome_obra = ?`;
    const valuesUpdate = [projetista, endereco, torre, data_concreto, pavimento_ativo, pilar, cor_pilar, grade, cor_grade, viga, cor_viga, garfo, cor_garfo, laje, cor_laje, nome_obra];
    db.query(sqlUpdate, valuesUpdate, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao atualizar dados na tabela de obras' });
        }
        
        if (result.affectedRows === 0) {
            console.log('Obra não encontrada:', nome_obra);
            return res.status(404).json({ message: 'Obra não encontrada para atualizar' });
        }
        console.log('Obra atualizada com sucesso:', nome_obra);
        res.json({ message: 'Dados atualizados com sucesso' });
    });
});

// Endpoint para inserir pavimento novo
// Endpoint para inserir dados na tabela pavimentos
app.post('/api/pavimentos', (req, res) => {
    const { obra_nome, nome_pavimento, data_prev } = req.body;
    // Verificar se todos os campos necessários foram fornecidos
    if (!obra_nome || !nome_pavimento || !data_prev) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    const sqlInsertPavimentos = `INSERT INTO pavimentos (obra, nome_pavimento, data_prev) VALUES (?, ?, ?)`;
    const valuesPavimentos = [obra_nome, nome_pavimento, data_prev];
    // Executar a query
    db.query(sqlInsertPavimentos, valuesPavimentos, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados na tabela pavimentos:', err);
            return res.status(500).json({ error: 'Erro ao inserir dados na tabela pavimentos' });
        }
        // Se a inserção foi bem-sucedida, enviar uma mensagem de sucesso
        res.status(201).json({ message: 'Dados inseridos com sucesso na tabela pavimentos' });
    });
});


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});