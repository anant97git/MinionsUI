import * as React from 'react';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import ReactDOM from 'react-dom';

const Story = (props) => {
    const { name } = (props.location && props.location.state) || {}
    console.log('value of state :- ', props);
    return (
        <div>
            <h1>hello story</h1>
            <h1>hello story</h1>
            <h1>hello story</h1>
            <h1>hello story</h1>
            <h1>somval {name}</h1>
        </div>
    )
}


export default Story;