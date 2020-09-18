import React, {Component} from 'react';
import './charDetails.css';
import gotServices from '../../services/gotServices';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';


export default class CharDetails extends Component {
    gotServices = new gotServices();
    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }
    onError(){
        this.setState({
            char: null,
            error: true
        });
    };
    onCharDetailsLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    };

    updateChar() {
        const {charId} = this.props;
        if(!charId) {
            return;
        }
        this.setState({
            loading: true
        });
        this.gotServices.getCharacter(charId)
            .then(this.onCharDetailsLoaded)
            .catch( () => this.onError())
    }

    render() {
        const {char, error, loading} = this.state;
        if (!char) {
            return <span className="select-error">Please select a character</span>;
        }
        if (!char && error) {
            return <ErrorMessage/>
        }
        if (loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        
        const {name, gender, born, died, culture} = this.state.char;
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}