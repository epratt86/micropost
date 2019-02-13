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
