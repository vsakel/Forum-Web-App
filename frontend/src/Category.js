
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CategoryContainer from "./CategoryContainer";

function Category() {
    let params = useParams();
    const [subcategories, setSubcategories] = useState([]);
    const [subthreads, setSubthreads] = useState([]);

    useEffect(() => {
        let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
        console.log(apiUrl + "/category/" + params.categoryid);
        fetch(apiUrl + "/category/" + params.categoryid, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setSubcategories(data.categories);
            setSubthreads(data.threads);
            //console.log(subcategories);
            //console.log(subthreads);
        })
        .catch(e => console.log(e));
    }, [params.categoryid]);


    return <div>
            <h1>Category</h1>
            <CategoryContainer subcategories={subcategories} subthreads={subthreads}/>
            </div>;
}

export default Category;