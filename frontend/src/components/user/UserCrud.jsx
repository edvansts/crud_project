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
        this.listUpdate = this.listUpdate.bind(this)
    }

    componentDidMount(){
        axios.get(baseUrl).then(resp =>{
            this.setState({list: resp.data})
        })
    }
    
    listUpdate(){
        axios.get(baseUrl).then(resp =>{
            this.setState({list: resp.data})
        })
    }

    clear(){
        this.setState({ user: initialState.user})
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
        axios[method](url, user).then(resp => {
            this.setState({user: initialState.user}, () => {
                return this.listUpdate();
            }) 
       })
    }

    remove(user){
        console.log(user)
        if(window.confirm("Você quer realmente excluir o usúario?")){
            axios.delete(`${baseUrl}/${user.id}`).then(resp =>{
                console.log(resp.data)
                this.listUpdate()
            })
        }
    }

    load(user){
        this.setState({user})
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
    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(user =>{
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user) } >
                            <i className="fa fa-pencil" />
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user) }>
                            <i className="fa fa-trash"/>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}