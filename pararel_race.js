let promisify = (item, delay)=>
  new Promise((resolve)=>
    setTimeout(()=>resolve(item),delay));

let promisify2 = (item, delay)=>{
  return new Promise((resolve)=>{
    setTimeout(resolve,delay,item);
  });
}
const a = ()=>promisify('a',1000);
const b = ()=>promisify('b',500);
const c = ()=>promisify('c',3000);
const d = ()=>promisify2('d',100);
//console.log(d());

async function pararel(){
  const promise = [a(),b(),c(),d()];
  const [out1,out2,out3,out4] = await Promise.all(promise);
  return 'pararel is done : ' + out1 + ' , '+ out2 + ' , ' + out3 + ' , '+ out4;
}

async function race(){
  const promise = [a(),b(),c(),d()];
  const output = await Promise.race(promise);
  return 'race is done : ' + output;
}

async function sequence(){
  const out1 = await a();
  const out2 = await b();
  const out3 = await c();
  const out4 = await d();
  return 'sequence is done : ' + out1 + ' , '+ out2 + ' , ' + out3 + ' , '+ out4;
}

sequence().then(console.log);
pararel().then(console.log);
race().then(console.log);