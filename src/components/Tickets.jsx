import React from 'react';
import './Tickets.css';
import { Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    // eslint-disable-next-line
    Link,
    // eslint-disable-next-line
    withRouter
} from "react-router-dom"


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
            let res = await fetch(`http://localhost:3001/get/${this.state.ticketId}`).then(r => r.json())
            // this will re render the view with new data
            this.setState({
                title: res.title,
                author: res.author,
                chatting: res.chatting
            })
        } catch (err) {
            console.log(err);
        }   
    }
  
    render() {
        return (
            <div className="Main">
                <p className="White mt">티켓 아이디: <code>{this.state.ticketId}</code></p>
                <h1 className="White">{this.state.title}</h1>
                <h2 className="White">{this.state.author}</h2>
                <p>{this.state && this.state.chatting && this.state.chatting.map(t => (
                    <Card style={{margin: '10px'}}>
                    <Card.Header>{t.author}</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {t.content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}</p>
            </div>
        )
    }
}

export default withRouter(Tickets);