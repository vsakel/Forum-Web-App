START TRANSACTION;
INSERT INTO Threads (title, category_id)
VALUES ("Φωτογραφίες bigfoot", 2);
INSERT INTO Posts (date, content, user_email, thread_id)
VALUES (NOW(), "Συλλογή φωτογραφιών του πολυαγαπημένουμυθικού πρωτεύοντος θυλαστικού", "nvel18@gmail.com", LAST_INSERT_ID());
COMMIT;