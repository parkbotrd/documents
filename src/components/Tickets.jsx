import React from 'react';
import './Tickets.css';
import { Card, Form, Button } from 'react-bootstrap'
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

    sc = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    apiRequest = () => {
        console.log(this.state.email)
    }
  
    render() {
        return (
            <div className="Main">
                <p className="White mt">티켓 아이디: <code>{this.state.ticketId}</code></p>
                <h1 className="White">{this.state.title}</h1>
                <h2 className="White">{this.state.author}</h2>
                <p>{this.state && this.state.chatting && this.state.chatting.map(t => (
                    <Card style={{margin: '10px', width: '80%', left: '7%'}} className="text-white bg-dark mb-3">
                    <Card.Header>{t.author}</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {t.content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}</p>

                <Card style={{ width: '80%', left: '7.3%' }} className="text-white bg-dark mb-3">
                    <Card.Body>
                        <Form>
                            <Form.Label>답장하기</Form.Label>
                            <Form.Control as="textarea" rows="5" id="content" onChange={this.sc} placeholder="답장할 내용 입력"/>
                            <Form.Text className="text-muted" style={{ fontSize: '9px' }}>
                                답장 내용은 암호화 되어 전송됩니다.
                            </Form.Text>
                        </Form>
                        <Button id="button_buy_usd" variant="primary" style={{ marginTop: '10px' }} onClick={this.apiRequest}>보내기</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default withRouter(Tickets);