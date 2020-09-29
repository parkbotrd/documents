import React from 'react';
import './zMain.css'
import { withRouter } from "react-router-dom"

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rendered: false,
            oauthCode: this.props.match.params.oauthCode
        }
    }
  
    componentDidMount() {
        this.renderAll()
    }
  
    renderAll = async() => {
        // let guildId = window.location.href.replace(/[^0-9]/g,'').replace(3000, "")
        try {
            let res = await fetch(`http://localhost:3001/oauth2/?code=${this.state.oauthCode}`).then(r => r.json())
            // this will re render the view with new data
            console.log(this.state.oauthCode)
            await localStorage.setItem("name", `${res.username}#${res.discriminator}`)
            await localStorage.setItem("id", res.id)
            await localStorage.setItem("auth", res.auth)
        } catch (err) {
            console.log(err)
        }   
    }
  
    render() {
        return (
            <div className="App-header">
                <a href="/">여기를 클릭해 주세요</a>
            </div>
        )
    }
}

export default withRouter(Login);