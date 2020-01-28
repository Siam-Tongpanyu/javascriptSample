const list = new Array(60000).join("1.1").split(".");
var lsd = new Array(60000).join("1.1").split(".");
//console.log(list);
//let ct = 0;

/*function removeItemsFromList(list2) {
  let item = list2.pop();
  if (item) {
    setTimeout(removeItemsFromList(list2), 0);
  } else {
    return list2;
  }
}*/

//list3 = removeItemsFromList(list);
function trampoline(func) {
  let value = func();
  while (typeof value === "function") {
    value = value();
  }
  return value;
}
function removeItemsFromList() {
  var item = list.pop();
  if (item) {
    console.log(list.length);
    setTimeout(removeItemsFromList, 0);
  } else {
    console.log(list);
  }
}

function removeItemsFromList2() {
  let item = list.pop();
  if (item) {
    console.log(list.length);
    return () => removeItemsFromList2();
  } else {
    console.log(list);
  }
}

var removeItemsFromList3 = function() {
  var item = list.pop();
  if (item) {
    console.log(list.length);
    return () => removeItemsFromList3();
  } else {
    console.log(list);
  }
};

function removeItemsFromList4(lsd1) {
  let item = lsd1.pop();
  if (item) {
    console.log(lsd1.length);
    return () => removeItemsFromList4(lsd1);
  } else {
    console.log(lsd1);
  }
}

function trampoline2(func, args) {
  while (typeof func === "function") {
    func = func(args);
  }
  return func;
}
//removeItemsFromList2();
//trampoline(removeItemsFromList2);
trampoline2(removeItemsFromList4, lsd);
