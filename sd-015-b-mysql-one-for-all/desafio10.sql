SELECT
  M.musica AS nome,
  COUNT(HR.musica_id) AS reproducoes
FROM SpotifyClone.musicas AS M
INNER JOIN SpotifyClone.historico_reproducoes AS HR
  ON M.musica_id = HR.musica_id
INNER JOIN SpotifyClone.usuarios AS U
  ON U.usuario_id = HR.usuario_id
WHERE U.plano_id IN(1, 4)
GROUP BY nome
ORDER BY nome;