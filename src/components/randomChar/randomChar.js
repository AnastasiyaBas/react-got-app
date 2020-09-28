import React, {Component} from 'react';
import './randomChar.css';
import gotServices from '../../services/gotServices';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
export default class RandomChar extends Component {

    gotServices = new gotServices();

    state = {
        char : {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updateItem();
        this.timerId = setInterval(this.updateItem, 4000);
    };
    componentWillUnmount() {
        clearInterval(this.timerId);
    };

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    };
    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updateItem = () => {
        const id = Math.floor(Math.random()*140 + 25);
        this.gotServices
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}
 const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
               <li className="list-group-item d-flex justify-content-between">
                   <span className="term">Gender </span>
                   <span>{gender}</span>
               </li>
               <li className="list-group-item d-flex justify-content-between">
                   <span className="term">Born </span>
                   <span>{born}</span>
               </li>
               <li className="list-group-item d-flex justify-content-between">
                   <span className="term">Died </span>
                   <span>{died}</span>
               </li>
               <li className="list-group-item d-flex justify-content-between">
                   <span className="term">Culture </span>
                   <span>{culture}</span>
               </li>
            </ul>
        </>
     )
 }
