var submitButtonEl = document.querySelector("#submit");
var usersContainerEl = document.querySelector("#user-data");
var thoughtsContainerEl = document.querySelector("#thought-data");




var submitButtonHandler = function() {
    var URL = "http://localhost:3001/api/users";

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // document.getElementById("id").textContent = data[0].id

            for (var i=0; i<data.length; i++) {
                var usersRowEl = document.createElement("tr");
        
                usersRowEl.innerHTML = `
                
                    <td>${data[i]._id}</td>
                    <td>${data[i].username}</td>
                    <td>${data[i].email}</td>
                    
                `;
                usersContainerEl.appendChild(usersRowEl);
            
            }
        
        })




    var URL = "http://localhost:3001/api/thoughts";

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // document.getElementById("id").textContent = data[0].id

            for (var i=0; i<data.length; i++) {
                var thoughtsRowEl = document.createElement("tr");
        
                thoughtsRowEl.innerHTML = `
                
                    <td>${data[i]._id}</td>
                    <td>${data[i].thoughtText}</td>
                    <td>${data[i].username}</td>
                    
                `;
                thoughtsContainerEl.appendChild(thoughtsRowEl);
            
            }
        
        })


}


submitButtonEl.addEventListener("click", submitButtonHandler);