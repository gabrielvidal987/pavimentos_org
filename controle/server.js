const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Configuração da conexão com o banco de dados
//id publico da maquina host 191.252.222.67[mysql@e2664dc9455e /]$ 

// const db = mysql.createConnection({
//     host: '191.252.222.67',
//     user: 'root',
//     password: '92185081abc',
//     database: 'obras_lajes'
// });

const db = mysql.createConnection({
    host: '82.197.65.112',
    user: 'root',
    password: '@A92185081abc',
    database: 'obras_lajes'
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Conectado ao banco de dados!')`)
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
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição de inserção de imagem recebida')`)

    if (!req.file) {
        return res.status(400).send('Nenhum arquivo enviado!');
    }
    const { obra } = req.body;
    const imagemPath = req.file.path;
    const sql = 'INSERT INTO galeria (caminho,obra) VALUES (?,?)'; // Ajuste a tabela conforme necessário
    db.query(sql, [imagemPath, obra], (err, result) => {
        if (err) {
            console.error('Erro ao salvar caminho da imagem no banco de dados:', err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`)
            return res.status(500).json({ error: 'Erro ao salvar caminho da imagem' });
        }
        res.status(201).json({ message: 'Imagem enviada e salva com sucesso!', path: imagemPath });
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Imagem recebida e salva com sucesso!')`)
    });
});

// Endpoint para buscar o caminho das imagens no sql
app.get('/api/getimage/:nome_obra', (req, res) => {
    const nome_obra = req.params.nome_obra;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para pegar galeria da obra ${nome_obra}')`)
    db.query(`SELECT caminho FROM galeria WHERE obra = '${nome_obra}' ORDER BY id_foto;`, (err, results) => {
        if (err) throw err;
        res.json(results);
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Galeria retornada!')`)
    });
});

// Endpoint para obter os dados de todas as obras
app.get('/api/dados', (req, res) => {
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para pegar os dados de todas as obras')`)
    db.query(`SELECT o.insert_sys, o.data_insert, o.projetista, o.nome_obra, o.endereco, o.torre, p.data_prev AS data_concreto, p.nome_pavimento AS pavimento_ativo, o.pilar, o.cor_pilar, o.grade, o.cor_grade, o.viga, o.cor_viga, o.garfo, o.cor_garfo, o.laje, o.cor_laje, o.primeiro_contato_nome,o.primeiro_contato_tel, o.segundo_contato_nome, o.segundo_contato_tel, o.terceiro_contato_nome, o.terceiro_contato_tel FROM obras o LEFT JOIN pavimentos p ON o.nome_obra = p.obra AND p.ativo = 1`, (err, results) => {
        if (err) throw err;
        res.json(results);
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Retornado os dados de todas as obras')`)
    });
});

// Endpoint para obter os dados de todos os usuários
app.get('/api/usuarios', (req, res) => {
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para pegar dados dos usuarios')`)
    db.query('SELECT nome, login, tipo_usuario FROM usuarios ORDER BY nome;', (err, results) => {
        if (err) throw err;
        res.json(results);
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Retornados dados dos usuarios')`)
    });
});

// Endpoint para obter os pavimentos de uma obra especifica
app.get('/api/pavimentos/:obra_nome', (req, res) => {
    const obra_nome = req.params.obra_nome;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para pegar pavimentos da obra ${obra_nome}')`)
    const query = 'SELECT * FROM pavimentos WHERE obra = ?';
    db.query(query, [obra_nome], (err, results) => {
        if (err) {
            console.error('Erro ao buscar pavimentos:', err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`)
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
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Retornados os pavimentos da obra')`)
        }
    });
});

// Endpoint para obter dados de uma obra específica pelo nome
app.get('/api/dados/:nome_obra', (req, res) => {
    const nome_obra = req.params.nome_obra;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para obter os dados da obra ${nome_obra}')`)
    db.query(`SELECT * FROM obras WHERE nome_obra = '${nome_obra}'`, (err, results) => {
        if (err) {
            console.error(err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`)
            return res.status(500).json({ error: 'Erro ao buscar dados' });
        }
        if (results.length === 0) {
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Obra não encontrada')`)
            return res.status(404).json({ message: 'Obra não encontrada' });
        }
        res.json(results);
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Retornados os dados da obra')`)
    });
});

// Endpoint para inserir dados de nova obra / inserir nova obra
app.post('/api/dados', (req, res) => {
    const { projetista, nome_obra, primeiro_contato_nome, primeiro_contato_tel , endereco, torre, data_concreto, pavimento_ativo, pilar, cor_pilar, grade, cor_grade, viga, cor_viga, garfo, cor_garfo, laje, cor_laje } = req.body;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para inserir dados de uma nova obra. nome da obra: ${nome_obra}')`)
    // Primeiro INSERT na tabela obras
    const sqlObras = 'INSERT INTO obras (projetista, nome_obra, primeiro_contato_nome, primeiro_contato_tel , endereco, torre, data_concreto, pavimento_ativo, pilar, cor_pilar, grade, cor_grade, viga, cor_viga, garfo, cor_garfo, laje, cor_laje) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const valuesObras = [projetista, nome_obra, primeiro_contato_nome, primeiro_contato_tel ,  endereco, torre, data_concreto, pavimento_ativo, pilar, cor_pilar, grade, cor_grade, viga, cor_viga, garfo, cor_garfo, laje, cor_laje];
    db.query(sqlObras, valuesObras, (err, result) => {
        if (err) {
            console.error(err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`)
            return res.status(500).json({ error: 'Erro ao inserir dados na tabela de obras' });
        }
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Obra inserida no BD')`)
        // Segundo INSERT na tabela pavimentos
        const sqlPavimentos = 'INSERT INTO pavimentos (obra, nome_pavimento, data_prev,ativo) VALUES (?, ?, ?,1)';
        const valuesPavimentos = [nome_obra, pavimento_ativo, data_concreto];
        db.query(sqlPavimentos, valuesPavimentos, (err) => {
            if (err) {
                console.error(err);
                db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`)
                return res.status(500).json({ error: 'Erro ao inserir dados na tabela de pavimentos' });
            }
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Criado pavimento dessa obra no bd de pavimentos')`)
            // Resposta de sucesso após ambos os inserts
            res.status(201).json({ message: 'Dados inseridos com sucesso nas tabelas de obras e pavimentos'});
        });
    });
});

// Endpoint para verificar as infos de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','user ${username} senha ${password}')`)
    const sqlQuery = `SELECT senha FROM usuarios WHERE login = ? OR nome = ?;`;
    db.query(sqlQuery, [username, username], (err, results) => {
        if (err) {
            console.error("Erro ao consultar o banco de dados: ", err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`);
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
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${res.message}')`)
        } else {
            res.json({ message: "Usuário não encontrado"});
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','usuario não encontrado')`)
        }
    });
});

