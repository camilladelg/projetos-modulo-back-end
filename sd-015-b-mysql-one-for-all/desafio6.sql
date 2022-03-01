SELECT
  MIN(P.valor) AS faturamento_minimo,
  MAX(P.valor) AS faturamento_maximo,
  ROUND(AVG(P.valor), 2) AS faturamento_medio,
  ROUND(SUM(P.valor), 2) AS faturamento_total
FROM SpotifyClone.planos AS P
INNER JOIN SpotifyClone.usuarios AS U
  ON P.plano_id = U.plano_id;