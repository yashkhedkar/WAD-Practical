document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const userList = document.getElementById("userList");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    function displayUsers() {
        userList.innerHTML = "";
        users.forEach((user, index) => {
            const li = document.createElement("li");
            li.textContent = `Name: ${user.name}, Email: ${user.email}`;
            userList.appendChild(li);
        });
    }
    displayUsers();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const user = { name, email, password };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://example.com/api/register", true); 
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("User registered successfully!");
            }
        };
        xhr.send(JSON.stringify(user));
        displayUsers();
        form.reset();
    });
});