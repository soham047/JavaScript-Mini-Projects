document.addEventListener("DOMContentLoaded",()=>{
    const btn = document.getElementById("btnSub");
    const lst = document.getElementById("expenseList");
    const expCnt = document.getElementById("expenseCnt");
    const prc = document.getElementById("prcInput");
    const expType = document.getElementById("expType");
    const clrBtn = document.getElementById("btnClr");

    e = JSON.parse(localStorage.getItem("expenses")) || [];

    btn.addEventListener("click", (event)=>{
        event.preventDefault();
        let exps = {
            id: e.length,
            price: prc.value,
            type: expType.value
        }
        e.push(exps);
        saveExps(e);
        showExps();
    });

    function saveExps(exp){
        localStorage.setItem("expenses", JSON.stringify(exp));

    }

    function showExps(){
        lst.innerHTML = ``;
        var s=0;
        
        console.log(e);
        e.forEach(i => {
            li = document.createElement("li");
            li.innerHTML = `
            <span>${i.type}</span> : <span>${i.price}</span>`;
            s += parseInt(i.price);
            lst.appendChild(li);
        });
        li2 = document.createElement("li");
        li2.innerHTML = `
        <span>Total</span> : <span>${s}</span>`;
        lst.appendChild(li2);

        expCnt.classList.remove("hidden");
    
    };

    clrBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        localStorage.clear();
        e = [];
        lst.innerHTML = ``;
        expCnt.classList.add("hidden");
    });

});