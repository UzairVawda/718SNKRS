const updateItemQuantityBtns = document.querySelectorAll(".cartItemManagement");
const cartBadge = document.querySelector("#navitems .badge");
const cartTotal = document.getElementById("cartTotal");

async function updateCartItemQuantity(event) {
  event.preventDefault();
  const form = event.target;
  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;
	
	let res;
  try {
    res = await fetch("/cart/items/update", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        updatedQuantity: quantity,
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

  if (!res.ok) {
    alert("check res");
    return;
  }

  const resData = await res.json();
	if (resData.updatedCartDate.newTotalQuantity === 0) {
		form.parentElement,parentElement.remove();
	} else {
		console.log(resData.updatedCartDate)
		const totalProductPrice = form.parentElement.querySelector(
			".totalPriceForProduct"
		);
		console.log(totalProductPrice.textContent)
		console.log(resData.updatedCartDate.updatedItemPrice)
		cartBadge.textContent = resData.updatedCartDate.newTotalQuantity
		totalProductPrice.textContent = resData.updatedCartDate.updatedItemPrice.toFixed(2);
		cartTotal.textContent = resData.updatedCartDate.newTotalPrice.toFixed(2);
	}
}

for (const updateBtn of updateItemQuantityBtns) {
  updateBtn.addEventListener("submit", updateCartItemQuantity);
}

