$(document).ready(function () {
  refreshEventListeners();
})

function refreshEventListeners() {
  $("#new-comment").find(":button").click(createComment);
  $(".delete-comment").click(deleteComment)
}

function createComment () {
  let comment = {};
  $(this).siblings().find(":input, [name]").each(function () {
    comment[$(this).attr("name")] = $(this).val();
    $(this).val('')
  })
  comment["reviewId"] = $(this).parent().attr("reviewId");
  $.ajax({
    type: "POST",
    url: `${window.location.pathname}/comments`,
    data: JSON.stringify(comment),
    contentType: "application/json",
    success: function (result) {
      showComment(result["comment"]);
    },
    error: function (error) {
      alert('There was a problem saving your comment. Please try again.')
      console.error(error);
    }
  })
}

function showComment (comment) {
  $("[name='comments']").prepend(
    `
    <div class="card" style="border: none" comment-id="${comment._id}">  
      <div class="card-body">
        <h4 class="card-title">${comment["title"]}</h4>
        <p class="card-text">${comment.content}</p>
        <!-- Delete link -->
        <button class="btn btn-link float-right delete-comment" data-comment-id="${comment._id}">Delete</button>
      </div>
    </div>
    `
  );
  refreshEventListeners();
}

function deleteComment () {
  const comment = $(this).parent().parent();
  $.ajax({
    type: "POST",
    url: `${window.location.pathname}/comments/${comment.attr("comment-id")}?_method=DELETE`,
    success: function () {
      comment.remove()
    },
    error: console.error
  })
}
