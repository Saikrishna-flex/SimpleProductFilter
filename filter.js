const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://rukminim2.flixcart.com/image/612/612/k23m4cw0/watch/x/n/5/d127-casio-original-imafhgyepp3h6yzx.jpeg?q=70",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 90,
    cat: "Casual",
  },
  {
    id: 6,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 50,
    cat: "Dress",
  },
  {
    id: 7,
    name: "ALL BLACK SERIES Analog Watch",
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/s/u/m/-original-imagpzzhgttmgwts.jpeg?q=70",
    price: 100,
    cat: "Sport",
  },
  {
    id: 8,
    name: "Boys Analog Watch-BLACK-BLACK-SC",
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/n/c/2/1-anlg-492-black-black-sc-analogue-men-original-imah2gh72h6tqpqx.jpeg?q=70",
    price: 160,
    cat: "Luxury",
  },
  {
    id: 9,
    name: "Bleed Blue Day and Date Functioning Strap",
    img: "https://rukminim2.flixcart.com/image/612/612/jwzabgw0/watch/c/h/g/ls2821-limestone-original-imafhjcr3xkxgqaz.jpeg?q=70",
    price: 200,
    cat: "Casual",
  },
  {
    id: 10,
    name: "Analog Watch - For Women TWEL107SMU05",
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/c/d/1/-original-imah3ve8dnqfh4rr.jpeg?q=70",
    price: 20,
    cat: "Casual",
  },
];

const productsContainer = document.querySelector(".productsContainer");
const searchInput = document.querySelector(".searchInput");
const categoriesContainer = document.querySelector(".categoriesContainer");
const rangeInput = document.querySelector(".rangeInput");
const rangePrice = document.querySelector(".rangePrice");
const resetBtn = document.querySelector(".resetBtn");

const showProducts = (data) => {
  productsContainer.innerHTML = data
    .map((product) => {
      return `<div class="product">
                    <img src=${product.img} alt=${product.name}>
                    <div class="productInfo">
                        <span class="productName">${product.name}</span>
                        <span class="productPrice">$${product.price}</span>
                    </div>
                </div>
            `;
    })
    .join("");
};

showProducts(data);

searchInput.addEventListener("input", (e) => {
  const userInput = e.target.value.toLowerCase();

  showProducts(
    data.filter((product) => product.name.toLowerCase().includes(userInput))
  );
});

const showCategories = () => {
  const allCategories = data.map((products) => products.cat);
  const uniqueCategories = [
    "All",
    ...allCategories.filter(
      (products, index) => allCategories.indexOf(products) === index
    ),
  ];

  const categoriesHTML = uniqueCategories
    .map((cat) => {
      return `
            <span class="cat" tabIndex="0">${cat}</span>
        `;
    })
    .join("");

  categoriesContainer.innerHTML = `<h1 class="catHeading">Categories</h1> ${categoriesHTML}`;
};

categoriesContainer.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("cat")) {
    document
      .querySelectorAll(".cat")
      .forEach((cat) => cat.classList.remove("active"));
    target.classList.add("active");
    const cat = target.textContent.toLowerCase();
    cat === "all"
      ? showProducts(data)
      : showProducts(
          data.filter((products) => products.cat.toLowerCase() === cat)
        );
  }
});

showCategories();

const showRangeProducts = () => {
  const prices = data.map((products) => products.price);
  const max_value = Math.max(...prices);
  const min_value = Math.min(...prices);
  rangeInput.setAttribute("max", max_value);
  rangeInput.setAttribute("min", min_value);
  rangePrice.textContent = `$${max_value}`;
  rangeInput.value = max_value;
};

rangeInput.addEventListener("input", (e) => {
  const userRange = e.target.value;
  rangePrice.textContent = `$${userRange}`;
  showProducts(data.filter((products) => products.price <= userRange));
});

showRangeProducts();

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  rangeInput.value = rangeInput.max;
  rangePrice.textContent = `${rangeInput.max}`;
  document
    .querySelectorAll(".cat")
    .forEach((cat) => cat.classList.remove("active"));
  showProducts(data);
});
