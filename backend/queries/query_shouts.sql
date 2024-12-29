SELECT Shouts.shout_id, Shouts.date, Shouts.content, Users.username, Users.role_name, Roles.role_color
FROM Shouts
INNER JOIN Users
INNER JOIN Roles
ON Shouts.user_email=Users.email AND Users.role_name=Roles.role_name
ORDER BY date;