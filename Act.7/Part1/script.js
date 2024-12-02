// Add click event listener to the add button
document.querySelector("#add-newrow").addEventListener("click", function(event) {
    alert("The add button was clicked!")
})

const deleteButtonList = document.querySelectorAll(".delete-row")
deleteButtonList.forEach(deleteButton => {
    deleteButton.addEventListener("click", handleClickDelete)
})

function handleClickDelete(event){
    const itemRow = event.target.parentElement.parentElement
    const itemName = itemRow.querySelector("td:nth-child(1)").textContent
    alert("The delete button ("+itemName+") was clicked!");
}

// An example of how to get the value of the input field
// Try executing this function in the console
function testGetInputValue() {
    alert(document.querySelector("#item-to-add").value)
}

// An example of how add a new row to the table
function testAddRow() {
    const table = document.querySelector("#main-table")
    const newRow = document.createElement("tr")
    newRow.className = "item"
    newRow.innerHTML = "<td>ยุปปี้</td><td>นางสาวปุ๊บปิ๊บ มาใหม่</td><td>25</td><td><button class='delete-row'>ลบ</button></td>"
    newRow.querySelector(".delete-row").addEventListener("click", handleClickDelete)
    table.querySelector("tbody").appendChild(newRow)
}

// An example of how to remove a random row from the table
function testDeleteRandomRow(){
    const table = document.querySelector("#main-table")
    const randomRowIndex = Math.floor(Math.random() * table.querySelectorAll(".item").length)
    const randomRow = table.querySelectorAll(".item")[randomRowIndex]
    randomRow.remove()
}

