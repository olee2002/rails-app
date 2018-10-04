import React, { Component } from 'react';
import { getPeople } from '../actions/AsyncActions';
import { connect } from 'react-redux';


class People extends Component {

    constructor() {
        super()
        this.state = {
            people: []
        }
    }

    componentDidMount() {
        this.props.getPeople()
            .then((res) => {
                this.setState({ people: res.people })
            })
    }



    render() {
        const { people } = this.state;
        return (
            <div style={{ marginLeft: 15 }} >
                <hr />
                <h2>SalesLoft Employee List</h2>
                <hr />
                {
                    people.map(person =>
                        <div key={person} >
                            <div>Name: {person.first_name} {person.last_name}</div>
                            <div>Email:{person.email_address}</div>
                            <div>Title:{person.title}</div>
                            <hr />
                        </div>
                    )
                }
            </div>
        );
    }

}


const mapDispatchToProps = (dispatch) => ({
    getPeople: () => dispatch(getPeople())
});

export default connect(null, mapDispatchToProps)(People);