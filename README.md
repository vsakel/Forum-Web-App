# forum
An assignment for databases course of the 9th semester in ECE A.U.Th.

# Dependencies
- Docker
- docker-compose
# Running
Run docker-compose up. By default, the site is hosted on localhost:8888

# User accounts
By default, the accounts defined in the assignment examples are created. Their password is the local-part of their email address (for example ttyr@yahoo.gr->ttyr). Alternatively, new users can be registered. In order to access inbox/outbox and create new posts, shouts and private messages, you need to be logged in first. As a toy app, there is no sophisticated implementation of authorization and user sessions, so to maintain the session, only use the UI navigation (no refreshes or manual URL changes) else you will be automatically logged out.
