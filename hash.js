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

  const load = ()=>{
    return capacity * loadFactor;
  }

  function set(key, value) {
    let index = hash(key);
    if (capacity > size * loadFactor) {
      console.log(" Capacity hit! " + size * loadFactor );
      resize(key,value);
      
    }
    else if (map[index] === null){
      let list = new LinkedList();
      list.append(key,value);
      map[index] = list;
      capacity++;
      
    }
    else if (map[index].contains(key)){
      map[index].findKey(key).nodeValue = value ;
      
    }
    else{
      map[index].append(key,value);
      capacity++;
   
    }
    
    // map[index] = { key: key, value: value };
    // capacity++;
  }

  function get(key) {
    if(has(key) === false) return "Nothing found"
    let index = hash(key);
    if (index < 0 || index >= map.length) {
      throw new Error("Trying to access index out of bounds");
    }
    else if( map[index].contains(key)){
      return map[index].findKey(key).nodeValue;
    }
  }

  function resize(key,value) {
    size = size * 2;
    let OldMap = [...map];
    clear();
    capacity = 0;
    OldMap.forEach((element) => {
      if(element === null || element === undefined)return null;
      let removed = element.pop()
      set(removed.nodeKey, removed.nodeValue)
      while(removed !== null){
        removed = element.pop();
        if (removed === null) return "boop";
        set(removed.nodeKey, removed.nodeValue)
        
      }
    })
    
    set(key,value);
    
  }

  function remove(key){
    let index = hash(key);
    if(!has(key)){
      return false;
    }
    else if(map[index].head().nextNode === null){
      map[index] = null;
      capacity--;
    }
    else{
      map[index].remove(key)
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
    map = new Array(size).fill(null);
    return;
  }

  function getMap() {
    return map;
  }

  function keys(){
    let hashKeys =[];
    map.forEach((element)=>{
      if(element === null) return;
      let newNode = element.head();
      hashKeys.push(newNode.nodeKey);
      if(newNode.nextNode === null){ 
        return;
      }
      while(newNode.nextNode !== null){
        newNode = newNode.nextNode;
        hashKeys.push(newNode.nodeKey);
      }
    })
    return hashKeys;
  }

  function values(){
    let hashValues =[];
    map.forEach((element)=>{
      if(element === null) return;
      let newNode = element.head();
      hashValues.push(newNode.nodeValue);
      if(newNode.nextNode === null){
        return;
      }
      while(newNode.nextNode !== null){
        newNode = newNode.nextNode;
        hashValues.push(newNode.nodeValue);
      }
      
    }) 
    return hashValues;
  }

  function entries(){
    let hashEntries =[];
    map.forEach((element)=>{
      if (element === null) return;
      let newNode = element.head();
      let set = [newNode.nodeKey,newNode.nodeValue];
      hashEntries.push(set);
      if(newNode.nextNode === null) return;
      while(newNode.nextNode !== null){
        newNode = newNode.nextNode
        set = [newNode.nodeKey,newNode.nodeValue]
        hashEntries.push(set);
      }
    })
    return hashEntries;
  }
  return { hash, set, get, getMap,has,remove,length,clear,keys,values,entries,load };
}

let test = HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log(test.entries());
console.log(test.length());
console.log(test.load());
// console.log(test.remove("lion"));
// console.log(test.remove('dog'));
// console.log(test.getMap());
// console.log(test.length());
// console.log(test.keys());
// console.log(test.values());
// console.log(test.entries());
test.set('moon', 'silver')
console.log(test.load());
// console.log(test.entries());
console.log(test.length());
console.log(test.get('lion'));
console.log(test.get('dog'));
console.log(test.has('lion'));
console.log(test.has('dog'));
console.log(test.get('puppy'));
console.log(test.has('house'));
test.set('lion','red');
console.log(test.entries());
console.log(test.length());