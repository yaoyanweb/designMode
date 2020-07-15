const { promises } = require('dns');
const fs = require('fs');

// promise  版
const read = function(address){
    return new Promise((resolve,reject)=>{
        fs.readFile(address,'utf8',function(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    })
}
// read('./test1.txt').then(data=>{
//     console.log(data);
//     return read('./test2.txt');
// },err=>{
//     console.log(err);
// }).then(data=>{
//     console.log(data);
// })





/* 发布订阅版 */
let e = {
    valList:[],
    _callback:[],
    on(callback){
        this._callback.push(callback);
    },
    emit(val){
        this.valList.push(val);
        this._callback.forEach(fn=>{
            fn(this.valList);
        })
    }
}

e.on(function(obj){
    if(obj.length > 1){
        console.log(obj)
    }
})

fs.readFile('./test1.txt','utf8',function(err,data){
    if(err){
      console.log(err)
    }else{
        e.emit(data)
    }
});
fs.open('./test1.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
   console.log("文件打开成功！");     
 });

fs.readFile('./test2.txt','utf8',function(err,data){
    if(err){
      console.log(err)
    }else{
        e.emit('age',data)
    }
});