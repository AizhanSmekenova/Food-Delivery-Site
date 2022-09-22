//const dataBase = "https://test-f1033-default-rtdb.firebaseio.com/db/partners.json";
const cardRestaurants = document.querySelector('.cards-restaurants');
const modalAuth = document.querySelector('.modal-auth');
const inputSearch = document.querySelector('.input-search');
const renderItems = (data) => {

    data.forEach(item => {
        const cardRest = document.createElement('a');
        cardRest.setAttribute('href', 'restaurant.html')
        cardRest.classList.add("card");
        cardRest.classList.add("card-restaurant");

        cardRest.innerHTML = `<img src=${item.image} alt="image" class="card-image" />
                                <div class="card-text">
                                    <div class="card-heading">
                                        <h3 class="card-title">${item.name}</h3>
                                        <span class="card-tag tag">${item.time_of_delivery} мин</span>
                                    </div>
                                    <div class="card-info">
                                        <div class="rating">
                                            ${item.stars}
                                        </div>
                                        <div class="price">О ${item.price} ₽</div>
                                        <div class="category">${item.kitchen}</div>
                                    </div>
                                </div> `;

        //console.log(item);
        cardRestaurants.append(cardRest);
        cardRest.addEventListener("click", (e) => {
            e.preventDefault();
            if (localStorage.getItem("user")) {
                localStorage.setItem("restaurant", JSON.stringify(item));
                window.location.href = "restaurant.html";
            } else {
                modalAuth.style.display = "flex";
                localStorage.removeItem("restaurant");
            }
        })



    });
}



fetch('https://test-f1033-default-rtdb.firebaseio.com/db/partners.json')
    .then(response => response.json())
    .then(data => renderItems(data))
    .catch(error => console.log(error));



inputSearch.addEventListener("input", (e) => {
    const value = e.target.value;
    fetch('https://test-f1033-default-rtdb.firebaseio.com/db/partners.json')
        .then(response => response.json())
        .then(
            data => {
                data.filter(item =>
                    item.name.toLowerCase().includes(value.toLowerCase())
                )
            }
            //     data => {
            //     data.filter(item => {
            //         item.name.toLowerCase().includes(value.toLowerCase())
            //     });
            //     renderItems(data);

            // }
        )
        .then(data => renderItems(data))
        .catch(error => console.log(error))

}); 