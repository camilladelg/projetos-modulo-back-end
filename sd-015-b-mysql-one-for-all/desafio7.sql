SELECT
  A.artista AS artista,
  ALB.album AS album,
  COUNT(A_S.usuario_id) AS seguidores
FROM SpotifyClone.artistas AS A
INNER JOIN SpotifyClone.artistas_seguidos AS A_S
  ON A.artista_id = A_S.artista_id
INNER JOIN SpotifyClone.albuns AS ALB
  ON A.artista_id = ALB.artista_id
GROUP BY ALB.album_id
ORDER BY seguidores DESC, artista, album;