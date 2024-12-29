SELECT role_name, role_color, EXISTS(SELECT role_name FROM Users WHERE role_name=Roles.role_name)
FROM Roles;