$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip(); // enable tooltips
	$("#confirm-delete").click(function() {
		$(".select-review:checked").closest("tr").each(function() {
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