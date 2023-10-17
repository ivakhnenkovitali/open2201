addItem.addEventListener("click",addNewItem);
let maxKey = 0;
let str = "";

draw();
function draw(){
	str = "";
	for(let i=0; i<localStorage.length; i++){
		let key = +localStorage.key(i);
		let item = JSON.parse(localStorage.getItem(key));
		str +=`
		<tr>
			<td>${key}</td>
			<td>${item.name}</td>
			<td>${item.quant}</td>
			<td>${item.price}</td>
			<td>
				<button class="a_button green">V</button>
				<button class="a_button yellow">/</button>
				<button class="a_button red">X</button>
			</td>
		</tr>
		`;
	}
	table.innerHTML = str;
}

function addNewItem() {
	let item = {
		name: nameItem.value,
		quant: quant.value,
		price: price.value,
	}
	getMaxKey();
	localStorage.setItem(maxKey,JSON.stringify(item));
	draw();
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

