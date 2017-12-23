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
                <div>
                    <label>Add files</label>
                </div>
            </form>
        );
    }
}

export default DropForm;
