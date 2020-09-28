import React, {Component} from 'react';
import './itemDetails.css';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export {
    Field
};
export default class ItemDetails extends Component {
    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }
    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    onItemDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        });
    };

    
    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then((item) => {
                this.onItemDetailsLoaded(item)
            })
    }

    render() {
        const {item, error, loading} = this.state;
        if (!item) {
            return <span className="select-error">Please select a character</span>;
        }
        if (!item && error) {
            return <ErrorMessage/>
        }
        if (loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        const {name} = item;
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}