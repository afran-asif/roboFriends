import React, {Component} from "react";
import CardList from './CardList';
import SearchBox from './SearchBox';
import './App.css'
import Scroll from './Scroll';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots : [],
            searchfield : ''
        }
    }

    componentDidMount () {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then( response => response.json())
            .then( users => this.setState({ robots : users }));
    }

    onSearchchange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render(){
        const { robots , searchfield } = this.state;
        const filterRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })

    return !robots.length? <h1>Loading...</h1> :
        (
            <div className="tc">
            <h1>RoboFriends</h1>
            <SearchBox searchchange = {this.onSearchchange}/>
            <Scroll>
            <CardList robots={filterRobots}/>
            </Scroll>
            </div>
        )
    }
    
}
export default App;