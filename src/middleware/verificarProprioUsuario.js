export function verificarProprioUsuario(req, res, next) {
  const idParam = Number(req.params.id);
  const usuario = req.usuario;

  // Se for admin, pode tudo
  if (usuario.role === 'admin') {
    return next();
  }

  // Se o ID no token for diferente do ID da rota, bloqueia
  if (usuario.id !== idParam) {
    return res.status(403).json({
      mensagem: 'Você só pode alterar ou deletar o seu próprio usuário'
    });
  }

  next();
}
