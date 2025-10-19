import * as filmeModel from '../models/filmeModel.js';

// garante inicialização do DB
await filmeModel.initDB();

export async function listar(req, res) {
  try {
    const filmes = await filmeModel.listarFilmes();
    res.status(200).json(filmes);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar filmes', erro: err.message });
  }
}

export async function buscar(req, res) {
  try {
    const filme = await filmeModel.buscarFilme(req.params.id);
    if (!filme) return res.status(404).json({ mensagem: 'Filme não encontrado' });
    res.status(200).json(filme);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar', erro: err.message });
  }
}

export async function cadastrar(req, res) {
  try {
    const { titulo, diretor, ano, sinopse } = req.body;

    if(!/^.{8,}$/.test(ano)){
      res.status(400).json({mensagem: 'Digite um ano válido com exatamente 4 dígitos (exemplo: 2025).'})
    }

    // verificar se todos os campos obrigatorios foram preenchidos
    if (!titulo || !diretor || !ano || !sinopse) {
   return res.status(400).json({ mensagem: 'Preencha todos os campos' });
  }

    // Verifica se já existe filme igual
    const existente = await filmeModel.buscarPorTitulo(titulo);
    if (existente) {
      return res.status(400).json({ mensagem: 'Filme já cadastrado' });
    }

    // Cadastra novo filme
    const novo = await filmeModel.cadastrarFilme(req.body);
    res.status(201).json({ mensagem: 'Filme cadastrado com sucesso', novo });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar', erro: err.message });
  }
}


export async function atualizar(req, res) {
  try {
    const atualizado = await filmeModel.atualizarFilme(req.params.id, req.body);
    if (!atualizado) return res.status(404).json({ mensagem: 'Filme não encontrado' });
    res.status(200).json(atualizado);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao atualizar', erro: err.message });
  }
}

export async function deletar(req, res) {
  try {
    const ok = await filmeModel.deletarFilme(req.params.id);
    if (!ok) return res.status(404).json({ mensagem: 'Filme não encontrado' });
    res.status(200).json({ mensagem: 'Filme removido com sucesso' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao deletar', erro: err.message });
  }
}

 
