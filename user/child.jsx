import React from 'react';

export default class Child extends React.Component {

    constructor(props) {
        super(props);

        this.valueRef = React.createRef();
    }

    onAdd = () => {
        console.log(this.props.l)
        var newl = {
            ...this.props.l,
            data: parseInt(this.valueRef.current.value)
        };
        console.log(newl)
        this.props.onParentAdd(newl);
    }

    onSet = () => {
        var l =this.props.l;
        l.data = parseInt(this.valueRef.current.value);
        this.props.onParentSet(l);
    }

    onDelete = () => {
        this.props.onParentDelete(this.props.l);
    }

    render() {
        return (
            <div>
                Counter {this.props.l.name} : {this.props.l.data} 
                <input type="number" ref={this.valueRef} />
                <input type="button" onClick={this.onAdd} value="add" />
                <input type="button" onClick={this.onSet} value="set" />
                <input type="button" onClick={this.onDelete} value="delete" />
            </div>
        );
    }

}