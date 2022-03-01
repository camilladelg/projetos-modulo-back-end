SELECT 
  U.usuario AS usuario,
  COUNT(HR.usuario_id) AS qtde_musicas_ouvidas,
  ROUND(SUM(M.duracao/60), 2) AS total_minutos
FROM SpotifyClone.usuarios AS U
INNER JOIN SpotifyClone.historico_reproducoes AS HR
  ON U.usuario_id = HR.usuario_id
INNER JOIN SpotifyClone.musicas AS M
  ON M.musica_id = HR.musica_id
GROUP BY usuario
ORDER BY usuario;