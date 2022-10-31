const allUpdateForms = document.querySelectorAll('.cartItemManagement');
async function updateOrder(event) {
	event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const newStatus = formData.get('status');
  const orderId = formData.get('orderid');
  const csrfToken = formData.get('_csrf');
	console.log(orderId)
	let res
	try {
    res = await fetch(`/admin/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        newStatus: newStatus,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert(error);
    return;
  }
	console.log(res)
	if (!res.ok) {
    alert('Something went wrong - could not update order status.');
    return;
	}

	const responseData = await res.json();
	console.log(responseData)
  form.parentElement.parentElement.querySelector('.badge').textContent =
    responseData.newStatus.toUpperCase();
}

for (const updateFrom of allUpdateForms) {
  updateFrom.addEventListener('submit', updateOrder);
}