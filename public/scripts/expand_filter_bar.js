window.addEventListener('load', () => {
	const filterButton = document.querySelector(".filter-bar-button");
	const filterBar = document.querySelector(".filter-bar");
	const catalogSection = document.querySelector(".catalog-section");

	filterButton.addEventListener('click', () => {
		if (filterBar.classList.contains("expand-filter-bar")) {
			filterBar.classList.remove("expand-filter-bar");
			catalogSection.classList.remove("shrink-catalog-section");
		} else {
			filterBar.classList.add("expand-filter-bar");
			catalogSection.classList.add("shrink-catalog-section");
		}
	});
});