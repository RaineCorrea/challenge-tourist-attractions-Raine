export class Point {
    constructor() {
        this.list = [];
        this.selectors();
        this.events();
    }
    selectors() {
        this.form = document.querySelector(".main__form");

        this.fileInput = document.querySelector(".form__input__file");

        this.titleInput = document.querySelector(".form__title");

        this.textArea = document.querySelector(".form__textarea");

        this.items = document.querySelector(".main__description__cards");
    }

    events() {
        this.form.addEventListener("submit", this.addItemToList.bind(this));
        this.fileInput.addEventListener("change", this.readImage);
    }

    addItemToList(event) {
        event.preventDefault();
        const fileInput = this.fileInput.files[0];
        const itemTitle = this.titleInput.value;
        const itemArea = this.textArea.value;

        if (fileInput && itemTitle && itemArea) {
            let file = new FileReader();
            file.onload = function (e) {
                document.getElementById("preview").src = e.target.result;
                const item = {
                    file: e.target.result,
                    title: itemTitle,
                    area: itemArea,
                };
                this.list.push(item);
                this.renderListItems();
                this.resetInputs();
            }.bind(this);

            file.readAsDataURL(fileInput);
        }
    }

    readImage() {
        if (this.files && this.files[0]) {
            var file = new FileReader();
            file.onload = function (e) {
                document.querySelector(".preview").src = e.target.result;
            };
            file.readAsDataURL(this.files[0]);
        }
    }

    renderListItems(list) {
        let itemsStructure = "";

        this.list.forEach(function (item) {
            itemsStructure = `
            <div class="cards__container container">
                <img class="container__img" src="${item.file}"/>
                <div class="container__description">
                    <h1 class="container__title">${item.title}</h1>
                    <p class="container__subtitle">${item.area}</p>
                </div>
            </div>`;
        });

        this.items.innerHTML += itemsStructure;
    }

    resetInputs() {
        document.querySelector(".preview").src = "";
        this.fileInput.value = "";
        this.titleInput.value = "";
        this.textArea.value = "";
    }
}
