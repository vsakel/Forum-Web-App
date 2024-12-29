SELECT Privileges.role_name, role_color, Privileges.type
FROM Privileges
INNER JOIN Roles
ON Privileges.role_name=Roles.role_name
WHERE category_id=2;