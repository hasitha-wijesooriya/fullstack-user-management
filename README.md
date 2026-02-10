## Project Structure

- user-management-system-api : Spring Boot backend (version - 3.5.4)
- user-app : Next js build frontend with Redux Toolkit

### Backend
-Server-Port: 8081
- Database: MySQL
- Java 17+
- Testing: JUnit, Mockito, Jest

### API Endpoins
- `GET` | `/user/find-all` | Get all users (paginated) 
- `GET` | `/user/find-by-id/{id}` | Get user by ID 
- `POST` | `/user/create` | Create a new user 
- `PUT` | `/user/update/{id}` | Update existing user 
- `DELETE` | `/user/delete/{id}` | Delete a user 
  
 `src/test/java/...`
- Controller tests
- Service tests
- Repo tests

---

### Frontend

-  View all users in a table
-  Create new users
-  Edit existing users
-  Delete users with confirmation dialog
-  View user details (read-only mode)
-  Toast notifications for all actions
-  Search users


