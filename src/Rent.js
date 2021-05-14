import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import { Link, useLocation } from 'react-router-dom';

class Rent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rentalBookId: null,
            rentalUserId: null
        }
    }



    handleRent = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: this.state.rentalUserId, bookId: this.state.rentalBookId })
        };
        fetch('http://localhost:9101/users/rentBookToUser', requestOptions)
            .then(response => response.json())
            .then((data) => {
                alert(data.message);
            });
    }

    handleBookChange = (event) => {
        this.setState({ rentalBookId: event.target.value });
    }

    handleUserChange = (event) => {
        this.setState({ rentalUserId: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleRent}>
                <div>
                    <label>
                        Kiralanacak Kitap Id:
                      <input type="text" value={this.props.rentalBookId} onChange={this.handleBookChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Kiralanacak User Id:
                      <input type="text" value={this.props.rentalUserId} onChange={this.handleUserChange} />
                    </label>
                </div>
                <input type="submit" value="Kirala" />
            </form>
        )
    }
}

export default Rent;