document.querySelector("#total_form").addEventListener("submit", function (e) {
  e.preventDefault();
  const desc = document.querySelector(".description").value;
  const amount = document.querySelector(".amount").value;

  if (desc && amount.length > 0) {
    addItems(desc, amount);
    resetForm();
  }
});

function addItems(desc, amount) {
  const time = getTiming();
  const items = `
    <div class="item flex justify-between  border p-2 text-2xl rounded-lg  ">
                <div class="item-description">
                  <div class="item-title">
                    <p>${desc}</p>
                  </div>
                  <div class="item-time">
                    <p>${time}</p>
                  </div>
                </div>
                <div class="item-amount">
                <p class="flex items-center space-x-3"><span>${amount}</span><span><i class="fa-solid fa-indian-rupee-sign"></i></span></p>
                </div>
                
              </div>
    `;

  const collection = document.querySelector(".collection");
  collection.insertAdjacentHTML("afterbegin", items);

  addItemLocalStorage(desc, amount, time);
  totalAmount();
}

function resetForm() {
  const desc = (document.querySelector(".description").value = "");
  const amount = (document.querySelector(".amount").value = "");
}

function getTiming() {
  const Timing = new Date().toLocaleDateString("en-us", {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
  });

  const date = Timing.split(",")[0].split(" ");
  const Time = Timing.split(",")[1];
  return `${date[1]} ${date[0]}, ${Time}`;
}

function getItemsLS() {
  let items = localStorage.getItem("items");
  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }
  return items;
}

showItems();
function showItems() {
  let items = getItemsLS();
  const collection = document.querySelector(".collection");

  for (let item of items) {
    const items = `
    <div class="item flex justify-between  border p-2 text-2xl rounded-lg">
                <div class="item-description">
                  <div class="item-title">
                    <p>${item.desc}</p>
                  </div>
                  <div class="item-time">
                    <p>${item.time}</p>
                  </div>
                </div>
                <div class="item-amount">
                <p class="flex items-center space-x-3"><span>${item.amount}</span><span><i class="fa-solid fa-indian-rupee-sign"></i></span></p>
                </div>
                
              </div>
    `;
    collection.innerText = ``;
    collection.insertAdjacentHTML("afterbegin", items);
  }
  totalAmount();
}

function addItemLocalStorage(desc, amount, time) {
  let items = getItemsLS();
  items.push({
    desc,
    amount,
    time,
  });
  localStorage.setItem("items", JSON.stringify(items));
}

function totalAmount() {
  let items = getItemsLS();

  let amount = 0;

  for (let item of items) {
    amount += parseInt(item.amount);
    console.log(amount);
  }
  document.querySelector(".amount_total").innerText = `${amount}`;
}

document.querySelector(".clear_btn").addEventListener("click", (e) => {
  localStorage.clear();
  totalAmount();
  let items = (document.querySelector(
    ".collection"
  ).innerHTML = `<h1 class="visible text-center"> 😁😁😁 </h1>`);
});
