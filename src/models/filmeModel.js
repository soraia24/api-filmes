import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Define o caminho da pasta database
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbFolder = join(__dirname, '..', 'database');

// Garante que a pasta src/database exista
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true });
}

// Caminho do arquivo JSON
const file = join(dbFolder, 'filmes.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, { filmes: [] });

// Inicializa o banco de dados
export async function initDB() {
  await db.read();
  db.data ||= { filmes: [] };
  await db.write();
}

// Listar filmes
export async function listarFilmes() {
  await db.read();
  return db.data.filmes;
}

// Cadastrar filme
export async function cadastrarFilme(filme) {
  await db.read();
  const novo = {
    id: db.data.filmes.length ? Math.max(...db.data.filmes.map(f => f.id)) + 1 : 1,
    ...filme
  };
  db.data.filmes.push(novo);
  await db.write();
  return novo;
}

// Buscar por id
export async function buscarFilme(id) {
  await db.read();
  return db.data.filmes.find(f => f.id === Number(id)) || null;
}

// Atualizar filme
export async function atualizarFilme(id, dados) {
  await db.read();
  const index = db.data.filmes.findIndex(f => f.id === Number(id));
  if (index === -1) return null;
  db.data.filmes[index] = { ...db.data.filmes[index], ...dados };
  await db.write();
  return db.data.filmes[index];
}

// Deletar filme
export async function deletarFilme(id) {
  await db.read();
  const index = db.data.filmes.findIndex(f => f.id === Number(id));
  if (index === -1) return false;
  db.data.filmes.splice(index, 1);
  await db.write();
  return true;
}

//buscar por titulo
export async function buscarPorTitulo(titulo) {
  await db.read();
  return db.data.filmes.find(t => t.titulo === titulo);
}