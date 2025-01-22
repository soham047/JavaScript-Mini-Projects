document.addEventListener("DOMContentLoaded",() => {
    const cnt = document.getElementById("container2");
    cnt.classList.add("hidden");

    const itmList = document.getElementById("itm2");
    
    const clr = document.getElementById("clrCart");
    const prc = document.getElementById("priceOutput");
    var tot = 0;
    
    const items_list_js = {
        item1: { name: "Item 1", price: 25 },
        item2: { name: "Item 2", price: 50 },
        item3: { name: "Item 3", price: 75 },
        item4: { name: "Item 4", price: 100 },
        item5: { name: "Item 5", price: 150 }
    };

    it = JSON.parse(localStorage.getItem("items")) || [];
    it.forEach( g =>showItems(g));
    //console.log(typeof(items_list_js));

    
    const btns = document.querySelectorAll("#itm button");
    btns.forEach(i => {
        i.addEventListener("click", () => {
            const Key = `item${i.id.slice(-1)}`;
            if(items_list_js[Key]){
                //console.log(items_list_js[Key]);
                its={
                    name: items_list_js[Key].name,
                    price: items_list_js[Key].price
                }
                it.push(its);
                saveItems(it); 
                location.reload(true);              
            }
        });
        
    })

    function saveItems(Its) {
        
        localStorage.setItem("items", JSON.stringify(Its));
       // console.log(typeof(localStorage));
       // console.log(localStorage);
    }

    function showItems(items) {

        // console.log(items);
        // console.log(typeof(items))
        const K = items.name.slice(-1);
        const tr = document.createElement("tr");
        tr.innerHTML =`
        
            <td>${items.name}</td>
            <td>${items.price}</td>
            <td><button id="RC${K}">Remove from Cart</button></td>
        `;
        itmList.appendChild(tr);
        tot = tot + items.price;
        localStorage.setItem("total", tot);

        let prc1 = localStorage.getItem("total");
        prc.textContent = `Total Price : ${prc1}`;

        cnt.classList.remove("hidden");

    }

    clr.addEventListener("click",()=>{
        it = [];
        localStorage.clear();
        itmList.innerHTML = "";
        cnt.classList.add("hidden");
    });

    itmList.addEventListener("click",(event)=>{
        let id = event.target.id;
        if(id.includes("RC")){
            let newId = id.slice(-1);
            it = it.filter(item => item.name.slice(-1) != newId);
            saveItems(it);
            
            if (it === null){
                cnt.classList.add("hidden");
            }
            location.reload(true);
        }
    });
});