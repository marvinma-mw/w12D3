// document.addEventListener("DOMContentLoaded", async () => {

//     console.log('test test ...')

//     try{
//         const res = await fetch("http://localhost:8080/tweets");
//         const { tweets } = await res.json();
//         console.log(tweets);
//     } catch(e){
//         console.error(e);
//     }
// })

document.addEventListener("DOMContentLoaded", async () => {
    try {
      const res = await fetch("http://localhost:8080/tweets");
      const { tweets } = await res.json();
      console.log(tweets);
    } catch (e) {
      console.error(e);
    }
  });
