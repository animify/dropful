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
                        <h6>Drop files</h6>
                        <p>Drag & drop files here or click to browse</p>
                        <small>(Up to 1GB)</small>
                    </div>
                </div>
                <div className="action-section sharetype">
                    <div className="sharetype-head">
                        <h6>Email</h6>
                        <p>Share via email</p>
                    </div>
                </div>
                <div className="action-section sharetype">
                    <div className="sharetype-head">
                        <h6>Link</h6>
                        <p>Share with link</p>
                    </div>
                </div>
                <button className="action-section button primary medium" type="submit">Transfer files</button>
            </form>
        );
    }
}

export default DropForm;
