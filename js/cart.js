
const cart = () => {
    const btnCart = document.getElementById("cart-button");
    const modalCart = document.querySelector('.modal-cart');
    const close = document.querySelector('.close');
    const modalBody = document.querySelector('.modal-body');
    const btnSend = modalCart.querySelector('.button-primary');
    const modalPriceTag = modalCart.querySelector('.modal-pricetag');
    const clearCart = modalCart.querySelector('.clear-cart');
    console.log(clearCart);
    const resetCart = () => {
        modalBody.innerHTML = '';
        localStorage.removeItem("cart");
        modalCart.classList.remove("is-open");
        modalPriceTag.textContent = `0 ₽`;
    }
    const increment = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'));
        cartArray.filter(item => item.id === id).
            map(item => {
                item.count++;
                return item;
            })
        localStorage.setItem('cart', JSON.stringify(cartArray));
        renderItems(cartArray);
    }

    const decrement = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'));
        cartArray.filter(item => item.id === id).
            map(item => {
                item.count > 0
                    ? item.count-- : item.count = 0;
                return item;
            })
        localStorage.setItem('cart', JSON.stringify(cartArray));
        renderItems(cartArray);
    }

    btnCart.addEventListener("click", () => {
        modalCart.classList.add("is-open");
    })
    clearCart.addEventListener("click", () => { modalCart.classList.remove("is-open"); });
    close.addEventListener("click", () => {
        modalCart.classList.remove("is-open");
    })
    btnCart.addEventListener('click', () => {

        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')));
        }
        modalCart.classList.add("is-open");
    })

    const renderItems = (data) => {
        modalBody.innerHTML = '';
        let priceTag = 0;
        data.forEach(({ name, price, id, count }) => {
            if (count !== 0) {
                const foodRow = document.createElement("div");
                foodRow.classList.add("food-row");
                foodRow.innerHTML =
                    `
                            <span class="food-name">${name}</span>
                            <strong class="food-price">${price} ₽</strong>
                            <div class="food-counter">
                                <button class="counter-button btn-dec" data-index = ${id}>-</button>
                                <span class="counter">${count}</span>
                                <button class="counter-button btn-inc" data-index = ${id}>+</button>
                            </div>
            `;
                modalBody.append(foodRow);
                priceTag += (price * count);
            }

        })
        modalPriceTag.textContent = `${priceTag} ₽`;
    }

    modalBody.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("btn-inc")) {
            increment(e.target.dataset.index);
        } else if (e.target.classList.contains("btn-dec")) {
            decrement(e.target.dataset.index);
        }
    })


    btnSend.addEventListener("click", () => {
        const cartArray = localStorage.getItem("cart");
        if (cartArray) {
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: 'POST',
                body: cartArray,
            })
                .then(response => {
                    if (response.ok) {
                        resetCart();
                    }
                })
                .catch(e => console.error(e))
        }
    })

}

cart();
//{
//     
//     const modalCart = document.querySelector('.modal-cart');
//     

//   






//     const cartContent = JSON.parse(localStorage.getItem('cart'));
//     renderItems(cartContent);

//    






// }

// cart();