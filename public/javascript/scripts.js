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
            <hr>
            <div class="card" style="border: none">
              <div class="card-body">
                <h4 class="card-title">${response.data.comment.title}</h4>
                <p class="card-text">${response.data.comment.content}</p>
                <p>
                  <form method="POST" align="right" action="/reviews/${response.data.comment.reviewId}/comments/${response.data.comment._id}?_method=DELETE">
                    <button class="btn btn-link" type="submit">Delete</button>
                  </form>
                </p>
              </div>
            </div>`
        )})
        .catch(function (error) {
          console.log(error);
          alert('There was a problem saving your comment. Please try again.')
        });
  });
}