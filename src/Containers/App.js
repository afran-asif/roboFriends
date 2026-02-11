import React, { useState, useEffect } from "react";
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import ErrorBoundary from '../Components/ErrorBoundary';
import Scroll from '../Components/Scroll';
import { connect } from "react-redux";
import { setSearchField } from "../actions";
import './App.css'

const mapStateToProps = state => ({
    searchField: state.searchField
});

const mapDispatchToProps = dispatch => ({
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
});

function App({ searchField, onSearchChange }) {

    const [robots, setRobots] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users));
    }, []);
    
    const filterRobots = robots.filter(robot =>
        robot.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return !robots.length ? <h1>Loading...</h1> : (
        <div className="tc">
            <h1>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filterRobots} />
                </ErrorBoundary>
            </Scroll>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
