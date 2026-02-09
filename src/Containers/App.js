import React, {  useState , useEffect} from "react";
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import ErrorBoundary from '../Components/ErrorBoundary';
import './App.css'
import Scroll from '../Components/Scroll';


function App () {

    const [robots, setRobots ] = useState([]);
    const [searchfield, setSearchfield] =useState("");

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then( response => response.json())
            .then( users => setRobots(users));
            // console.log(robots,searchfield)
    },[])

    const onSearchchange = (event) => {
        setSearchfield(event.target.value)
    }

    
    const filterRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })

    return !robots.length? <h1>Loading...</h1> :
        (
            <div className="tc">
            <h1>RoboFriends</h1>
            <SearchBox searchchange = {onSearchchange}/>
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filterRobots}/>
                </ErrorBoundary>
            </Scroll>
            </div>
        )
    }
export default App;