SELECT Posts.post_id AS post_id, Posts.date AS date, Posts.content AS content, Users.username AS username, Roles.role_name AS role_name, Roles.role_color
FROM Posts
INNER JOIN Users
INNER JOIN Roles
ON Posts.user_email=Users.email AND Users.role_name=Roles.role_name
WHERE Posts.thread_id=?
ORDER BY date;