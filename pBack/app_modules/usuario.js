const express = require('express');

module.exports = (connection) => {
    const router = express.Router();

    router.post('/novocadastro/:id/:id2', (req, resp) => {
        let id_detalhes = req.params.id;
        let id2 = req.params.id2
        connection.query("INSERT INTO partidas_jogadores VALUES(0, (SELECT idpartida FROM partida WHERE jogosId = (SELECT idjogos FROM jogos WHERE detalhes = ?)), ?)",
        [id_detalhes, id2],
        (err, result) =>{
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {        
                resp.status(200);    
                resp.json(result);            
            }
        });
    });

    router.get('/meusjogos/:id', (req, resp) => {
        let id_usuario = req.params.id;

        connection.query("SELECT j.nomejogo, j.horario, d.data_jogo FROM jogos as j, detalhes as d WHERE d.iddetalhes = j.detalhes AND j.dono = ?",
        [id_usuario],
        (err, result) =>{
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {        
                resp.status(200);    
                resp.json(result);            
            }
        });
    });

    router.get('/usuario/:id', (req, resp) => {
        let id_usuario = req.params.id;
    
        connection.query("SELECT nome, avaliacao FROM usuario WHERE idUsuario = ?",
        [id_usuario],
        (err, result) => {
            
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {        
                resp.status(200);    
                resp.json(result);            
            }
        });    
    });
    
    router.post('/usuario', (req, resp) => {
        let usuario = req.body;
    
        if (usuario == null) {
            resp.status(204).end();
        } else {
            connection.query('INSERT INTO usuario SET ?',
            [usuario], 
            (err, result) => {
    
                if (err) {
                    console.log(err);
                    resp.status(500).end();
                } else {
                    resp.status(200);
                    resp.json(result);
                }
            });
        }    
    });
    
    router.put('/usuario/:id', (req, resp) => {
        let id_usuario = req.params.id;
        let usuario = req.body;    
    
        connection.query('UPDATE usuario SET ? WHERE idUsuario = ?',
        [usuario, id_usuario], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    router.delete('/usuario/:id', (req, resp) => {
        let id_usuario = req.params.id;
    
        connection.query('DELETE FROM usuario WHERE idUsuario = ?',
        [id_usuario], 
        (err, result) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });

    router.put('/usuario/:id/avaliar', (req, resp) => {
        let id_usuario = req.params.id;
        let avaliacao = req.query.avaliacao;
    
        connection.query('UPDATE usuario SET avaliacao = ? WHERE idUsuario = ?',
        [avaliacao,id_usuario], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });

    return router;
}