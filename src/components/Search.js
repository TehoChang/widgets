import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);
    // 宣告timeId=setTimeout，一個函數表達式，為什麼不用寫一行timerId()
    // 就直接調用了呢？因為setTimeout的關係？

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);
  //鉤子函數，每當term改變的時候就執行


  useEffect(() => {
    //因為useEffect不能直接寫async，所以又多了一層
    //多一層也不難理解，這個箭頭函數執行的操作是：先聲明一個方法，然後執行
    const search = async () => {

      if (!debouncedTerm) {
        setResults(null)
      }
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        },
      });

      setResults(data.query.search);
    };
    search();
    //相比上面的setTimeout，箭頭函數的表達式似乎不會直接調用，所以我們要手動調用它
  }, [debouncedTerm]);
  //鉤子函數，每當debouncedTerm改變的時候就執行



  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });
  

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
