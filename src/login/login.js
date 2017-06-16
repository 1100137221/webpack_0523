
import React, {Component, PropTypes} from 'react';
import '../app.scss'
import {connect} from 'react-redux';
import logout from './logout';


class Login extends Component {

    constructor(props){
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div>
                    {this.props.test}
            </div>
        );
    }
}



//export default connect(null)(login)
export default Login