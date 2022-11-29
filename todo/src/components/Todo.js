import React, { useState, useEffect } from 'react';
import "./todo.css"

const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");
  if (lists) {
    return JSON.parse(lists);
  }
  else {
    return [];
  }
}


const Todo = () => {


  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editItem, setEditItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);


  // Add Items

  const addItems = () => {
    if (!inputData) {
      alert("Plz Enter Data");
    }
    else if (inputData && toggleBtn) {
      setItems(
        items.map((currEle) => {
          if (currEle.id === editItem) {
            return { ...currEle, name: inputData }
          }
          return currEle;
        })

      );
      setInputData();
      setEditItem([]);
      setToggleBtn(false);
    }
    else {
      const data = {
        id: new Date().getTime().toString(),
        name: inputData,
      }
      setItems([...items, data]);

    };
    setInputData("")
  }

  // Delete items
  const deleteItems = (index) => {
    const updatedItem = items.filter((currEle) => {
      return currEle.id !== index;
    });
    setItems(updatedItem);
  }

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items))
  }, [items]);


  // Edit Items
  const editItems = (index) => {
    const item_edited = items.find((currEle) => {
      return currEle.id === index;
    });
    setInputData(item_edited.name);
    setEditItem(index);
    setToggleBtn(true);
  };

  return (
    <>
      <div className='main-div'>

        <div className='child-div'>

          <figure>
            <img src='./images/todo.png' className='todo-icon'></img>
            <figcaption className='caption'>Add Your List Here 📝</figcaption>

          </figure>


          <div className='add-items'>

            <div className='input'  >

              <input className='text-field' placeholder='✏️ Add Item... ' value={inputData} onChange={(event) => setInputData(event.target.value)}></input>

              {/* <span className='add'><i className="fa-solid fa-pen-to-square"></i></span> */}

              {toggleBtn ? (<span className='add'><i className="fa-solid fa-pen-to-square" onClick={addItems} ></i></span>)
                : (<span className='add'><i className="fa-solid fa-plus" onClick={addItems} ></i></span>)
              }
              {/* <span className='add'><i className="fa-solid fa-plus" onClick={addItems} ></i></span> */}
            </div>
          </div>

          <div className='show-items'>

            {items.map((currEle) => {
              return (
                <>
                  <div className='each-item' key={currEle.id}>
                    <div className='input-flex'>{currEle.name}</div>
                    <div className='crud'>
                      <div className='edit'><i className="fa-solid fa-pen-to-square" onClick={() => editItems(currEle.id)}  ></i></div>

                      <div className='delete'><i className="fa-solid fa-trash" onClick={() => deleteItems(currEle.id)}></i></div>
                    </div>

                  </div>
                </>
              )
            })}





          </div>
        </div>
      </div>
    </>
  )






}




export default Todo;
