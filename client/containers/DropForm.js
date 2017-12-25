import React from 'react';
import PropTypes from 'prop-types';
import FileDrop from './../components/FileDrop';

class DropForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: this.props.status
        };
    }

    componentWillReceieveProps(state, props) {
        this.setState({
            status: props.status
        });
    }

    render() {
        const { status } = this.state;

        return (
            <form id="dropform">
                {status === 'drop' ? <FileDrop /> : null}
            </form>
        );
    }
}

DropForm.propTypes = {
    status: PropTypes.string.isRequired
};

export default DropForm;
