import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

class DropForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: this.props.status,
            files: [{
                name: 'file.styl',
                size: '4.12 KB',
                date: moment().format()
            },
            {
                name: 'Dropful_v2.png',
                size: '6.92 MB',
                date: moment().format()
            }]
        };

        this.filesLoading = this.filesLoading.bind(this);
    }

    componentWillReceieveProps(state, props) {
        this.setState({
            status: props.status
        });
    }

    filesLoading() {
        const fileView = this.state.files.map(file => (
            <div className="file" key={file.name}>
                <p className="name">
                    {file.name}
                </p>
                <small className="size">
                    {file.size}
                </small>
            </div>
        ));

        return fileView;
    }

    render() {
        const { status } = this.state;

        return (
            <form id="dropform">

                {status === 'drop' ? (
                    <section className="holder">
                        <div className="action-section droparea">
                            <div className="droparea-body">
                                <h2>Drop your files</h2>
                                <h5>Drag & drop your files here or click to browse. Up to 1GB.</h5>
                            </div>
                        </div>
                        <button className="action-section button primary medium" type="submit">Transfer & Share</button>
                    </section>
                ) : null}

                {status === 'loading' ? (
                    <section className="holder">
                        <div className="action-section files">
                            <div className="files-body">
                                <h2>Your files</h2>
                                { this.filesLoading() }
                            </div>
                        </div>
                        <button className="action-section button primary medium" type="submit">EEEEEE</button>
                    </section>
                ) : null}

            </form>
        );
    }
}

DropForm.propTypes = {
    status: PropTypes.string.isRequired
};

export default DropForm;
