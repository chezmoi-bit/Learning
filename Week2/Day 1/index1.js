const fs = require('fs');

fs.readFile('file.txt', 'utf-8', (err, data)=> {
    console.log("Data is : ",data);
})

// const content = 'How to crack facebook 2';
// try {
//     await fs.writeFile('file.txt', content, (err) => {
//         console.log((err) ? "Error writing file" : "File write successfully")
//     })
// } catch (err) {

// }

// fs.readFile('file.txt', 'utf-8', (err, data)=> {
//     console.log("Data is : ",data);
// })


// const fs = require('fs/promises');
// async function example() {
//   try {
//     const content = 'Some content dude!'; 
//     await fs.writeFile('file.txt',  content);
//   } catch (err) {
//     console.log(err);
//   }
// }
// example();