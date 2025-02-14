function add(a,b){
    return a+b
}
function sub(a,b){
    return a-b
}
module.exports={
    add,sub  //exporting the functions using module.exports 
    //if more then one file then we have to give that in JSON format i.e. in {}
    //if only one then no need to give in JSON format
}