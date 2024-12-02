import { createItem, deleteItem, filterItem, getItems } from "./api.js";

/** @typedef {import("./config.js").Item} Item */
/** @typedef {import("./config.js").ItemPayload} ItemPayload */

/**
 * @param {Item[]} items
 */
function drawTable(items) {
  /** @type {HTMLTableSectionElement} */
  const table = document.getElementById("main-table-body");

  // Clear all elements
  table.innerHTML = "";

  if (items.length === 0) {
    const row = table.insertRow();
    row.insertCell().colSpan = 4;
    row.innerText = "No items found.";
    return;
  }

  for (const item of items) {
    const row = table.insertRow();
    row.insertCell().innerText = item.item;
    row.insertCell().innerText = item.name;
    row.insertCell().innerText = item.price;

    const button = document.createElement("button");
    button.addEventListener("click", () => {
      handleDelete(item._id);
    });
    button.innerText = "ลบ";

    row.insertCell().appendChild(button);
  }
}

export async function fetchAndDrawTable() {
  const items = await getItems();
  drawTable(items);
}

export async function handleDelete(_id) {
  await deleteItem(_id);
  await fetchAndDrawTable();
}

export async function handleCreateItem() {
  /** @type {HTMLInputElement} */
  const itemToAdd = document.getElementById("item-to-add");

  /** @type {HTMLSelectElement} */
  const nameToAdd = document.getElementById("name-to-add");

  /** @type {HTMLInputElement} */
  const priceToAdd = document.getElementById("price-to-add");

  const payload = {
    item: itemToAdd.value,
    name: nameToAdd.value,
    price: priceToAdd.value,
  };

  await createItem(payload);
  await fetchAndDrawTable();

  itemToAdd.value = "";
  nameToAdd.value = "0";
  priceToAdd.value = "";
}

export async function handleFilterItem() {
  const name = document.getElementById("filter-name").value;
  console.log(`Filtering with name: ${name}`);
  const filteredItems = await filterItem(name);
  console.log(`Filtered items:`, filteredItems);
  drawTable(filteredItems);
}