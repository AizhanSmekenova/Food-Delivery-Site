const menu = () => {
	const restaurant = JSON.parse(localStorage.getItem("restaurant"));
	const cartArray = localStorage.getItem('cart') ?
		JSON.parse(localStorage.getItem('cart')) : [];
	document.querySelector('.restaurant-title').textContent = restaurant.name;
	document.querySelector('.rating').textContent = restaurant.stars;
	document.querySelector('.price').textContent = restaurant.price;
	document.querySelector('.category').textContent = restaurant.kitchen;

	const cardMenu = document.querySelector('.cards-menu');

	const addToCart = (cartItem) => {
		if (cartArray.some(item => item.id === cartItem.id)) {
			cartArray.map(item => {
				if (item.id === cartItem.id)
					item.count++;
				return item;
			})
		} else { cartArray.push(cartItem); }

		localStorage.setItem("cart", JSON.stringify(cartArray));

	}
	const renderItems = (data) => {
		data.forEach(item => {
			const card = document.createElement('div');
			//console.log(item);
			card.classList.add("card");
			card.innerHTML = `
        <img src=${item.image} alt="image" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${item.name}</h3>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="ingredients">${item.description}</div>
							</div>
							<!-- /.card-info -->
							<div class="card-buttons">
								<button class="button button-primary button-add-cart data-index = ${item.id}">
									<span class="button-card-text" >В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${item.price} ₽</strong>
							</div>
						</div>
        `;
			cardMenu.append(card);
			card.querySelector(".button-card-text").addEventListener("click",
				() => {
					const cartItem =
					{
						name: item.name,
						price: item.price,
						id: item.id,
						count: 1
					}
					addToCart(cartItem);
				})


		}
		)
	}

	fetch(`./db/${restaurant.products}`)
		.then(response => response.json())
		.then(data => renderItems(data))
		.catch(error => console.log(error))

	if (!localStorage.getItem("restaurant")) {
		window.location.href = "/";
	}
}

menu();