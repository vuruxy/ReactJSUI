import React from 'react';
import Child from './child';

export default class Parent extends React.Component {
    constructor() {
        super();
        this.state = {
            list: []
        };
        this.nameRef = React.createRef();
    }

    callApi = (url, method, params, callBack) => {
        var options = {
            ...(method == 'GET' && {}),
            ...(method == 'POST' && {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: params
            }),
            ...(method == 'PUT' && {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: params
            }),
            ...(method == 'DELETE' && {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }),
        };

        fetch(url, options).then(response => response.text()).then(text => callBack(text));
    }

    onParentNew = () => {
        var item = {
            name: this.nameRef.current.value,
            data: 0,
        }

        this.callApi('https://counters-dot-sse-2021-jk.appspot.com/api/' + item.name, 'GET', null, (response) => {
            item.data = parseInt(response);
            var list = this.state.list;
            list.push(item);
            this.setState({
                list: list
            });
        });
    }
    onParentSet = (item) => {
        this.callApi('https://counters-dot-sse-2021-jk.appspot.com/api/' + item.name, 'PUT', item.data, (response) => {
            item.data = parseInt(response);
            var list = this.state.list;

            list.forEach(l => {
                if (l.name == item.name) {
                    l = item;
                }
            });
            this.setState({
                list: list
            });
        });
    }
    onParentAdd = (item) => {
        console.log(item);
        this.callApi('https://counters-dot-sse-2021-jk.appspot.com/api/' + item.name, 'POST', item.data, (response) => {
            item.data = parseInt(response);
            var list = this.state.list;

            list.forEach(l => {
                if (l.name == item.name) {
                    l = item;
                }
            });
            this.setState({
                list: list
            });
        });
    }
    onParentDelete = (item) => {
        this.callApi('https://counters-dot-sse-2021-jk.appspot.com/api/' + item.name, 'DELETE', null, (response) => {
            var list = this.state.list;

            list = list.filter(l => l.name !== item.name);
            this.setState({
                list: list
            });
        });
    }
    componentDidMount() {
        window.setInterval(() => {
            this.state.list.forEach(item => {
                this.callApi('https://counters-dot-sse-2021-jk.appspot.com/api/' + item.name, 'GET', null, (response) => {
                    item.data = parseInt(response);
                    var list = this.state.list;
                    list.forEach(l => {
                        if (l.name == item.name) {
                            l = item;
                        }
                    });
                    this.setState({
                        list: list
                    });
                });
            })
        }, 10000);
    }

    render() {
        return (
            <React.Fragment>
                <h1>Sign-Off 1: React.Js</h1>
                <h2>Add Counter</h2>
                <input type="text" ref={this.nameRef} />
                <button onClick={this.onParentNew}>Add</button>
                {this.state.list.map(l => (<Child key={l.name} l={l} onParentAdd={this.onParentAdd} onParentSet={this.onParentSet} onParentDelete={this.onParentDelete} />))}
            </React.Fragment>
        );
    }

}
