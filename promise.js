const fetch = require("node-fetch");

const promise = new Promise((resolve,reject)=>{
  if(true){
    resolve('OK. work perfect.');
  }
  else{
    reject('Not OK. can not work.');
  }  
});
promise
  .then(result=>{
    console.log(result);
    return result + '!!!';
  })
  .then(result2=>{
    throw Error;
    console.log(result2);    
    return result2 + '???';
    // throw Error;     
  })
  .catch(()=>console.log('Error!!!'))
  .then(result3=>{
    console.log(result3);
  });

  // #################################################

  const promise1 = new Promise((resolve,reject)=>{
    setTimeout(resolve,100,'From1');
  });
  
  const promise2 = new Promise((resolve,reject)=>{
    setTimeout(resolve,200,'From2');
  });
  
  const promise3 = new Promise((resolve,reject)=>{
    setTimeout(resolve,400,'From3');
  });

  const promise4 = new Promise((resolve,reject)=>{
    setTimeout(resolve,600,'From4');
  });

  Promise.all([promise1,promise2,promise3,promise4])
    .then(values=>{
      console.log(values);
    });
  
// ############################################//#endregion

let urls = [
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/posts?userId=1',
  'https://jsonplaceholder.typicode.com/todos?userId=1'
];

fetch(urls[0])
  .then(res=>res.json())
  .then(res2=>{
    console.log('promise result from fetch',res2);
  })
  .catch(err=>console.log('Error from Fectch!!!',err));

async function getUserData(urlUser){
  try{
    let data1 = await fetch(urlUser);
    let data2 = await data1.json();
    console.log('promise result from getUserData ',data2);
  }
  catch(err){
    console.log('Error from getUserData !!!', err);
  }  
}

 getUserData(urls[0]);

Promise.all(urls.map(url=>{
  return fetch(url).then(resp=>resp.json());
}))
  .then(results=>{
    console.log('results from promise All');
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
  })
   .catch(err=>console.log('Error from promiseAll !!!',err));

async function getUserDeepData(urls){
  try{
    let data1 = await Promise.all(urls.map(async (url)=>{
      let data2 = await fetch(url);
      return data2.json();      
    //  return fetch(url).then(resp=>resp.json());
    }));
    console.log('results from getUserDeepData');
    console.log('user : ',data1[0]);
    console.log('post : ',data1[1]);
    console.log('todos : ',data1[2]);
  }
  catch(err){
    console.log('Error from getUserDeepData !!!', err);
  }
}
 getUserDeepData(urls);

async function getUserDeepData2(urls){
  try{
   let data1 = urls.map(url=>fetch(url));
   let ct = 1;
   for await (let req of data1){
     let data2 = await req.json();
     console.log('result from loop '+ ct +' in getUserDeepData2 ');
     console.log(data2);
     ct++;
   }
  }
  catch(err){
    console.log('Error from getUserDeepData2 !!!', err);
  }
}
getUserDeepData2(urls);