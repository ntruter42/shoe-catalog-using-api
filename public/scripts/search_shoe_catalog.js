window.addEventListener('load', () => {
	const search = document.querySelector("#search");

	search.addEventListener("input", () => {
		const shoes = document.querySelectorAll(".shoe-card");
		shoes.forEach(shoe => {
			if (shoe.id.toLowerCase().includes(search.value.toLowerCase())) {
				shoe.classList.remove("hidden");
			} else {
				shoe.classList.add("hidden");
			}
		});
	});
});