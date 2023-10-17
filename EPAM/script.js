let item = {
	name: "Onton",
	age: 32,
}

console.log(item);
localStorage.setItem(1,JSON.stringify(item));
let returnItem = JSON.parse(localStorage.getItem(1));
console.log(returnItem.age);

