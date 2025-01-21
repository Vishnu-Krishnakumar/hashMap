function LinkedList() {
    let headNode = null;
    let listSize = 0;
    
    const append = (key,value) => {
        if (headNode === null) {
            let newNode = node(key,value);
            headNode = newNode;
            listSize++;
        }
        else {
            searchTail(headNode).nextNode = node(key,value);
            listSize++;
        }
    }

    const prepend = (key,value) => {
        let newNode =  node(key,value);
        newNode.nextNode = headNode;
        headNode = newNode;
    }

    const size = () => {
        return listSize;
    }

    const head = () => {
        if (headNode === null) {
            return "There is no head node at the moment :(!!";
        }
        return headNode;
    }

    const tail = () => {
        return searchTail(headNode);
    }

    const at = (index) => {
        if (index >= listSize) {
            return `The list has a size of ${listSize}, the index starts from 0!`;
        }
        let search = headNode;
        for (i = 0; i < index; i++){
            if (search.nextNode !== null) {
                search = search.nextNode;
            }    
        }
        return search;
    }

    const pop = () => {
       let removed;
       if(headNode === null) return null;
       if(headNode.nextNode === null){
        removed = headNode;
        headNode = null;
        return removed;
       }
       removed = removeLast(headNode);
       return removed;
       
    }

    const contains = (key) => {
        return search(headNode, key);
    }

    const find =(key) => {
        return findIndex(head(), key, 0);
    }

    const toString = () => {
        let newNode = headNode;
        let string = `(${newNode.nodeKey}) -> `;
        while (newNode.nextNode !== null) {
            newNode = newNode.nextNode;
            string += `(${newNode.nodeKey}) -> `;
        }
        string += `null`;
        return string;
    }

    const findKey = (key, node = headNode)=>{
        if(node.nodeKey === key){
          return node;
        }
        else {
          return findKey(key,node.nextNode)
        }
    }
    const insertAt = (key,value,index) => {
        let search = headNode;
        let newNode = node(key,value);
       
        if (index >= listSize) {
            return console.log(`The list has a size of ${listSize}, the index starts from 0!`);
        }
        if (index === 0) {
            newNode.nextNode = headNode.nextNode;
            headNode = newNode;
            return;
        }
        for (i = 0; i < index - 1; i++){
            if (search.nextNode !== null) {
                search = search.nextNode;
            }    
        }
        if (search.nextNode.nextNode !== null || search.nextNode.nextNode !== undefined) {
            newNode.nextNode = search.nextNode.nextNode;  
        }
        else {
            newNode.nextNode === null;
        }
        search.nextNode = newNode;
    }

    function findIndex(node, key, index) {
        if (node.nodeKey === key) {
            return index;
        }
        
        else if (node.nextNode === null) {
            return null
        }
        else {
            return findIndex(node.nextNode,key, index+=1);
        }
    }

    function search(node, key) {
        if (node.nodeKey === key) {
            return true;
        }
        else if (node.nextNode === null) {
            return false
        }
        else {
            return search(node.nextNode,key)
        }
    }

    function removeLast(node) {
       
        if (node.nextNode.nextNode === null){
            let removed = node.nextNode;
            node.nextNode = null;
            return removed;
        } 
        else {
            return removeLast(node.nextNode);
        }
    }

    function searchTail(node) {
        if (node.nextNode === null) return node;
        else {
            return searchTail(node.nextNode);
        }
    }

    const remove = (key) => {
        let index = findIndex(headNode,key,0);
        
        let node = headNode;
        if(headNode.nextNode === null){
           headNode = null;
           return;
        }
        for(let i = 0; i < index-1; i++){
          node = node.nextNode;
        }
       
        if(node.nextNode.nextNode !== null){
          node.nextNode = node.nextNode.nextNode;
        }
        else{
          node.nextNode = null;
        }
      }

    return {append, prepend, size, head, tail, at, pop, contains, find, toString,insertAt,findKey,remove};
}

function node(key,value) {
    const nodeKey = key;
    const nodeValue = value;
    const nextNode = null;
    return { nodeKey,nodeValue, nextNode };
  }

export{LinkedList};