// Endpoint para atualizar dados de uma obra usando nome_obra como identificador
app.put('/api/dados/:nome_obra', (req, res) => {
    const { nome_obra } = req.params;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para atualizar/alterar dados da obra ${nome_obra}')`)
    const { projetista,primeiro_contato_nome,primeiro_contato_tel, segundo_contato_nome,segundo_contato_tel,terceiro_contato_nome,terceiro_contato_tel, endereco, torre, data_concreto, pavimento_ativo, pilar, grade, viga, garfo, laje, } = req.body;
    const sqlUpdate = `UPDATE obras SET projetista = '${projetista}', primeiro_contato_nome = '${primeiro_contato_nome}',primeiro_contato_tel = '${primeiro_contato_tel}', segundo_contato_nome = '${segundo_contato_nome}',segundo_contato_tel = '${segundo_contato_tel}', terceiro_contato_nome = '${terceiro_contato_nome}',terceiro_contato_tel = '${terceiro_contato_tel}', endereco = '${endereco}', torre = '${torre}', data_concreto = '${data_concreto}', pavimento_ativo = '${pavimento_ativo}', pilar = '${pilar}', grade = '${grade}', viga = '${viga}', garfo = '${garfo}', laje = '${laje}' WHERE nome_obra = '${nome_obra}'`;
    db.query(sqlUpdate, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`);
            return res.status(500).json({ error: 'Erro ao atualizar dados na tabela de obras' });
        }
        
        if (result.affectedRows === 0) {
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','obra não encontrada ${nome_obra}')`);
            return res.status(404).json({ message: 'Obra não encontrada para atualizar' });
        }
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Obra atualizada com sucesso')`);
        res.json({ message: 'Dados atualizados com sucesso' });
    });
});

