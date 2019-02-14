import { http } from "./http";
import { ui } from "./ui";

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

// listen for post submission
ui.postSubmit.addEventListener("click", submitPost);

// listen for delete post - grab parent of 'x' icon
ui.post.addEventListener("click", deletePost);

// listen for edit state - also need parent element
ui.post.addEventListener("click", enableEditState);

// listen for cancel edit button
document.querySelector(".card-form").addEventListener("click", cancelEdit);

// Get Posts
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}
// Submit Post
function submitPost() {
  // Form Data
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;
  const data = { title, body };
  const id = ui.idInput.value;
  // Stop empty form submissions
  if (title === "" || body === "") {
    ui.showAlert("Please fill in all fields", "alert alert-danger");
  } else {
    // Check for an ID - if no ID, its a new post. If ID exists, you are updating existing post
    if (id === "") {
      // Create the post
      http
        .post("http://localhost:3000/posts", data)
        .then(data => {
          ui.showAlert("Post Added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      // Update the post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert("Post Updated", "alert alert-success");
          ui.changeFormState("add");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}
// Delete the post
function deletePost(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("delete")) {
    // grab data attribute 'id' for post
    const id = e.target.parentElement.dataset.id;
    // user prompt
    if (confirm("Are you sure?")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert("Post Removed", "alert alert-success");
          getPosts();
        })
        .catch(e => console.log(e));
    }
  }
}

// Edit Post
function enableEditState(e) {
  e.preventDefault();

  // make sure user is clicking on edit icon
  if (e.target.classList.contains("fa-pencil-alt")) {
    // get ID of post to edit
    const id = e.target.parentElement.dataset.id;
    // get BODY text
    const body = e.target.parentElement.previousElementSibling.textContent;
    // get TITLE text
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;

    const data = { id, title, body };

    // put data into form for editing
    ui.fillForm(data);
  }
}

// Cancel Edit State
function cancelEdit(e) {
  e.preventDefault();
  // if user is clicking on a an element that contains the class 'post-cancel'
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
}
