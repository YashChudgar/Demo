//Import-Export

// console.log("Hello")
// const pk=require('./demo')  //importing the file(function)
// console.log(pk.add(2,5))  //calling add function using the object created
// console.log("Subtraction:",pk.sub(2,5))


const fs=require('fs')
// console.log("before function")   //1st
// fs.readFile('first.txt','utf-8',(err,data)=>(     //utf-8 is mandatory   //3rd becaudse it is taking time to read so 2nd is executed early
//     console.log(err,data) //callback function (err means error so it is null ,then data is printed)
// )) 
// console.log('after function') //2nd

// console.log('before1 function')
// const data = fs.readFileSync('first.txt','utf-8') //this line will be executed after that it will execute next line 
// console.log(data)
// console.log('After function1')


// server creating and url accessing
//to stop the server running type cntrl + C
const http=require('http')
const url=require('url')
const path=require('path')
const myserver=http.createServer((request,response)=>{  //creating server
    const log=`${new Date()}:${request.url}:${request.method}requested\n`
    fs.appendFile('log.txt',log,()=>{})
    console.log('requested')

    //creating a switch case:
    switch(request.url){
        case '/':
            if(request.method==='GET'){
                fs.readFile(path.join(__dirname,'index.html'),(err,content)=>{response.end(content)})
            }
            else if(request.method==='POST'){
                response.end('post end')
            }
            // response.end("yes please")
            break;
        case '/about':
            fs.readFile(path.join(__dirname,'about.html'),(err,content)=>{response.end(content)})
            // response.end("I am Yash Chudgar")
            break;
        case '/services':
            fs.readFile(path.join(__dirname,'services.html'),(err,content)=>{response.end(content)})
            // response.end("I am Yash Chudgar")
            break;
        case '/contact':
            fs.readFile(path.join(__dirname,'contact.html'),(err,content)=>{response.end(content)})
            // response.end("I am Yash Chudgar")
            break;
        default:
            response.end("404 Page Not Found")
            break;
    }
    // response.end("yes please")  
    // //when requested we are responsing with "yes please"
})

myserver.listen(8000,()=>{
    console.log("Server created")
})
//end of node