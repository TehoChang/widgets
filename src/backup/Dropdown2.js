//寫這個組件有一個關鍵，就是要會用semantic ui的Dropdown組件


import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const[show, setShow]=useState(false);

  const ref = useRef();

  // 邏輯、原理：
  // 最初我們在組件中的div 加上onClick=()=>{setOpen(!open)}，來開關Dropdown
  // 接著，我們要實現點擊頁面的別處也能關閉<Dropdown>，所以我們在<body>加上eventListener，
  // 這樣做會出現問題，由於event bubbling，當div的onClick被觸發，body的'click' eventListener也被觸發
  
  // 為了解決這問題，我們不直接阻止event bubbling，而是使用useRef()，並對標籤位置進行判斷
  // 我們寫的body.addEventlistener邏輯如下：如果標籤位置在<Dropdown>以內，<body>的onClick eventListener什麼都不做
  // 在<Dropdown>以外的位置被點擊時，才會執行操作setOpen(false)
  
  useEffect(() => {   
    const onBodyClick = (event) => {
      //event.target指的是這次Click事件，被點擊的那個標籤
      //如果被點擊的標籤包含在ref中，什麼都不做
      //ref.current.contains方法是用來判斷被指向的標籤是否有包含某個標籤，返回結果為T/F
      if (ref.current.contains(event.target)) {
        return;
      }
      //省略else
      setOpen(false);
    };
    //在DOM添加这个event listener
    document.body.addEventListener('click', onBodyClick);
    //记得返回一个cleanup function，下次调用useEffect会先执行这个方法
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);


  const renderedOptions = options.map((option) => {
   //若当前项已是组件的状态中保存的项，则此项不渲染
    if (option.value === selected.value) {
      return null;
    }
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <button onClick={()=>setShow(!show)}>
      Toggle Compo
      </button>
      {show?(
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>):null}
    </div>
  );
};

export default Dropdown;
