const {LinkedList} = require("./linkedList");

function node(key,value) {
  const nodeKey = key;
  const nodeValue = value;
  const nextNode = null;
  return { nodeKey,nodeValue, nextNode };
}

function HashMap() {
  let loadFactor = 0.75;
  let capacity = 0;
  let size = 16;
  let map = new Array(16).fill(null);

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % size;
    }
    return hashCode;
  }

  function set(key, value) {
    let index = hash(key);

    if (capacity > size * loadFactor) {
      console.log(size * loadFactor + " Capacity hit!");
      resize();
    }
    else if (map[index] === null){
      let list = new LinkedList();
      list.append(key,value);
      map[index] = list;
      console.log(map[index].contains(key));
      capacity++;
    } 
    else if (map[index].contains(key)){
      map[index].findKey(map[index].head(),key).nodeValue = value ;
    }
    else{
      map[index].append(key,value);
      capacity++;
    }
    // map[index] = { key: key, value: value };
    // capacity++;
  }

  function get(key) {
    let index = hash(key);
    if (index < 0 || index >= map.length) {
      throw new Error("Trying to access index out of bounds");
    }
    else if( map[index].contains(key)){
      return map[index].head().nodeValue;
    }
  }

  function resize() {
    size = size * 2;
    let OldMap = map;
    map = [];
    capacity = 0;
    OldMap.forEach((element) => {
      set(element.key, element.value);
    });
    console.log(map);
  }

  function remove(key){
    if(!has(key)){
      return false;
    }
    else{
      map.splice(hash(key),1);
      capacity--;
    }
  }

  function has(key) {
    let index = hash(key);
    if(map[index] === null){
      return false;
    }
    else
    return map[index].contains(key)
  }

  function length(){
    return capacity;
  }

  function clear(){
    map = new Array(16).fill(null);
  }

  function getMap() {
    return map;
  }

  function keys(){
    let hashKeys =[];
    map.forEach((element)=>{
      hashKeys.push(element.key);
    })
    return hashKeys;
  }

  function values(){
    let hashValues =[];
    map.forEach((element)=>{
      hashValues.push(element.value);
    }) 
    return hashValues;
  }

  function entries(){
    let hashEntries =[];
    map.forEach((element)=>{
      let set = [element.key,element.value];
      hashEntries.push(set);
    })
    return hashEntries;
  }
  return { hash, set, get, getMap,has,remove,length,clear,keys,values,entries };
}

let test = HashMap();
test.set('apple', 'red')
console.log(test.get('apple'));
test.set('apple', 'blue')
let array = test.getMap();
console.log(test.get('apple'));
test.set('apple', 'orange');
console.log(test.get('apple'));
console.log(test.has('orange'))
// console.log(array[].head());
// console.log(test.remove("lion"));
// console.log(test.getMap());
// console.log(test.length());
// console.log(test.keys());
// console.log(test.values());
// console.log(test.entries());