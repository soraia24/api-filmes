import * as usuarioModel from "../models/usuarioModel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export async function todosUsuarios(req, res) {
  try {
    const usuarios = await usuarioModel.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar usuários', erro: err.message });
  }
}

export async function buscar(req, res) {
  try {
    const usuario = await usuarioModel.buscarUsuarios(req.params.id);
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar', erro: err.message });
  }
}

export async function novoUsuario(req, res) {
  try {
    const { login,  nome, email, cel, senha, role } = req.body;

    //  Se tentou criar admin mas não é admin logado
    if (role === 'admin' && (!req.usuario || req.usuario.role !== 'admin')) {
      return res.status(403).json({ mensagem: 'Apenas administradores podem criar outros administradores' });
    }

    //  Se não há token (visitante) ou se é usuário comum, força role 'user'
    if (!req.usuario || req.usuario.role !== 'admin') {
      req.body.role = 'user';
    }

    // verificar se todos os campos obrigatorios foram preenchidos
    if (!login || !nome || !email || !cel || !senha) {
   return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios' });
  }
 //Senha: pelo menos 8 caracteres
  if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(senha)){
    return res.status(400).json({mensagem: 'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números'})
  }

  //Celular: 2 dígitos de DDD + 9 dígitos (total 11 números)
  const celularLimpo = String(cel).replace(/\D/g, '');
  if(!/^\d{11}$/.test(celularLimpo)){
  return res.status(400).json({mensagem: 'O celular deve conter DDD + 9 dígitos (ex: 84999999999)'})
}
  req.body.cel = celularLimpo;

    //  Verifica se já existe login igual
    const existente = await usuarioModel.buscarPorLogin(login);
    if (existente) {
      return res.status(400).json({ mensagem: 'Login já cadastrado' });
    }
    

    // Cadastra o novo usuário normalmente
    const novo = await usuarioModel.cadastrarUsuarios(req.body);
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', novo });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar Usuário', erro: err.message });
  }
}


export async function login(req, res) {
  try {
    const { login, senha } = req.body;

    const usuario = await usuarioModel.buscarPorLogin(login);
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
    }


    const token = jwt.sign(
      { id: usuario.id, login: usuario.login, role: usuario.role  },
      'Segurança',
      { expiresIn: '1h' } // token válido por 1 hora
    );

    res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao fazer login', erro: err.message });
  }
}

export async function atualizar(req, res){
  try{
      const atualizado = await usuarioModel.atualizarUsuarios(req.params.id, req.body);
        if (!atualizado) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }
      res.status(200).json(atualizado);
    } catch (err) {
      res.status(500).json({ mensagem: 'Erro ao atualizar Usuário', erro: err.message });
    }
}
export async function deletar(req, res) {
  try {
    const excluido = await usuarioModel.deletarUsuarios(req.params.id);
      if (!excluido) {
        return res.status(404).json({ mensagem: 'Usuario não encontrado' });
      }
    res.status(200).json({ mensagem: 'Usuaro removido com sucesso' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao deletar', erro: err.message });
  }
}