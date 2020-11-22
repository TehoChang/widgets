import React, { useState } from 'react';

const Accordion2 = ({ items }) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index);
    setOpen(!open)
    }
  ;

  //因为是数组，map方法的第二个参数可以使用index属性
  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex && open ? 'active' : '';

    return (
      <React.Fragment key={item.title}>
        <div className={`title ${active}`} onClick={()=>onTitleClick(index)}>
                                                            {/* 箭頭函數前面這個()不用寫參數進去，後面的()裡面寫就好 
                                                                那為什麼使用event當作參數的時候，寫法不一樣呢？*/}
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{renderedItems}</div>;
};
//把一个数组，数组中的每一项都是带有className=title, className=content的JSX用
//<div className="ui styled accordion">包起来，这个组合就实现了accordion功能
//带有active的那一项会被展开
export default Accordion2;