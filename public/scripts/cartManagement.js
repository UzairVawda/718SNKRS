const addToCartBtn = document.querySelector("#productDetails button");
const cartBadges = document.querySelectorAll("#navitems .badge");

async function addToCart() {
  const productId = addToCartBtn.dataset.productid;
  const csrfToken = addToCartBtn.dataset.csrf;

  let res;
  try {
    res = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
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
    alert("failed res");
    return;
  }

  const data = await res.json();
  const newTotal = data.totalItems;

  for (const badge of cartBadges) {
    badge.textContent = newTotal;
  }
}

addToCartBtn.addEventListener("click", addToCart);
