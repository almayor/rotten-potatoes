// scripts.js

if (document.getElementById('new-comment')) {
  document.getElementById("new-comment").addEventListener("submit", e => {
      
      e.preventDefault();

      let comment = {};
      const inputs = document.getElementsByClassName('form-control');
      for (var i = 0; i < inputs.length; i++) {
        comment[inputs[i].name] = inputs[i].value;
      }

      axios.post(`${window.location.pathname}/comments`, comment)
        .then(function (response) {
          document.getElementById('new-comment').reset();
          document.getElementById('comments').insertAdjacentHTML('afterbegin',
            `
            <div class="card" style="border: none" id="${response.data.comment._id}">  
              <div class="card-body">
                <h4 class="card-title">${response.data.comment.title}</h4>
                <p class="card-text">${response.data.comment.content}</p>
                <p>
                  <button class="btn btn-link delete-comment" data-comment-id="${response.data.comment._id}">Delete</button>
                </p>
              </div>
            </div>
            `
          );
          deleteComment();
        })
        .catch(function (error) {
          console.log(error);
          alert('There was a problem saving your comment. Please try again.')
        });
  });
}

if (document.querySelectorAll('.delete-comment')) {
  deleteComment();
}

function deleteComment() {
  document.querySelectorAll('.delete-comment').forEach((commentElement) => {
    commentElement.addEventListener('click', (e) => {
      console.log("click!")
      let commentId = e.target.getAttribute('data-comment-id')
      console.log(e.target)
      axios.delete(`${window.location.pathname}/comments/${commentId}`)
        .then(response => {
          console.log(response);
          comment = document.getElementById(commentId);
          console.log(comment.parentNode);
          comment.parentNode.removeChild(comment);
         })
        .catch(error => {
          console.log(error)
          alert('There was an error deleting this comment.')
        });
    })
  })
}