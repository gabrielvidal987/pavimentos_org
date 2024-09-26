const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
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

// Configuração do multer para armazenamento de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'galeria/'); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo
    }
});
//variavel para controlar o multer com o storage configurado
const upload = multer({ storage });
// Endpoint para upload de imagens
app.post('/api/upload', upload.single('imagem'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo enviado!');
    }
    const { obra } = req.body;
    const imagemPath = req.file.path;
    const sql = 'INSERT INTO galeria (caminho,obra) VALUES (?,?)'; // Ajuste a tabela conforme necessário
    db.query(sql, [imagemPath, obra], (err, result) => {
        if (err) {
            console.error('Erro ao salvar caminho da imagem no banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao salvar caminho da imagem' });
        }
        res.status(201).json({ message: 'Imagem enviada e salva com sucesso!', path: imagemPath });
    });
});

// Endpoint para buscar o caminho das imagens no sql
app.get('/api/getimage/:nome_obra', (req, res) => {
    const nome_obra = req.params.nome_obra;
    db.query(`SELECT caminho FROM galeria WHERE obra = '${nome_obra}' ORDER BY id_foto;`, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint para obter os dados de todas as obras
app.get('/api/dados', (req, res) => {
    db.query('SELECT o.insert_sys, o.data_insert, o.projetista, o.nome_obra, o.endereco, o.torre, p.data_prev AS data_concreto, p.nome_pavimento AS pavimento_ativo, o.pilar, o.cor_pilar, o.grade, o.cor_grade, o.viga, o.cor_viga, o.garfo, o.cor_garfo, o.laje, o.cor_laje FROM obras o LEFT JOIN pavimentos p ON o.nome_obra = p.obra AND p.ativo = 1;', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint para obter os dados de todos os usuários
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT nome, login FROM usuarios ORDER BY nome;', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint para obter os pavimentos de uma obra especifica
app.get('/api/pavimentos/:obra_nome', (req, res) => {
    const obra_nome = req.params.obra_nome;
    const query = 'SELECT * FROM pavimentos WHERE obra = ?';
    db.query(query, [obra_nome], (err, results) => {
        if (err) {
            console.error('Erro ao buscar pavimentos:', err);
            res.status(500).send('Erro ao buscar pavimentos');
        } else {
            // Formatar o campo datetime para DD/MM/YYYY
            const formattedResults = results.map(result => {
                if (result.data_prev) {
                    const data = new Date(result.data_prev);
                    const dia = String(data.getDate()).padStart(2, '0');
                    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam de 0
                    const ano = data.getFullYear();
                    result.data_prev = `${dia}/${mes}/${ano}`;
                }
                // Converter o campo 'ativo' em 'ativo' ou 'desativado'
                result.ativo = result.ativo === 1 ? 'sim' : 'não';
                return result;
            });
            res.json(formattedResults);  // Retorna os pavimentos com a data formatada
        }
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
        const sqlPavimentos = 'INSERT INTO pavimentos (obra, nome_pavimento, data_prev,ativo) VALUES (?, ?, ?,1)';
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

// Endpoint para verificar as infos de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`user ${username} senha ${password}`)
    const sqlQuery = `SELECT senha FROM usuarios WHERE login = ? OR nome = ?;`;
    db.query(sqlQuery, [username, username], (err, results) => {
        if (err) {
            console.error("Erro ao consultar o banco de dados: ", err);
            res.status(500).json({ error: "Erro interno no servidor" });
            return;
        }
        if (results.length > 0) {
            const storedPassword = results[0].senha;
            const isPasswordCorrect = password === storedPassword;
            res.json({
                message: isPasswordCorrect ? "Login bem-sucedido" : "Senha incorreta",
                success: isPasswordCorrect // Retorna true se a senha for correta, false se for incorreta
            });
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    });
});


// Endpoint para atualizar dados usando nome_obra como identificador
app.put('/api/dados/:nome_obra', (req, res) => {
    const { nome_obra } = req.params;
    const { projetista, nome_obra_novo, endereco, torre, data_concreto, pavimento_ativo, pilar, cor_pilar, grade, cor_grade, viga, cor_viga, garfo, cor_garfo, laje, cor_laje } = req.body;
    console.log('Atualizando obra:', nome_obra);  // Para verificar o nome_obra recebido
    const sqlUpdate = `UPDATE obras SET projetista = ?, nome_obra = ?, endereco = ?, torre = ?, data_concreto = ?, pavimento_ativo = ?, pilar = ?, cor_pilar = ?, grade = ?, cor_grade = ?, viga = ?, cor_viga = ?, garfo = ?, cor_garfo = ?, laje = ?, cor_laje = ? WHERE nome_obra = ?`;
    const valuesUpdate = [projetista, nome_obra_novo , endereco, torre, data_concreto, pavimento_ativo, pilar, cor_pilar, grade, cor_grade, viga, cor_viga, garfo, cor_garfo, laje, cor_laje, nome_obra];
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

// Endpoint para apagar um usuario
app.put('/api/login/:login', (req, res) => {
    const { login } = req.params;
    const sqlDelete = `DELETE FROM usuarios WHERE login = '${login}';`;
    db.query(sqlDelete, (err, result) => {
        console.log(result)
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao deletar dados na tabela de usuarios' });
        }
        if (result.affectedRows === 0) {
            console.log('usuario não encontrado');
            return res.status(404).json({ message: 'usuário não encontrado' });
        }
        console.log('Usuario deletado com sucesso!');
        res.json({ message: 'Usuario deletado com sucesso!' });
    });
});

// Endpoint para apagar um pavimento
app.put('/api/delpav/:pavimento/:obra', (req, res) => {
    const { pavimento , obra } = req.params;
    const sqlDelete = `DELETE FROM pavimentos WHERE nome_pavimento = '${pavimento}' AND obra = '${obra}';`;
    db.query(sqlDelete, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao deletar dados na tabela de pavimentos' });
        }
        if (result.affectedRows === 0) {
            console.log('pavimento não encontrado');
            return res.status(404).json({ message: 'pavimento não encontrado' });
        }
        console.log('Usuario deletado com sucesso!');
        res.json({ message: 'pavimento deletado com sucesso!' });
    });
});

//altera os dados de um pavimento
app.put('/api/altpav/:pavimento/:obra', (req, res) => {
    const { pavimento , obra } = req.params;
    const { novo_pavimento,nova_data } = req.body;
    const sqlUpdate = `UPDATE pavimentos SET nome_pavimento = '${novo_pavimento}', data_prev = '${nova_data}' WHERE nome_pavimento = '${pavimento}' AND obra = '${obra}';`;
    db.query(sqlUpdate, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao alterar dados na tabela de pavimentos' });
        }
        if (result.affectedRows === 0) {
            console.log('pavimento não encontrado');
            return res.status(404).json({ message: 'pavimento não encontrado' });
        }
        console.log('Usuario alterado com sucesso!');
        res.json({ message: 'pavimento alterado com sucesso!' });
    });
});



// Endpoint para adicionar um usuario
app.put('/api/addlogin/:nome', (req, res) => {
    const { nome,email,senha } = req.body;
    const sqlDelete = `INSERT INTO usuarios(nome,login,senha) VALUES ('${nome}','${email}','${senha}');`;
    db.query(sqlDelete, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao inserir dados na tabela de usuarios' });
        }
        if (result.affectedRows === 0) {
            console.log('usuario não adicionado');
            return res.status(404).json({ message: 'usuario não adicionado' });
        }
        console.log('Usuario adicionado com sucesso!');
        res.json({ message: 'Usuario adicionado com sucesso!' });
    });
});

// Endpoint para alterar um usuario
app.put('/api/altlogin/:login', (req, res) => {
    const { login } = req.params;
    const { nome,email,senha } = req.body;
    const sqlUpdate = `UPDATE usuarios SET nome = '${nome}', login = '${email}', senha = '${senha}' WHERE login = '${login}';`;
    db.query(sqlUpdate, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao alterar dados na tabela de usuarios' });
        }
        if (result.affectedRows === 0) {
            console.log('usuario não adicionado');
            return res.status(404).json({ message: 'usuario não alterado' });
        }
        console.log('Usuario alterado com sucesso!');
        res.json({ message: 'Usuario alterado com sucesso!' });
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
        const sqlPavimentosNotAtivo = `UPDATE pavimentos SET ativo = 0 WHERE obra = '${obra_nome}' AND data_prev != '${data_prev}';`
        db.query(sqlPavimentosNotAtivo, valuesPavimentos, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao dar set 0 no ativo dos demais pavimentos' });
            }
            // Se a inserção foi bem-sucedida, enviar uma mensagem de sucesso
        res.status(201).json({ message: 'Dados inseridos com sucesso na tabela pavimentos e desativados demais pavimentos' });
        });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});