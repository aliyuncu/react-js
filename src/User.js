
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import { Link, useLocation } from 'react-router-dom';


class User extends Component {
    constructor(props) {
        super(props);
        //   this.handleChange = this.handleChange.bind(this);
        //   this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = (event) => {
        this.props.userChangeEvent(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: this.props.newUserName })
        };
        fetch('http://localhost:9101/users/', requestOptions)
            .then(response => response.json())
            .then(this.props.userChangeEvent(""));
    }
    render() {

        var dataColumns = this.props.userColumns;
        var dataRows = this.props.userRows;

        var tableHeaders = (<thead>
            <tr>
                {dataColumns.map(function (column) {
                    return <td key={column.key}> <strong> {column.value}</strong></td>;
                })}
            </tr>
        </thead >);

        var tableBody = dataRows.map(function (row) {
            return (
                <tr>
                    {dataColumns.map(function (column) {
                        return <td key={column.key}>{nvl(row[column.key], 'NaN')}</td>;
                    })}
                </tr>);
        });

        function nvl(value1, value2) {
            if (value1 == null)
                return value2;

            return value1;
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Kullanıcı Adı:
                      <input type="text" value={this.props.newUserName} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Kaydet" />
                </form>

                <table className="table table-bordered table-hover" width="100%" >
                    {tableHeaders}
                    <tbody>{tableBody}</tbody>
                </table>
            </div>
        )
    }


    componentDidUpdate() {
        fetch('http://localhost:9101/users/')
            .then(res => res.json())
            .then((data) => {
                this.props.userDisplay(data);
            })
            .catch(console.log)

    }

    componentDidMount() {
        fetch('http://localhost:9101/users/')
            .then(res => res.json())
            .then((data) => {
                this.props.userDisplay(data);
            })
            .catch(console.log)

    }
}

export default User;

