const loadBtn = document.querySelector("#load");
const loadBadBtn = document.querySelector("#loadBad");
const app = document.querySelector("#app");
const loadStatus = document.querySelector("#status");
const card = document.querySelector("#card");
const users = [];

class HttpError extends Error {
    constructor(status, message) {
      super(message);
      this.name = 'HttpError';
      this.status = status;
    }
}

app.addEventListener("click", (e) => {
    if(e.target.matches("#load")) {
        loadStatus.textContent = "Загрузка…";
        card.textContent = "";

        fetch("https://jsonplaceholder.typicode.com/users/1")
            .then((res) => {
                if(!res.ok)
                    throw new HttpError(res.status, "Пользователь не найден");
                return res.json();
            })
            .then((user) => {
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
            })
            .catch((err) => {
                if (err instanceof HttpError) {
                    loadStatus.textContent = `Ошибка ${err.status}: ${err.message}`;
                } else {
                    loadStatus.textContent = `Проблема с сетью: ${err.message}`;
                }
            })
            .finally(() => {
                if (loadStatus.textContent === "Загрузка…") {
                    loadStatus.textContent = "";
                } else {
                    setTimeout(() => {
                        loadStatus.textContent = "";
                    }, 3000);
                }
            })
    };

    if(e.target.matches("#loadBad")) {
        loadStatus.textContent = "Загрузка…";
        card.textContent = "";

        fetch("https://jsonplaceholder.typicode.com/users/99999")
            .then((res) => {
                if(!res.ok)
                    throw new HttpError(res.status, "Пользователь не найден");
                return res.json();
            })
            .then((user) => {
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
            })
            .catch((err) => {
                if (err instanceof HttpError) {
                    loadStatus.textContent = `Ошибка ${err.status}: ${err.message}`;
                } else {
                    loadStatus.textContent = `Проблема с сетью: ${err.message}`;
                }
            })
            .finally(() => {
                if (loadStatus.textContent === "Загрузка…") {
                    loadStatus.textContent = "";
                } else {
                    setTimeout(() => {
                        loadStatus.textContent = "";
                    }, 3000);
                }
            })
    };
});