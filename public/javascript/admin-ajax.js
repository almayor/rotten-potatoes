$(document).ready(function() {
	$("#confirm-delete").click(function() {
		$(".select-review:checked").closest("tr").each(function() {
			console.log(this);
			const reviewId = this["id"];
			$.ajax({
				type: "POST",
				url: `/reviews/${reviewId}?_method=DELETE`,
				success: function() {
					$(`#${reviewId}`).remove();
				},
				error: console.error
			});
		});
	});
});