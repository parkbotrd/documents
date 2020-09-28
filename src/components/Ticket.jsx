import React from 'react';
import './Main.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // eslint-disable-next-line
    Link,
    useRouteMatch,
    // eslint-disable-next-line
    useParams,
    withRouter
} from "react-router-dom"

function App() {
    let match = useRouteMatch();

    return(
        <Router>
            <Switch>
                <Route path={`${match.path}/:ticketId`}>
                    <Tickets />
                </Route>
            </Switch>
        </Router>
    )
}

class Tickets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rendered: null,
            ticketId: this.props.match.params.ticketId
        }
    }
  
    componentDidMount() {
        this.renderAll()
    }
  
    renderAll = async() => {
        // let guildId = window.location.href.replace(/[^0-9]/g,'').replace(3000, "")
        try {
            let res = await fetch(`http://localhost:3001/get/asdf`).then(r => r.json())
            // this will re render the view with new data
            this.setState({
                title: res.title
        })
            } catch (err) {
                console.log(err);
        }   
    }
  
    render() {
        return (
           <p>{this.state.ticketId}</p>
        )
    }
}

export default withRouter(Tickets);