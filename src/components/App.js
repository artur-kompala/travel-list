import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Footer from "./Footer";

export default function App() {
  let [items,setItems] = useState([]);
  

  function handleAddItems(item){
    setItems(items=>[...items,item])
  }
  function handleDeleteItems(id){
    setItems(items=>items.filter(item=>item.id !== id))
  }
  function handdleToggleItem(id){
    setItems(items=>items.map(item=> item.id === id ? {...item,packed : !item.packed} : item))
  }
  function handdleToggleClearList(){
    const confirmed = window.confirm('Are you syre you want to delete all items?')
    if(confirmed) setItems([]) 
   
  }

  return (
    <div className="app">
      <Logo></Logo>
      <Form handleAddItems={handleAddItems}></Form>
      <PackingList items={items} onDeleteItem={handleDeleteItems} onToggleItem={handdleToggleItem} clearList={handdleToggleClearList}></PackingList>
      <Footer items={items}></Footer>
    </div>
  );
}










