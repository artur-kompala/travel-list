import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 2, packed: true },
];

export default function App() {
  const [items,setItems] = useState([]);
  

  function handleAddItems(item){
    setItems(items=>[...items,item])
  }
  function handleDeleteItems(id){
    setItems(items=>items.filter(item=>item.id !== id))
  }
  function handdleToggleItem(id){
    setItems(items=>items.map(item=> item.id === id ? {...item,packed : !item.packed} : item))
  }

  return (
    <div className="app">
      <Logo></Logo>
      <Form handleAddItems={handleAddItems}></Form>
      <PackingList items={items} onDeleteItem={handleDeleteItems} onToggleItems={handdleToggleItem}></PackingList>
      <Start items={items}></Start>
    </div>
  );
}

function Logo(){
  return <h1>🌴 Far Away 👜</h1>
}
function Form({handleAddItems}){
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e){
    e.preventDefault();
    if(!description)return;
    const newItem = {description,quantity, packed: false, id: Date.now() };
    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  

  return (
  <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you need for your trip?</h3>
    <select value={quantity} onChange={(e)=>setQuantity(e.target.value)}>
      {Array.from({length: 20}, (_,i) => i + 1).map(num=><option value={num} key={num}>{num}</option>)}
    </select>
    <input  type="text" placeholder="Item..." value={description} onChange={(e)=>setDescription(e.target.value)}></input>
    <button>Add</button>
  </form>
  )
}
function PackingList({items, onDeleteItem, onToggleItems}){

  return(
    <div className="list">
      <ul>
      {items.map(item =><Item item={item} onDeleteItem={onDeleteItem} onToggleItems={onToggleItems}/>)}
      </ul>
    </div>
  )
  
};


function Item({item, onDeleteItem,onToggleItems}){
  return(
    <li>
      <input type="checkbox" value={item.packed} onChange={()=>onToggleItems(item.id)}></input>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>  
      <button onClick={()=>onDeleteItem(item.id)}>❌</button>    
    </li>
  )
}
function Start({items}){
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return(
    <footer className="stats">
      <em>
      {percentage === 100 ? 'You got everything! Ready to go!': `You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      
      </em>
    </footer>
  )
}


