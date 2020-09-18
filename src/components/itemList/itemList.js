import React, {Component} from 'react';
import './itemList.css';
import gotServices from '../../services/gotServices';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


export default class ItemList extends Component {
    gotServices = new gotServices();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotServices.getAllCharacters()
        .then((charList) => {
            console.log(charList);
                this.setState({
                    charList,
                    error: false
                })
            })
            .catch(() => {this.onError()});
    };
    onError(){
        this.setState({
            charList: null,
            error: true
        });
    };

    renderItems(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <li 
                    key={id} 
                    className="list-group-item"
                    onClick={ () => this.props.onCharSelected(id)}>
                    {name}
                </li>
            )
        })
    }

    render() {
        const {charList, error} = this.state;
        
        if (!charList) {
            return <Spinner/>
        }
        if (error) {
            return <ErrorMessage/>
        }
        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}