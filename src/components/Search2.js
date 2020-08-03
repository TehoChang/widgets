/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import axios from 'axios';




const search2=()=>{
    
    const [results, setResults]=useState([]);
    const [term, setTerm]=useState('Courage');
    const [debouncedTerm, setDebouncedTerm]=useState(term);

    //如果term不再改变，就把它赋值给debouncedTerm
    useEffect(()=>{
        const timeId=setTimeout(()=>{
            setDebouncedTerm(term)
            }, 500)
        console.log('useEffect_term been invoked')
        return ()=>{
            clearTimeout(timeId);
        }
    },[term])

    
    useEffect(()=>{
        const searchTerm=async()=>{
            const {data}=await axios.get('https://en.wikipedia.org/w/api.php',{
                params:{
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm,
                },
            });
        
            setResults(data.query.search)
        
        }
        searchTerm();
        
    },[debouncedTerm])

    const renderedData=results.map((item)=>{
        return <div key={item.pageid}>{item.title}</div>
    })
    
    return (
        <div className>
            <label>Please enter a term</label>
            <hr/>
            <input 
                value={term}
                onChange={(e)=>setTerm(e.target.value)}
            ></input>
            <div>your results</div>
            <div className="ui celled list">{renderedData}</div>

        </div>
    );
}


export default search2;