
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import { Link, useLocation } from 'react-router-dom';


class Book extends Component {
    constructor(props) {
        super(props);
        //   this.handleChange = this.handleChange.bind(this);
        //   this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = (event) => {
        this.props.bookChangeEvent(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookName: this.props.newBookName, userId: '' })
        };
        fetch('http://localhost:9001/books/', requestOptions)
            .then(response => response.json())
            .then(this.props.bookChangeEvent(""));
    }
    render() {

        var dataColumns = this.props.bookColumns;
        var dataRows = this.props.bookRows;

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
                        Kitap Adı:
                      <input type="text" value={this.props.newBookName} onChange={this.handleChange} />
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
        fetch('http://localhost:9001/books/')
            .then(res => res.json())
            .then((data) => {
                this.props.bookDisplay(data);
            })
            .catch(console.log)

    }

    componentDidMount() {
        fetch('http://localhost:9001/books/')
            .then(res => res.json())
            .then((data) => {
                this.props.bookDisplay(data);
            })
            .catch(console.log)

    }
}

export default Book;

