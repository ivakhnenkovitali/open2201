//1 - Shopping list, 2 - Done, 3 - Deleted
addItem.addEventListener("click",addNewItem);
update.addEventListener("click",updateItem);
let actionKey = 0;
let buttons = menu.getElementsByTagName("button");
buttons[0].onclick = () => draw(1);
buttons[1].onclick = () => draw(2);
buttons[2].onclick = () => draw(3);

draw();

function checkInput(){
	let error = 0;
	if (nameItem.value === ""){ 
		error++;
		nameItem.classList.add("error");
	}else{
		nameItem.classList.remove("error");
	}
	if (quant.value === ""){ 
		error++;
		quant.classList.add("error");
	}else{
		quant.classList.remove("error");
	}
	if (price.value === ""){ 
		error++;
		price.classList.add("error");
	}else{
		price.classList.remove("error");
	}
	if (error !== 0 ) return true;
}

function addNewItem() {
	if (checkInput()) return;
	let item = createObject(nameItem.value,quant.value,price.value,1);
	localStorage.setItem(getMaxKey(),JSON.stringify(item));
	draw();
	clearInputs();
}

function getMaxKey(){
	let maxKey = 0;
	for(let i=0; i<localStorage.length; i++){
		let key = +localStorage.key(i);
		if (maxKey<key) {
			maxKey = key;
		}
	}
	maxKey++;
	return maxKey;
}

function changeButton(status){
	textStatus(status);
	for(let i = 0; i<buttons.length; i++){
		buttons[i].className = "menu_button";
	}
	buttons[status-1].classList.add("focus");
}

function createObject(name,quant,price,status) {
	let item = {
		name: name,
		quant: quant,
		price: price,
		status: status,
	}
	return item;
}

function changeStatus(status, key) {
	let item = JSON.parse(localStorage.getItem(key));
	let newItem = createObject(item.name,item.quant,item.price,status);
	localStorage.setItem(key,JSON.stringify(newItem));
	draw();
}

function updateItem(){
	if (checkInput()) return;
	let item = createObject(nameItem.value,quant.value,price.value,1);
	localStorage.setItem(actionKey,JSON.stringify(item));
	draw();
	clearInputs();
	update.hidden = true;
}

function clearInputs(){
	nameItem.value = "";
    quant.value = "";
    price.value = "";
}

function textStatus(status){
	switch (status) {
		case 1:
    		text.innerHTML = "Shopping list";
	    break;
	    case 2:
    		text.innerHTML = "Done";
	    break;
	    case 3:
    		text.innerHTML = "Deleted";
	    break;
	}
}

function draw(status){
	if (status===undefined) status = 1;
	table.innerHTML = "";
	changeButton(status);
	let summa = 0;
	for(let i=0; i<localStorage.length; i++){
		let key = +localStorage.key(i);
		let item = JSON.parse(localStorage.getItem(key));
		if (+item.status===status) {
			summa += item.price * item.quant;
			let buttons = buttonStatus(status, key);
			let arr = [key,item.name,item.quant,item.price,buttons];
			table.append(drawTr(arr));
		}
	}
	table.append(drawTotal(summa));
}

function drawTr(arr) {
	let tr = document.createElement("tr");
	for(let i = 0; i<arr.length; i++){
		let td = document.createElement("td");
		td.innerHTML = arr[i];
		tr.append(td);
	}
	return tr;
}

function drawTotal(summa) {
	let tr = document.createElement("tr");
	tr.className = "total";
	tr.innerHTML = `
		<td colspan="4">Total:</td>
		<td>${summa}</td>`;
	return tr;
}

function buttonStatus(status, key) {
	let str = "";
	switch (status) {
		case 1:
    		str = `<button class="a_button green" key="${key}" action="done">V</button>
				<button class="a_button yellow" key="${key}" action="edit">/</button>
				<button class="a_button red" key="${key}" action="delete">X</button>`;
	    break;
	    case 2:
    		str = `<button class="a_button green" key="${key}" action="shop">V</button>
				<button class="a_button red" key="${key}" action="delete">X</button>`;
	    break;
	    case 3:
    		str = `<button class="a_button green" key="${key}" action="done">V</button>
				<button class="a_button red" key="${key}" action="finalDelete">X</button>`;
	    break;
	}
	return str;
}

table.onclick = function(event) {
	let target = event.target;
	if (target.tagName !== "BUTTON") return;
	if (!target.hasAttribute("key")) return;
	let key = +target.getAttribute("key");
	let action = target.getAttribute("action");
	
	switch (action) {
		case "shop":
    		changeStatus(1, key);
	    break;
		case "done":
    		changeStatus(2, key);
	    break;
	    case "delete":
    		changeStatus(3, key);
	    break;
	    case "finalDelete":
    		localStorage.removeItem(key);
    		draw();
	    break;
	    case "edit":
    		update.hidden = false;
    		let item = JSON.parse(localStorage.getItem(key));
    		nameItem.value = item.name;
    		quant.value = item.quant;
    		price.value = item.price;
    		actionKey = key;
    		let trs = table.getElementsByTagName("tr");
    		for(let i=0; i<trs.length; i++){
    			trs[i].removeAttribute("style");
    		}
    		target.closest("tr").style.background = "#ededed";
	    break;
	}
}