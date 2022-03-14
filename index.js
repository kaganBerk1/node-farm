
const { Console } = require('console')
const fs= require('fs')
const http=require('http')
const url=require('url')
const replaceTemplate=require("./modules/replaceTemplate")
/////FİLES
//blocking
/* const hello="hello"
let text=fs.readFileSync("./txt/input.txt",'utf-8')
let textOut=`Selamlar arkadaşalar bugün sizlerle  minecrafttta aleyna tilki portali a acctk ${text}.\n Created:${Date.now()}`
fs.writeFileSync("./txt/uotput.txt",textOut) 
//non-blocikng
fs.readFile("./txt/start.txt","utf-8",(err,data)=>{
    fs.readFile(`./txt/${data}.txt`,"utf-8",(err,data2)=>{
        fs.writeFile(`./txt/final.txt`,`${data + data2}`,"utf-8",(err)=>{
                if(err){
                    Console.log(err)
                }else{
                    console.log("you got it")
                }
        })
    })

})
console.log("reading.....") */

///SEurl
const data = fs.readFileSync(`./dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
    `./templates/template-overview.html`,
    'utf-8'
  );
  const tempCard = fs.readFileSync(
    `./templates/template-card.html`,
    'utf-8'
  );
  const tempProduct = fs.readFileSync(
    `./templates/template-product.html`,
    'utf-8'
  );
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
  
    // Overview page
    if (pathname === '/' || pathname === '/overview') {
      res.writeHead(200, {
        'Content-type': 'text/html'
      });
  
      const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
      res.end(output);
  
      // Product page
    } else if (pathname === '/product') {
      res.writeHead(200, {
        'Content-type': 'text/html'
      });
      const product = dataObj[query.id];
      const output = replaceTemplate(tempProduct, product);
      res.end(output);
  
      // API
    } else if (pathname === '/api') {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(data);
  
      // Not found
    } else {
      res.writeHead(404, {
        'Content-type': 'text/html',
        'my-own-header': 'hello-world'
      });
      res.end('<h1>Page not found!</h1>');
    }
  });
server.listen(8000,'127.0.0.1',()=>{
    console.log('listen to request on port 8000');
})

///Routing