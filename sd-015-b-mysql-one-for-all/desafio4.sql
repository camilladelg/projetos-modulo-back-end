SELECT
  U.usuario AS usuario,
  IF(MAX(YEAR(HR.data_reproducao)) = 2021, 'Usuário ativo', 'Usuário inativo') AS condicao_usuario
FROM SpotifyClone.usuarios AS U
INNER JOIN SpotifyClone.historico_reproducoes AS HR
  ON U.usuario_id = HR.usuario_id
GROUP BY U.usuario 
ORDER BY U.usuario;