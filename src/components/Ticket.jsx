import React from 'react';
import './zMain.css'
import { withRouter } from "react-router-dom"
// eslint-disable-next-line
import { Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


class Ticket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rendered: true,
            realRendered: true,
        }
    }
  
    componentDidMount() {
        this.renderAll()
        this.fakeRequest().then(() => {
            const el = document.querySelector(".loader-container");
            if (el) {
                el.remove();
                this.setState({
                    Rendered: false,
                })
            }
        })
    }

    fakeRequest = () => {
        return new Promise(resolve => setTimeout(() => resolve(), 1377));
    };
  
    renderAll = async() => {
        // let guildId = window.location.href.replace(/[^0-9]/g,'').replace(3000, "")
        try {
            let res = await fetch(`http://localhost:3001/mytickets/?auth=${localStorage.getItem("auth")}`).then(r => r.json())
            // this will re render the view with new data
            this.setState({
                chatting: res,
                realRendered: false
            })
        } catch (err) {
            console.log(err)
        }   
    }

    seeItem = (id) => {
        window.location.href = `/tickets/${id}`
    } 
  
    render() {
        if (this.state.Rendered || this.state.realRendered) {      
            return null 
        }

        return (
            <div className="Main">

                <h1 className="Black">내 티켓들</h1>

                <p>{this.state && this.state.chatting && this.state.chatting.map(t => (
                    <Card style={{ top: '30px', width: '80%', left: '8vw' }} className="bg-light mb-3">
                    <Card.Header>{t.title}</Card.Header>
                    <Card.Body>
                        <Button variant="primary" href={`/tickets/${t.id}`}>보기</Button>
                    </Card.Body>
                  </Card>
                ))}</p>

                <Button variant="warning" href="/tickets/newticket" className="nt">새 티켓 만들기</Button>
            </div>
        )
    }
}

export default withRouter(Ticket)