import { populateMembers } from "./member.js";
import { fetchAndDrawTable, handleCreateItem, handleDelete, handleFilterItem } from "./table.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDrawTable();

  populateMembers();

  /** @type {HTMLButtonElement} */
  const addButton = document.getElementById("add-newrow");
  addButton.addEventListener("click", () => {
    handleCreateItem();
  });

  // const deleteButton = document.getElementById("delete-row-button");
  // deleteButton.addEventListener("click", () =>{
  //   handleDelete();
  // });

  /** @type {HTMLButtonElement} */
  const filterButton = document.getElementById("filter-button");
  filterButton.addEventListener("click", () => {
    handleFilterItem();
  });
});
