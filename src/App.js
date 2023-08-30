import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 2, packed: true },
];

export default function App() {
  const [list,setList] = useState();
  return (
    <div className="app">
      <Logo></Logo>
      <Form></Form>
      <PackingList></PackingList>
      <Start></Start>
    </div>
  );
}
function Logo(){
  return <h1>🌴 Far Away 👜</h1>
}
function Form(){
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e){
    e.preventDefault();
    if(!description)return;
    const newItem = {description,quantity, packed: false, id: Date.now() };
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
function PackingList(){

  return(
    <div className="list">
      <ul>
      {initialItems.map(item =><Item item={item} key={item.id}/>)}
      </ul>
    </div>
  )
  
};


function Item({item},{key}){
  function handleClick(){

  }
  return(
    <li>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>  
      <button onClick={handleClick}>❌</button>    
    </li>
  )
}
function Start(){
  return(
    <footer className="stats">
      <em>
      You have X items on your list, and you already packed X (X%)
      </em>
    </footer>
  )
}


