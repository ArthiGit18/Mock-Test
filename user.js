let deleteUserId = null;
async function fetchUsers() {
    try {
        const response = await fetch("https://mock-test-backend-uogj.onrender.com/api/users");
        const result = await response.json();
        const tbody = document.querySelector("#userTable tbody");
        tbody.innerHTML = "";
        if (!result.error && Array.isArray(result.users) && result.users.length > 0) {
            result.users.forEach(user => {
                const row = document.createElement("tr");
                const status = user.status || 'Pending';
                const statusClass = status.toLowerCase() === 'completed' ? 'completed' : 'pending';
                row.innerHTML = `
          <td>${user.username || 'N/A'}</td>
          <td>${user.email || 'N/A'}</td>
          <td>${status}</td>
          <td><button class="status-btn ${statusClass}">${status}</button></td>
          <td><button class="delete-btn" data-id="${user._id}">Delete</button></td>
        `;
                tbody.appendChild(row);
            });
            attachDeleteHandlers();
        } else {
            tbody.innerHTML = "<tr><td colspan='5'>No users found.</td></tr>";
        }
    } catch (err) {
        document.querySelector("#userTable tbody").innerHTML =
            `<tr><td colspan="5">Error: ${err.message}</td></tr>`;
    }
}
function attachDeleteHandlers() {
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            deleteUserId = e.target.dataset.id;
            document.getElementById("confirmModal").classList.remove("hidden");
        });
    });
    document.getElementById("confirmYes").onclick = async () => {
        if (deleteUserId) {
            try {
                const response = await fetch(`https://mock-test-backend-uogj.onrender.com/api/users/${deleteUserId}`, {
                    method: "DELETE"
                });
                const result = await response.json();
                if (!result.error) {
                    fetchUsers();
                } else {
                    alert("Error deleting user: " + result.message);
                }
            } catch (err) {
                alert("Network error: " + err.message);
            } finally {
                document.getElementById("confirmModal").classList.add("hidden");
                deleteUserId = null;
            }
        }
    };
    document.getElementById("confirmNo").onclick = () => {
        deleteUserId = null;
        document.getElementById("confirmModal").classList.add("hidden");
    };
}
fetchUsers();
