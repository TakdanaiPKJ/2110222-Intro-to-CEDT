// Add click event listener to the add button
document.querySelector("#add-newrow").addEventListener("click", testAddRow)

const deleteButtonList = document.querySelectorAll(".delete-row")
deleteButtonList.forEach(deleteButton => {
    deleteButton.addEventListener("click", clickdelrow)
})

function handleClickDelete(event){
    const itemRow = event.target.parentElement.parentElement
    const itemName = itemRow.querySelector("td:nth-child(1)").textContent
    alert("The delete button ("+itemName+") was clicked!");
}

// An example of how to get the value of the input field
// Try executing this function in the console
function testGetInputValue() {
    alert(document.querySelector("#name-to-add").value)
}

// An example of how add a new row to the table
function testAddRow() {
    const table = document.querySelector("#main-table")
    const newRow = document.createElement("tr")
    const itemname = document.querySelector("#item-to-add").value
    const buyer = document.querySelector("#name-to-add").value
    const price = document.querySelector("#price-to-add").value
    if(buyer == "--เลือกชื่อผู้ฝากซื้อ--"){
        alert("Wrong Input");
        return ;
    }
    newRow.className = "item"
    newRow.innerHTML = "<td>"+itemname+"</td><td>"+buyer+"</td><td>"+price+"</td><td><button class='delete-row'>ลบ</button></td>"
    newRow.querySelector(".delete-row").addEventListener("click", clickdelrow)
    table.querySelector("tbody").appendChild(newRow)
}

// An example of how to remove a random row from the table
function testDeleteRandomRow(){
    const table = document.querySelector("#main-table")
    const randomRowIndex = Math.floor(Math.random() * table.querySelectorAll(".item").length)
    const randomRow = table.querySelectorAll(".item")[randomRowIndex]
    randomRow.remove()
}

function clickdelrow(event){
    const table = document.querySelector("#main-tale")
    const rowIndex = event.target.parentElement.parentElement
    rowIndex.remove();
}
