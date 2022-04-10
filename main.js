

let found = [];
let foundIndex = [];
var rendered = [];

let list = document.getElementById('list');
let reg = document.getElementById('reg');
let btn = document.getElementById('btn');
let btn_filt = document.getElementById('btn_filt');

btn.addEventListener('click', function (e) {
    foundAll()
})
btn_filt.addEventListener('click', function (e) {
    foundAll(reg.value.split("?").join("."));
})

var rand = (max, min = 0) => {
    return parseInt(Math.random() * (max - min)) + min;
}
let fact = (x) => {
    if (x < 2)
        return 1;
    return fact(x - 1) * x;
}
let combi = (n, p) => {
    return fact(n) / (fact(n - p));
}
function show(nb, arg) {
    let chooseIndex = [];
    let word = "";

    while (word.length != nb) {
        let r = rand(arg.length);
        while (chooseIndex.includes(r)) {
            r = rand(arg.length);
        }

        let randomLetter = arg[r];
        chooseIndex.push(r)
        word += randomLetter;
    }

    if (!foundIndex.includes(chooseIndex.join())) {
        found.push(word);
        foundIndex.push(chooseIndex.join())
    }

}


function foundAll(rgx = "") {
    document.getElementById('hid').style.display = "flex";
    setTimeout(() => {
        list.innerHTML = ''
        found = [];
        rendered = [];
        foundIndex = [];
        let p = parseInt(document.getElementById("nb").value);
        let args = document.getElementById("text").value;
        if (p < 0 || args.trim().length < p || args.trim().length == 0)
        {
            document.getElementById('hid').style.display = "none";
            return;
        }
        while (found.length < combi(args.length, p)) {

            show(p, args);
        }
        found.sort();
        render(rgx)
        document.getElementById('hid').style.display = "none";
    }, 100)


}
function render(rgx = "") {
    let rg = new RegExp(rgx);
    for (let i = 0; i < found.length; i++) {
        let element = found[i];
        if (rendered.includes(element))
            continue;
        if (rgx.trim().length != 0 && !rg.test(element))
            continue;

        rendered.push(element);
        let li = document.createElement('li');
        li.innerHTML = element;
        list.appendChild(li);
    };
}

// foundAll(5, "MUDOR");
// console.log('====================================');
// console.log(found);
// console.log('====================================');