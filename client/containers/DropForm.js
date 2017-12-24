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
            <form id="dropform">
                <div className="action-section droparea">
                    <div className="droparea-body">
                        <h2>Drop your files</h2>
                        <p>Drag & drop your files here or click to browse. Up to 1GB.</p>
                    </div>
                </div>
                <button className="action-section button primary medium" type="submit">Transfer & Share</button>
            </form>
        );
    }
}

export default DropForm;
