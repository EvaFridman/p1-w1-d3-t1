const loadBtn = document.querySelector("#load");
const loadBadBtn = document.querySelector("#loadBad");
const app = document.querySelector("#app");
const loadStatus = document.querySelector("#status");
const card = document.querySelector("#card");
const users = [];

app.addEventListener("click", (e) => {
    if(e.target.matches("#load")) {
        loadStatus.textContent = "Загрузка…";
        fetch("https://jsonplaceholder.typicode.com/users/1")
            .then((res) => res.json())
            .then((user) => {
                console.log(user);
                loadStatus.textContent = "";

                function renderCard(obj, container) {
                    Object.entries(obj).forEach(([key, value]) => {
                        if (typeof value === 'object' && value !== null) {
                            const subContainer = document.createElement("div");
                            subContainer.style.paddingLeft = "20px";
                            container.append(subContainer);
                            renderCard(value, subContainer);
                        } else {
                            const p = document.createElement("p");
                            p.textContent = `${key}: ${value}`;
                            container.append(p);
                        };
                    });
                }
                renderCard(user, card);
            });
    };
});