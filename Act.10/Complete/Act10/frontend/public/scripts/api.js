import { BACKEND_URL, MEMBERS } from "./config.js";

export async function getItems() {
  const items = await fetch(`${BACKEND_URL}/items`).then((r) => r.json());

  return items;
}

export async function createItem(item) {
  await fetch(`${BACKEND_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

export async function deleteItem(id) {
  await fetch(`${BACKEND_URL}/items/${id}`, {
    method: "DELETE",
  });
}

export async function filterItems(filterName, lowerPrice, upperPrice) {
  const obj = { name: filterName, lowerPrice: lowerPrice, upperPrice: upperPrice };
  const items = await fetch(`${BACKEND_URL}/items/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then(res => res.json());
  console.log(obj, items);
  return items;
}

export async function getMembers() {
  // TODO 4: Modify getMembers function
  
  return MEMBERS;
}

export async function createMember(member) {
  // TODO 4: Implement createMember function


}

export async function deleteMember(id) {
  // TODO 4: Implement deleteMember function


}