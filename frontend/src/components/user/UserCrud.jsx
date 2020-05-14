import React from "react"
import Main from "../template/Main"
import axios from "axios"

const headerProps= {
    icon: 'users',
    title: 'Usuarios',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = "http://localhost:3001/users"
const initialState = {
    user: {name: "", email: ""},
    list: []
}

export default class UserCrud extends React.Component {

    constructor(props){
        super(props)
        this.state={...initialState}
        this.save = this.save.bind(this)
        this.clear = this.clear.bind(this)
    }

    clear(){
        this.setState({ user: initialState.user})
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
        axios[method](url, user).then(resp => {
            this.setState({ user: initialState.user})
       })
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name" value={this.state.user.name}
                                onChange={event => this.updateField(event)}
                                placeholder="Digite o nome..."/>
                        </div>
                        <div className="form-group">
                                <label>E-mail</label>
                                <input type="text" className="form-control"
                                    name="email" value={this.state.user.email}
                                    onChange={event => this.updateField(event)}
                                    placeholder="Digite o email..."/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}