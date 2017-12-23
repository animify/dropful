import React from 'react';

class DropForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        };
    }

    render() {
        return (
            <form>
                <div className="sharetype">
                    <div className="sharetype-head">
                        <h6>Email</h6>
                        <p>Share via email</p>
                    </div>
                </div>
            </form>
        );
    }
}

export default DropForm;
