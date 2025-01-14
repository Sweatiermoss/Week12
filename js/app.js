$(document).ready(function () {
  //create Base URL variable
  const BASE_URL = "http://localhost:3000";

  //get all users from db
  const fetchUsers = async () => {
    const response = await fetch(`${BASE_URL}/usersdata`);
    const data = await response.json();
    console.log({ data });
    return data;
  };

  //get a user by their ID
  const fetchUser = async (id) => {
    const response = await fetch(`${BASE_URL}/usersdata/${id}`);
    const data = await response.json();
    return data;
  };

  //Add new user
  const addUser = async (name, email) => {
    const response = await fetch(`${BASE_URL}/usersdata`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email }), // Ensure you send valid data
    });

    const data = await response.json();
    return data;
  };

  // Delete a user by ID
  const deleteUser = async (id) => {
    const response = await fetch(`${BASE_URL}/usersdata/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  };

  // Render users data in the table
  const renderUsers = (users) => {
    let tableRows = "";
    users.forEach((user, index) => {
      tableRows += `
        <tr>
          <td>${index + 1}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td><button class="btn btn-danger delete-button" data-id="${user.id}">Delete</button></td>
        </tr>
      `;
    });
    $("#usersTable tbody").html(tableRows);
  };

  const loadUsers = async () => {
    const users = await fetchUsers();
    renderUsers(users);
  };

  // Add event listener to the Add User button
  $("#addUserButton").click(async function () {
    const name = $("#name").val(); 
    const email = $("#email").val();

    if (name && email) {
      await addUser(name, email);
      // Reload the users after adding a new one
      loadUsers();  
    } else {
      alert("Please fill in all fields.");
    }
  });

  // Add event listener for delete buttons 
  $("body").on("click", ".delete-button", async function () {
    const userId = $(this).data("id");
    await deleteUser(userId);
    // Reload the users after deleting
    loadUsers();  
  });

  loadUsers();
});
