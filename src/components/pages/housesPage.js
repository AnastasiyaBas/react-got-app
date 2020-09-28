import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails,{Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotServices from '../../services/gotServices';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {
    gotServices = new gotServices();

    state = {
        selectedHouse: null,
        error: false
    }
    
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = <ItemList 
                        onItemSelected={this.onItemSelected}
                        getData={this.gotServices.getAllHouses}
                        renderItem={({name}) => name}/>;
                        
        const itemDetails = (
            <ItemDetails itemId={this.state.selectedHouse} getData={this.gotServices.getHouse}>
                <Field field='region' label='Region' />
                <Field field='words' label='Words' />
                <Field field='titles' label='Titles' />
                <Field field='ancestralWeapons' label='Ancestral Weapons' />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}