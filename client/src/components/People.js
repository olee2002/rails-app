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

class People extends Component {

    constructor() {
        super()
        this.state = {
            people: [],
            uniqueLetters: [],
            clicked: false
        }
    }

    componentDidMount() {
        this.props.getPeople()
            .then((res) => {
                this.setState({ people: res.people })
            })
    }
    handleClick(email) {

        const chars = email.toLowerCase().match(/[a-z]/g).sort()
        const arr = []
        for (let i = 0; i < chars.length; i++) {
            if (!arr.includes(chars[i])) arr.push(chars[i])
        }
        const uniqueLetters = arr.map(e => {
            return { letter: e, count: 0 }
        })
        for (let i = 0; i < chars.length; i++) {
            for (let j = 0; j < uniqueLetters.length; j++) {
                if (chars[i] === uniqueLetters[j].letter) {
                    uniqueLetters[j].count++
                }
            }
        }

        this.setState({ clicked: true, uniqueLetters })
    }

    render() {
        const { people, clicked, uniqueLetters } = this.state;

        return (
            <Container>
                <div style={{ margin: 15 }} >
                    <hr />
                    <h1>SalesLoft Employee List</h1>
                    <hr />
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Title</th>
                            <th>Note</th>
                        </tr>
                        {
                            people.map(person =>
                                <tr key={person.id} >
                                    <td>{person.first_name} {person.last_name}</td>
                                    <td>{person.email_address}</td>
                                    <td>{person.title}</td>
                                    <td><ReactTooltip />
                                        <button onClick={() => this.handleClick(person.email_address)}>Email Char.Count</button></td>
                                </tr>
                            )
                        }
                    </table>
                </div>
                {clicked ? <Count uniqueLetters={uniqueLetters} /> : null}

            </Container>
        );
    }

}


const mapDispatchToProps = (dispatch) => ({
    getPeople: () => dispatch(getPeople())
});

export default connect(null, mapDispatchToProps)(People);