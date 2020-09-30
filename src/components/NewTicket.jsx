import React from 'react';
import './zMain.css';
import { Card, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router-dom"


class NewTicket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rendered: true,
            realRendered: true,
        }
    }
  
    componentDidMount() {
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
        return new Promise(resolve => setTimeout(() => resolve(), 270));
    };

    sc = (e) => {
        this.setState({
            Content: e.target.value
        })
    }

    apiRequest = async () => {
        if(!this.state.Content) return
        if(!localStorage.getItem("name")) return window.location.href = '/'
        let res = await fetch(`http://localhost:3001/new/?title=${this.state.Content.split('&').join('')}&auth=${localStorage.getItem("auth")}`).then(a => a.json())
        // eslint-disable-next-line
        window.location.href = `/tickets/${res.id}`
    }
  
    render() {
        if (this.state.Rendered) {      
            return null 
        }

        return (
            <div className="Main-tc">
                <h1 className="White">안녕하세요 (¬‿¬)</h1>
                <h5 className="White">문의할게 있으신가요?</h5>
                <Card style={{ marginTop: '50px', width: '80%', left: '8.4vw' }} className="text-white bg-dark mb-3">
                    <Card.Body>
                        <Form>
                            <Form.Label>티켓 열기</Form.Label>
                            <Form.Control 
                                id="content"
                                onChange={this.sc} 
                                placeholder="티켓 제목 입력"
                            />
                        </Form>
                        <Button variant="primary" style={{ marginTop: '10px' }} onClick={this.apiRequest}>티켓 열기</Button>
                        <Button variant="primary" style={{ marginLeft: '10px' }} href="/">메인으로</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default withRouter(NewTicket);