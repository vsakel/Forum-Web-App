
import React from "react";
import CategoryContainer from './CategoryContainer'

class Home extends React.Component {
    constructor(props) {
        super(props);
        let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
        console.log(apiUrl);
        this.state = {categories: []};

        fetch(apiUrl, {
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                categories: data
            });
            console.log(this.state.categories);
        })
        .catch(e => console.log(e));
    }

    render() {
        return <div>
                <h1>Home</h1>
                <CategoryContainer subcategories={this.state.categories} subthreads={[]}/>
               </div>;
    }
}

export default Home;