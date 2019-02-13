import { http } from "./http";
import { ui } from "./ui";

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

// listen for post submission
ui.postSubmit.addEventListener("click", submitPost);

// listen for delete post - grab parent of 'x' icon
ui.post.addEventListener("click", deletePost);

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

  // Create the post
  http
    .post("http://localhost:3000/posts", data)
    .then(data => {
      ui.showAlert("Post added", "alert alert-success");
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));
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
