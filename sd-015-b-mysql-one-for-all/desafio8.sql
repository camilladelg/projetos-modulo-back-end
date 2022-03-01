SELECT
  A.artista AS artista,
  ALB.album AS album
FROM SpotifyClone.artistas AS A
INNER JOIN SpotifyClone.albuns AS ALB
  ON A.artista_id = ALB.artista_id
WHERE artista = 'Walter Phoenix' 
ORDER BY album;