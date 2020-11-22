/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Convert2 from '../components/Convert2';

import Dropdown from '../components/Dropdown';

const options = [
    {
      label: 'Afrikaans',
      value: 'af',
    },
    {
      label: 'Arabic',
      value: 'ar',
    },
    {
      label: 'Hindi',
      value: 'hi',
    },
    {
      label: 'Dutch',
      value: 'nl',
    },
  ];



const Translate2=()=>{
    
    const [results, setResults]=useState([]);
    const [content, setContent]=useState('');
    const [debouncedContent, setDebouncedContent]=useState('');
    const [selected, setSelected]=useState(options[0]);

    useEffect(()=>{
        const timeId=setTimeout(()=>{
            setDebouncedContent(content)
            }, 1000)
        
            console.log('useEffect_setDebounedContent been invoked');
        
        return ()=>{
            clearTimeout(timeId);
        }
    },[content])

    
    // useEffect(()=>{
    //     const searchTerm=async()=>{
    //         const {data}=await axios.get('https://en.wikipedia.org/w/api.php',{
    //             params:{
    //                 action: 'query',
    //                 list: 'search',
    //                 origin: '*',
    //                 format: 'json',
    //                 srsearch: debouncedContent,
    //             },
    //         });
        
    //         setResults(data.query.search)
        
    //     }
    //     searchTerm();
        
    // },[debouncedContent])
    
    
    return (
        <div className>
            <label>Please enter content</label>
            <hr/>
            <input 
                value={content}
                onChange={(e)=>setContent(e.target.value)}
            ></input>
            <Dropdown
                label='Select a Language'
                options={options}
                selected={selected}
                onSelectedChange={setSelected}            
            />
            <Convert2 language={selected} debouncedContent={debouncedContent}/>

            
            

        </div>
    );
}


export default Translate2;