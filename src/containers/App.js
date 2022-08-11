import React,{Component} from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox'
import  '../containers/App.css'
import Scroll from '../components/Scroll'
import ErrorBoundary from "../components/ErrorBoundary";

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots : [],
            searchfields: ''
        }
    }

    onSearchChange = (event) => {
        this.setState({searchfields: event.target.value})
    }

    render(){
        const {robots, searchfields} = this.state
        const filteredRobot = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfields.toLowerCase())
        })
        return !robots.length ?
            <h1 className="tc">Loading...</h1> : 
            (
                <div className="tc">
                    <h1 className="f1">Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobot} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(users => this.setState({robots : users}));
    }
}

export default App;