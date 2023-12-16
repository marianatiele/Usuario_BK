const express = require('express');
const app = express();
const PORT =  5000;


app.use(express.json());

const user = [];

app.get('/user', (req, res) => res.json(user))

app.post('/user', (req, res) =>{
    const {nome, idade, profissao} = req.body;

    if(!nome){
        return res.status(400).json({erro: "Usuário não encontrado "})
    }

    const novaTarefa = {id: user.length +1 , nome, idade, profissao}

    user.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

app.put('/user/:id', (req, res) =>{
    const usuario = user.find((usuario) => usuario.id === +req.params.id);

    if(usuario){
        Object.assign(usuario, req.body);

        res.json(user);
    }else{
        res.status(404).json({erro:'usuário não encontrado'})
    }
});


app.delete('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id); 

    const index = user.findIndex((usuario) => usuario.id === userId);

    if (index !== -1) {
        user.splice(index, 1);
        res.json({ mensagem: 'Usuário excluído com sucesso' });
    } else {
        res.status(404).json({ erro: 'Usuário não encontrado' });
    }
});


app.listen(PORT, () =>{
    console.log(`API http://localhost:${PORT}`)
})
