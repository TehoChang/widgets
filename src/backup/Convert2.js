import React,{useEffect, useState} from 'react'
import axios from 'axios';





 const Convert2=({language, debouncedContent})=> {
     const [translated, setTranslasted]=useState('');

    useEffect(()=>{
        const doTranslation=async()=>{
            const {data}=await axios.post(
                'https://translation.googleapis.com/language/translate/v2',
                {},
                {
                    params: {
                        q: debouncedContent,
                        target: language.value,
                        key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
                      },

                })
            setTranslasted(data.data.translations[0].translatedText);
        }
        doTranslation();

    },[debouncedContent, language])


    return (
        <div>
            {translated}
        </div>
    )
}

export default Convert2;