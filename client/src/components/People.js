import React, { Component } from 'react';
import { getPeople } from '../actions/AsyncActions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import Count from './Count';


const Container = styled.div`
display: flex;
justify-content:center;
align-items: flex-start;
flex-direction: row;

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}
tr:nth-child(even) {
    background-color: #dddddd;
}
button{
    width: 100%;
    height: 100%;
    background: none;
    cursor: pointer;
}
`
const allLetters = [];
for (var i = 65; i < 91; i++) {
    allLetters.push({ letter: String.fromCharCode(i), count: 0 });
};

class People extends Component {

    constructor() {
        super()
        this.state = {
            people: [],
            letterFrequency: [],
            clicked: false
        }
    }

    componentDidMount() {
        this.props.getPeople()
            .then((res) => {
                this.setState({ people: res.people })
            })
    }
    handleLetters(email) {

        const chars = email.toUpperCase().match(/[A-Z]/g).sort()

        for (let i = 0; i < allLetters.length; i++) {
            for (let j = 0; j < allLetters.length; j++) {
                if (chars[i] === allLetters[j].letter) {
                    allLetters[j].count++
                }
            }
        }
    }

    render() {
        const { people } = this.state;
        people.map(person => this.handleLetters(person.email_address))
        return (
            <Container>
                <div style={{ margin: 15 }} >
                    <hr />
                    <h1>SalesLoft Employee List</h1>
                    <hr />
                    <table>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Title</th>
                            <th>Note</th>
                        </tr>
                        {
                            people.map((person, i) =>
                                <tr key={person.id} >
                                    <td>{i + 1}</td>
                                    <td>{person.first_name} {person.last_name}</td>
                                    <td>{person.email_address}</td>
                                    <td>{person.title}</td>
                                    <td></td>
                                </tr>
                            )
                        }
                    </table>
                </div>
                <Count allLetters={allLetters} />
            </Container>
        );
    }

}


const mapDispatchToProps = (dispatch) => ({
    getPeople: () => dispatch(getPeople())
});

export default connect(null, mapDispatchToProps)(People);