SELECT
  M.musica AS cancao,
  COUNT(usuario_id) AS reproducoes
FROM SpotifyClone.musicas AS M
INNER JOIN SpotifyClone.historico_reproducoes AS HR
  ON M.musica_id = HR.musica_id
GROUP BY cancao
ORDER BY reproducoes DESC, cancao
LIMIT 2;