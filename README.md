# [Address Book Manager](https://address-book-by-rakibul-wdp.netlify.app) || [Task Manager](https://task-manager-api-rakibul-wdp.onrender.com)
### 1. Simple Address Book Manager [Live Site](https://address-book-by-rakibul-wdp.netlify.app)
- a. User can add a contact with name and mobile number(Duplicate mobile number not allowed)
- b. Can view list of all contacts in ascending order of name.
  - Can filter records with name.
  - Can filter records with mobile number.
  - Filtering should be phrase search, Ex Deepak can be search by typing only De or Dep).
- c. Can edit a contact.
- d. Can delete a contact.

### Task Manager API [Live Site](https://task-manager-api-rakibul-wdp.onrender.com)
- Create User: POST request
  - ENDPOINT: {baseurl}/api/user

- Create Task: POST request
  - ENDPOINT: {baseurl}/api/task

- Get All Tasks : GET request
  - ENDPOINT: {baseurl}/api/task
  - Filters: can use any of name, status and dueDate
  - ENDPOINT: {baseurl}/api/task?name=<name>&status=<status>&dueDate=<due date>

- Delete a task : DELETE request
  - ENDPOINT: {baseurl}/api/task/:taskId
  
- Edit task : PUT request
  - ENDPOINT: {baseurl}/api/task/:taskId
  
- Change task status : PATCH request
  - ENDPOINT: {baseurl}/api/task/:taskId
