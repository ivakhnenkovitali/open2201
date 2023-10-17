//1 - Shopping list, 2 - Done, 3 - Deleted
addItem.addEventListener("click",addNewItem);
update.addEventListener("click",updateItem);
let maxKey = 0;
let str = "";
let actionKey = 0;

let buttons = menu.getElementsByTagName("button");
buttons[0].onclick = () => draw(1);
buttons[1].onclick = () => draw(2);
buttons[2].onclick = () => draw(3);

function changeStatus(status, key) {
	let item = JSON.parse(localStorage.getItem(key));
	let newItem = {
		name: item.name,
		quant: item.quant,
		price: item.price,
		status: status,
	}
	localStorage.setItem(key,JSON.stringify(newItem));
	draw();
}

function updateItem(){
	let item = {
		name: nameItem.value,
		quant: quant.value,
		price: price.value,
		status: 1,
	}
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

draw();
function draw(status){
	if (status===undefined) status = 1;
	textStatus(status);
	str = "";
	for(let i=0; i<localStorage.length; i++){
		let key = +localStorage.key(i);
		let item = JSON.parse(localStorage.getItem(key));
		let statusItem = +item.status;
		if (statusItem===status) {
		let buttons = buttonStatus(status, key);
		str +=`
		<tr>
			<td>${key}</td>
			<td>${item.name}</td>
			<td>${item.quant}</td>
			<td>${item.price}</td>
			<td>${buttons}</td>
		</tr>
		`;
		}
	}
	table.innerHTML = str;
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

function addNewItem() {
	let item = {
		name: nameItem.value,
		quant: quant.value,
		price: price.value,
		status: 1,
	}
	getMaxKey();
	localStorage.setItem(maxKey,JSON.stringify(item));
	draw();
	clearInputs();
}

function getMaxKey(){
	for(let i=0; i<localStorage.length; i++){
		let key = +localStorage.key(i);
		if (maxKey<key) {
			maxKey = key;
		}
	}
	maxKey++;
}