// Endpoint para Finalizar uma obra
app.put('/api/finalizarobra/:nome_obra', (req, res) => {
    const { nome_obra } = req.params;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para finalizar obra ${nome_obra}')`);
    const sqlUpdate = `UPDATE obras SET obra_ativa = 0 WHERE nome_obra = '${nome_obra}'`;
    db.query(sqlUpdate, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`);
            return res.status(500).json({ error: 'Erro ao atualizar dados na tabela de obras' });
        }
        if (result.affectedRows === 0) {
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Obra não encontrada ${nome_obra}')`);
            return res.status(404).json({ message: 'Obra não encontrada para finalizar' });
        }
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Obra finalizada com sucesso, PARABENS')`);
        res.json({ message: 'Obra finalizada com sucesso, PARABENS' });
    });
});

// Endpoint para atualizar cor do campo determinado com a cor determinada
app.put('/api/cores/:nome_obra', (req, res) => {
    const { nome_obra } = req.params;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para atualizar/alterar cores da obra ${nome_obra}')`);
    const { columnCor, corSelecionada} = req.body;
    const sqlUpdate = `UPDATE obras SET ${columnCor} = '${corSelecionada}' WHERE nome_obra = '${nome_obra}'`;
    db.query(sqlUpdate, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`);
            return res.status(500).json({ error: 'Erro ao atualizar dados na tabela de obras' });
        }
        if (result.affectedRows === 0) {
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Obra não encontrada ${nome_obra}')`);
            return res.status(404).json({ message: 'Obra não encontrada para atualizar' });
        }
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Obra atualizada com sucesso')`);
        res.json({ message: 'Dados atualizados com sucesso' });
    });
});

// Endpoint para apagar um usuario
app.put('/api/login/:login', (req, res) => {
    const { login } = req.params;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para apagar usuario do email ${login}')`);
    const sqlDelete = `DELETE FROM usuarios WHERE login = '${login}';`;
    db.query(sqlDelete, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`);
            return res.status(500).json({ error: 'Erro ao deletar dados na tabela de usuarios' });
        }
        if (result.affectedRows === 0) {
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','usuario não encontrado')`);
            return res.status(404).json({ message: 'usuário não encontrado' });
        }
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Usuario deletado com sucesso!')`);
        res.json({ message: 'Usuario deletado com sucesso!' });
    });
});

// Endpoint para apagar um pavimento
app.put('/api/delpav/:pavimento/:obra', (req, res) => {
    const { pavimento , obra } = req.params;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para apagar pavimento ${pavimento} da obra ${obra}')`);
    const sqlDelete = `DELETE FROM pavimentos WHERE nome_pavimento = '${pavimento}' AND obra = '${obra}';`;
    db.query(sqlDelete, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`);
            return res.status(500).json({ error: 'Erro ao deletar dados na tabela de pavimentos' });
        }
        if (result.affectedRows === 0) {
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','pavimento não encontrado')`);
            return res.status(404).json({ message: 'pavimento não encontrado' });
        }
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','pavimento deletado com sucesso!')`);
        res.json({ message: 'pavimento deletado com sucesso!' });
    });
});

