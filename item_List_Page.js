const price_value = document.querySelector("input[type=range]");
const price_search = document.querySelector("#price_value");

price_value.oninput = function() {
    if(this.value < 10000){
        price_search.innerHTML = this.value.slice(0, 1) + "," + this.value.slice(-3);
    } else{
        price_search.innerHTML = this.value.slice(0, 2) + "," + this.value.slice(-3);
    }
}