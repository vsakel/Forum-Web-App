WITH RECURSIVE cte (cat_id, parent_id) AS
(
  SELECT category_id, parent_category_id FROM Categories WHERE category_id=4
  UNION ALL
  SELECT category_id, parent_category_id FROM Categories INNER JOIN cte ON cte.parent_id=Categories.category_id WHERE cte.cat_id IS NOT NULL
)
SELECT type FROM Privileges WHERE category_id IN (SELECT cat_id FROM cte) AND role_name='user';