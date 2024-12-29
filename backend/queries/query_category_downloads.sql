SELECT download_id, title, date, username, role_color
FROM Downloads
INNER JOIN Users
INNER JOIN Roles
ON Downloads.user_email=Users.email AND Users.role_name=Roles.role_name
WHERE category_id=4;