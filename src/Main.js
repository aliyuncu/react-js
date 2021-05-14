import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter,
    BrowserRouter,
    Switch,
    Link
} from "react-router-dom";
import Home from "./Home";
import Book from "./Book";
import User from "./User";
import Rent from "./Rent";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookColumns: [{
                'key': 'bookId',
                'value': 'Kitap ID'
            },
            {
                'key': 'userId',
                'value': 'Kullanıcı ID'
            },
            {
                'key': 'userName',
                'value': 'Kullanıcı Adı'
            },
            {
                'key': 'bookName',
                'value': 'Kitap Adı'
            }],
            userColumns: [{
                'key': 'userId',
                'value': 'Kullanıcı ID'
            },
            {
                'key': 'userName',
                'value': 'Kullanıcı Adı'
            }],
            bookRows: [],
            userRows: [],
            newBookName: null,
            newUserName: null,
            userId: null
        };
    }

    handleBookDisplay = (data) => {
        this.setState({ bookRows: data });
    }

    handleBookChange = (data) => {
        this.setState({ newBookName: data });
    }

    handleUserDisplay = (data) => {
        this.setState({ userRows: data });
    }

    handleUserChange = (data) => {
        this.setState({ newUserName: data });
    }


    render() {
        return (
            <HashRouter>
                <div>
                    <h1>KÜTÜPHANE</h1>
                    <ul className="header">
                        <li><NavLink to="/">Anasayfa</NavLink></li>
                        <li><NavLink to="/book">Kitaplar</NavLink></li>
                        <li><NavLink to="/user">Kullanıcılar</NavLink></li>
                        <li><NavLink to="/rent">Kirala</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/book" >
                            <Book bookColumns={this.state.bookColumns} bookRows={this.state.bookRows} bookDisplay={this.handleBookDisplay}
                                bookChangeEvent={this.handleBookChange} newBookName={this.state.newBookName} />
                        </Route>
                        <Route path="/user" >
                            <User userColumns={this.state.userColumns} userRows={this.state.userRows} userDisplay={this.handleUserDisplay}
                                userChangeEvent={this.handleUserChange} newUserName={this.state.newUserName} />
                        </Route>
                        <Route path="/rent" >
                            <Rent />
                        </Route>

                    </div >
                </div >
            </HashRouter >
        );


    }
}

export default Main;