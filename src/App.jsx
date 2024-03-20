import React, { useState, useEffect } from "react";
import todos from "./service/todos";
import "./App.css";
import GetBlock from "./components/GetBlock/GetBlock";
import MoveBlock from "./components/MoveBlock/MoveBlock";
import RemoveBlock from "./components/RemoveBlock/RemoveBlock";

function App() {
  const [titleList, setTitleList] = useState([
    { id: "28", title: "title 28" },
    { id: "29", title: "title 29" },
    { id: "30", title: "title 30" },
  ]);
  const [moveItems, setmoveItems] = useState([]);
  const [deleteItems, setDeleteItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await todos.get();
        setTitleList(JSON.parse(JSON.stringify(response)));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleTransferFirstToRight = () => {
    const newList = titleList.slice(0, -1); // создать новый массив без последнего

    // Вырезать последний элемент из списка и сохранить его в cutItem
    const cut = titleList.pop();

    setmoveItems((prevCutItems) => [cut, ...prevCutItems]); // Добавляем вырезанный элемент в массив
    setTitleList(newList);
  };

  const handleReturnGetBlock = () => {
    if (moveItems.length === 0) {
      alert("YOU have to add something");
      return null;
    } else {
      const newList = moveItems.slice(1); // создать новый массив без первого

      // Вырезать првый элемент из списка и сохранить его в cutItem
      const cut = moveItems.slice(0, 1)[0];

      setmoveItems(() => [...newList]);
      setTitleList((prevCutItems) => [...prevCutItems, cut]);
    }
  };

  const handleTransferSecondToRight = () => {
    if (moveItems.length === 0) {
      alert("YOU have to add something");
      return null;
    } else {
      const newList = moveItems.slice(0, -1);
      const cut = moveItems.pop();

      setDeleteItems((prevCutItems) => [cut, ...prevCutItems]);
      setmoveItems(newList);
    }
  };

  const handleDelete = () => {
    if (deleteItems.length === 0) {
      alert("YOU have to add something");
      return null;
    } else {
      (async () => {
        const newList = deleteItems.slice(0, -1);
        const cut = deleteItems.pop();

        try {
          await todos.delete(cut.id);
        } catch (error) {
          console.log(error);
        }

        setDeleteItems(newList);
      })();
    }
  };

  return (
    <>
      <h2>Get list from API.</h2>
      <div className="container">
        <div className="wrap_block">
          <GetBlock titleList={titleList} />
          <button onClick={handleTransferFirstToRight}>
            Transfer first to right
          </button>
        </div>
        <div className="wrap_block">
          <MoveBlock titleList={moveItems} />
          <div className="wrap_button">
            <button onClick={handleReturnGetBlock}>
              Transfer first to left
            </button>
            <button onClick={handleTransferSecondToRight}>
              Transfer second to right
            </button>
          </div>
        </div>
        <div className="wrap_block">
          <RemoveBlock titleList={deleteItems} />
          <button onClick={handleDelete}>Remove last item</button>
        </div>
      </div>
    </>
  );
}

export default App;
