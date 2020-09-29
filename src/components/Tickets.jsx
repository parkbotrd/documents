import React from 'react';
import './zMain.css';
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
            Rendered: true,
            realRendered: true,
            ticketId: this.props.match.params.ticketId
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
        return new Promise(resolve => setTimeout(() => resolve(), 1177));
    };
  
    renderAll = async() => {
        try {
            let res = await fetch(`http://localhost:3001/get/${this.state.ticketId}`).then(r => r.json())
            this.setState({
                title: res.title,
                author: res.author,
                chatting: JSON.parse(res.contents),
                realRendered: false
            })
        } catch (err) {
            console.log(err);
        }   
    }

    sc = (e) => {
        this.setState({
            replyContent: e.target.value
        })
    }

    apiRequest = async () => {
        if(!this.state.replyContent) return
        if(!localStorage.getItem("name")) return
        await fetch(`http://localhost:3001/post/${this.state.ticketId}/?content=${this.state.replyContent.split('&').join('')}&auth=${localStorage.getItem("auth")}`)
        // eslint-disable-next-line
        window.location.href = window.location.href
    }
  
    render() {
        if (this.state.Rendered || this.state.realRendered) {      
            return null 
        }

        return (
            <div className="Main-tc">

                <p className="White mt">티켓 아이디: <code>{this.state.ticketId}</code></p>
                <h1 className="White">{this.state.title}</h1>
                <h2 className="White">{this.state.author}</h2>
                <p>{this.state && this.state.chatting && this.state.chatting.map(t => (
                    <Card style={{margin: '10px', width: '80%', left: '8vw'}} className="text-white bg-dark mb-3">
                    <Card.Header>{t.author}</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {t.content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}</p>

                <Card style={{ width: '80%', left: '8.4vw' }} className="text-white bg-dark mb-3">
                    <Card.Body>
                        <Form>
                            <Form.Label>답장하기</Form.Label>
                            <Form.Control as="textarea" rows="5" id="content" onChange={this.sc} placeholder="답장할 내용 입력(줄바꿈은 허용되지 않습니다.)"/>
                            <Form.Text className="text-muted" style={{ fontSize: '9px' }}>
                                답장 내용은 암호화 되어 전송됩니다.
                            </Form.Text>
                        </Form>
                        <Button variant="primary" style={{ marginTop: '10px' }} onClick={this.apiRequest}>보내기</Button>
                        <Button variant="primary" style={{ marginLeft: '10px' }} href="/">메인으로</Button>
                    </Card.Body>
                </Card>
                
            </div>
        )
    }
}

export default withRouter(Tickets);