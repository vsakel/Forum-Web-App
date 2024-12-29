SELECT username, Users.role_name, role_color
FROM Users
INNER JOIN Roles
ON Users.role_name=Roles.role_name;