//altera os dados de um pavimento
app.put('/api/altpav/:pavimento/:obra', (req, res) => {
    const { pavimento , obra } = req.params;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para alterar os dados do pavimento ${pavimento}')`);
    const { novo_pavimento,nova_data } = req.body;
    const sqlUpdate = `UPDATE pavimentos SET nome_pavimento = '${novo_pavimento}', data_prev = '${nova_data}' WHERE nome_pavimento = '${pavimento}' AND obra = '${obra}';`;
    db.query(sqlUpdate, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`);
            return res.status(500).json({ error: 'Erro ao alterar dados na tabela de pavimentos' });
        }
        if (result.affectedRows === 0) {
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','pavimento não encontrado')`);
            return res.status(404).json({ message: 'pavimento não encontrado' });
        }
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','pavimento alterado com sucesso!')`);
        res.json({ message: 'pavimento alterado com sucesso!' });
    });
});

// Endpoint para adicionar um usuario
app.put('/api/addlogin/:nome', (req, res) => {
    const { nome,email,senha,tipo_usuario } = req.body;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para adicionar o usuario ${nome}')`);
    const sqlDelete = `INSERT INTO usuarios(nome,login,senha,tipo_usuario) VALUES ('${nome}','${email}','${senha}','${tipo_usuario}');`;
    db.query(sqlDelete, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`);
            return res.status(500).json({ error: 'Erro ao inserir dados na tabela de usuarios' });
        }
        if (result.affectedRows === 0) {
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','usuario não adicionado')`);
            return res.status(404).json({ message: 'usuario não adicionado' });
        }
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Usuario adicionado com sucesso!')`);
        res.json({ message: 'Usuario adicionado com sucesso!' });
    });
});

// Endpoint para alterar um usuario
app.put('/api/altlogin/:login', (req, res) => {
    const { login } = req.params;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para alterar dados do usuario do email ${login}')`);
    const { nome,email,senha,tipo_usuario } = req.body;
    const sqlUpdate = `UPDATE usuarios SET nome = '${nome}', login = '${email}', senha = '${senha}', tipo_usuario = '${tipo_usuario}' tipo WHERE login = '${login}';`;
    db.query(sqlUpdate, (err, result) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`);
            return res.status(500).json({ error: 'Erro ao alterar dados na tabela de usuarios' });
        }
        if (result.affectedRows === 0) {
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','usuario não adicionado')`);
            return res.status(404).json({ message: 'usuario não alterado' });
        }
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Usuario alterado com sucesso!')`);
        res.json({ message: 'Usuario alterado com sucesso!' });
    });
});


// Endpoint para inserir pavimento novo
app.post('/api/pavimentos', (req, res) => {
    const { obra_nome, nome_pavimento, data_prev } = req.body;
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Requisição para inserir novo pavimento na obra ${obra_nome}')`);
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
            db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`);
            return res.status(500).json({ error: 'Erro ao inserir dados na tabela pavimentos' });
        }
        //comando para setar os demais pavimentos como 0 na coluna ativo
        const sqlPavimentosNotAtivo = `UPDATE pavimentos SET ativo = 0 WHERE obra = '${obra_nome}' AND nome_pavimento != '${nome_pavimento}';`
        db.query(sqlPavimentosNotAtivo, valuesPavimentos, (err) => {
            if (err) {
                console.error(err);
                db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','${err}')`);
                return res.status(500).json({ error: 'Erro ao dar set 0 no ativo dos demais pavimentos' });
            }
            // Se a inserção foi bem-sucedida, enviar uma mensagem de sucesso
        res.status(201).json({ message: 'Dados inseridos com sucesso na tabela pavimentos e desativados demais pavimentos' });
        db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Dados inseridos com sucesso na tabela pavimentos e desativados demais pavimentos')`);
        });
    });
});

// Endpoint para receber logs do servidor //acesso --> http://localhost:3000/api/logeventos or  http://ipPCHOST:3000/api/logeventos
app.get('/api/logeventos', (req, res) => {
    db.query('SELECT * FROM log_eventos ORDER BY log_id DESC LIMIT 5;', (err, results) => {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(results, null, 2));
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    db.query(`INSERT INTO log_eventos(funcao, evento) VALUES ('server.js','Servidor rodando na porta ${PORT}')`);
});