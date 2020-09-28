import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import './app.css';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import gotServices from '../../services/gotServices';
import {BrowserRouter as Router, Route} from 'react-router-dom'



export default class App extends Component {
    gotServices = new gotServices();

    state = {
        showRandomChar: true,
        error: false
    };

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col>
                                {char}
                                <button type="button" 
                                        className="btn btn-secondary" 
                                        onClick={this.toggleRandomChar}>Toggle random character</button>
                            </Col>
                        </Row>
                        <Route path='/' component={() => <h1 className="subHeader">Welcome to GOT DB</h1>}/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={({match}) => {const {id} = match.params; 
                            return <BooksItem bookId={id}/>}}/>
                    </Container>
                </div>
            </Router>
        );
    }
};
