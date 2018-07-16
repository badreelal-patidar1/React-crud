class TestClass{

    constructor() { };

    sum(a,b) {
        return a+b;
    };
}

var t = new TestClass();
var s = t.sum(2,3);
var f = "sum(4,5)";
var t1 = eval("t." + f);

console.log(s);
console.log(t1);


