const allDeleteButtons = document.querySelectorAll(".productItemActions button")

async function deleteProduct(event) {
	const buttonElement = event.target;
	const productId = buttonElement.dataset.productid
	const csrfToken = buttonElement.dataset.csrf
	const res = await fetch('/admin/products/delete/' + productId + '?_csrf=' + csrfToken, {
		method: 'DELETE'
	});

	if(!res.ok) {
		alert('FAILED TO DELTE');
		return
	}

	buttonElement.parentElement.parentElement.parentElement.remove()
}

for (const deleteButton of allDeleteButtons) {
	deleteButton.addEventListener('click', deleteProduct)
}