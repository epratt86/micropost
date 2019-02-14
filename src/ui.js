class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.formState = "add";
  }

  // Display posts in UI
  showPosts(posts) {
    // start with a blank output to append to
    let output = "";
    // loop through all posts in api
    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil-alt"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-times"></i>
            </a>
          </div>
        </div>
      `;
    });
    //  assign output to HTML
    this.post.innerHTML = output;
  }

  // Edit Posts
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    // change the state of application
    this.changeFormState("edit");
  }

  // Clear ID hidden value
  clearIdInput() {
    this.idInput.value = "";
  }

  changeFormState(type) {
    if (type === "edit") {
      // Submit Button
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      // Create Cancel Button
      const button = document.createElement("button");
      button.className = "post-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel Edit"));

      // Get parent for adding button into DOM
      const cardForm = document.querySelector(".card-form");
      // Get element to insert before
      const formEnd = document.querySelector(".form-end");
      // insert cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      // Reset back to original state
      this.postSubmit.textContent = "Post It";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";
      // Remove cancel button
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }
      // Clear ID from hidden field
      this.clearIdInput();
      // Clear text fields
      this.clearFields();
    }
  }

  showAlert(message, className) {
    this.clearAlert();

    // create div for alert
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));
    // insert into DOM
    const container = document.querySelector(".postsContainer");
    const posts = document.querySelector("#posts");
    // put newly create div before the posts div
    container.insertBefore(div, posts);
    // Timeout - clear alert after 3 seconds
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }
}

export const ui = new UI();
