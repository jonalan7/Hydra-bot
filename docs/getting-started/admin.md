# Example Postman
Use **Postman** to test the routes!
[Postman example](https://github.com/jonalan7/Hydra-bot/blob/master/Postman/postman_collection.json)
[Download Postman](https://www.postman.com/downloads/)

### Commands for administration via terminal

To start the administration interface, run the following command in the terminal:

```bash
> yarn admin
```

Install yarn Ubuntu:

```bash
> curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
> echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
> sudo apt update && sudo apt install yarn
> yarn
```

#### what is an administrator for?
Administrators are responsible for managing API users via Webhook. They can execute commands that allow creating, deleting, and managing user data.

## Available Commands in the Terminal for Administration:

Here is the list of commands an administrator can use in the terminal to manage users:

| Command       | Description                                      |
|---------------|--------------------------------------------------|
| `/create`     | Create a new user                                |
| `/delete`     | Delete an existing user                          |
| `/selectid`   | Show a user by ID                                |
| `/selectname` | Show a user by name                              |
| `/getall`     | List all users                                   |
| `/deactivate` | Disable user                                     |
| `/activate`   | Activate User                                    |
| `/changename` | Change a user's name                             |
| `/password`   | Change a user's password                         |
| `/cls`        | Clear screen/terminal                            |
| `/help`       | List all available commands for administration   |
| `/exit`       | Exit the administration manager                  |


### Administration via Webhook
These routes allow you to manage and query users using a REST API. An administrator can access these routes by authenticating with a specific header that includes the admin credentials.

To authenticate requests via Webhook, you need to include the following headers in the request:

```json
{
    "Content-Type" : "application/json",
    "admin" : "admin",
    "admin_pass" : "admin"
}
```

### List of Routes for User Management:

With an [administrator](#commands-for-administration-via-terminal) (there is a default administrator, the username and password as admin), he can access via Web Service with the following routes:

| Type | Route to browser         | Description          | Body                                                |
|------|--------------------------|----------------------|-----------------------------------------------------|
| POST | `/create_user`           | Create user          | `{"name":"USE","password":"USER PASSWORD"}`         |
| DEL  | `/delete_user/ID_USE`    | Delete user          | `EMPTY`                                             |
| GET  | `/get_user_by_id/ID_USE` | Show user by ID      | `EMPTY`                                             |
| GET  | `/get_all_users`         | List all users       | `EMPTY`                                             |
| PUT  | `/deactivate_user`       | Disable user         | `{"id":"USER ID"}`                                  |
| PUT  | `/activate_user`         | Activate User        | `{"id":"USER ID"}`                                  |
| PUT  | `/change_name`           | Change username      | `{"id":"USER ID","name":"NEW USERNAME"}`            |
| PUT  | `/change_password`       | Change user password | `{"id":"USER ID","password":"NEW SECURE PASSWORD"}` |

### How to Use the Routes:

- **POST `/create_user`**: This route creates a new user. Send a JSON body containing the name and password of the user you want to create.

- **DELETE `/delete_user/USER_ID`**: This route deletes a specific user by their USER_ID. No body is required in the request.

- **GET `/get_user_by_id/USER_ID`**: To retrieve a user by their ID, send a GET request. No body is required.

- **GET `/get_all_users`**: This route lists all users. No body is required in the request.

- **PUT `/deactivate_user`**: To deactivate a user, send a JSON body containing the USER_ID of the user you want to disable.

- **PUT `/activate_user`**: This route activates a disabled user. Send the USER_ID in the request body.

- **PUT `/change_name`**: To change a user's name, send the USER_ID and the new name in the request body.

- **PUT `/change_password`**: This route changes a user's password. Send the USER_ID and the new password in the request body.