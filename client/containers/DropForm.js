import React from 'react';
import moment from 'moment';
import minicons from 'minicons';
import PropTypes from 'prop-types';

class DropForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: this.props.status,
            shareType: 'email',
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

    componentDidMount() {
        minicons.swap();
    }

    componentWillReceieveProps(state, props) {
        this.setState({
            status: props.status
        });
    }

    filesLoading() {
        const fileView = this.state.files.map(file => (
            <div className="file" key={file.name}>
                <div className="info">
                    <p className="name">
                        {file.name}
                    </p>
                    <small className="size">
                        {file.size}
                    </small>
                </div>
                <div className="status">
                    <div className="circle accepted">
                        <i data-minicon="tick" />
                    </div>
                </div>
            </div>
        ));

        return fileView;
    }

    render() {
        const { status, shareType } = this.state;

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
                        <button className="action-section button primary medium" type="submit">Browse & Upload</button>
                    </section>
                ) : null}

                {status === 'loading' ? (
                    <section className="holder">
                        <div className="action-section files">
                            <div className="files-body">
                                <h2>Your files</h2>
                                { this.filesLoading() }
                                <a className="load-more"><small>+4 more uploads</small></a>
                            </div>
                            <div className="files-body">
                                <h2>Share via</h2>
                                <div className="share-types">
                                    <a className="active">Email</a>
                                    <a>Link</a>
                                </div>
                                <div className="share-type">
                                    <div className="input">
                                        <label htmlFor="to-email">
                                            Email to
                                            <input name="to-email" spellCheck={false} type="text" />
                                        </label>
                                    </div>
                                    <div className="input">
                                        <label htmlFor="your-email">
                                            Your Email
                                            <input name="your-email" spellCheck={false} type="text" />
                                        </label>
                                    </div>
                                    <div className="input">
                                        <label htmlFor="message">
                                            Message
                                            <textarea name="message" spellCheck={false} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="action-section button primary medium" type="submit">{shareType === 'email' ? 'Send Files' : 'Copy Share Link'}</button>
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
