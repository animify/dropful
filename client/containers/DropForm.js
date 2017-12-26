import React from 'react';
import moment from 'moment';
import minicons from 'minicons';
import PropTypes from 'prop-types';

class DropForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: this.props.status,
            fileForm: {
                message: '',
                emailTo: '',
                emailFrom: ''
            },
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
        this.setShareType = this.setShareType.bind(this);
        this.isTyping = this.isTyping.bind(this);
    }

    componentDidMount() {
        minicons.swap();
    }

    setShareType(type) {
        this.setState({
            shareType: type
        });
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

    isTyping(event) {
        const field = event.target.name;
        const fileForm = this.state.fileForm;
        fileForm[field] = event.target.value;

        this.setState({
            fileForm,
            errors: {}
        });
    }

    render() {
        const shareLink = 'https://dropful.io/drop/ui2L2HJd';
        const { status, shareType, fileForm } = this.state;
        const shareTypeEmail = (shareType === 'email');

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
                                    <a onClick={(() => this.setShareType('email'))} role="presentation" className={shareTypeEmail ? 'active' : ''}>Email</a>
                                    <a onClick={(() => this.setShareType('link'))} role="presentation" className={shareTypeEmail ? '' : 'active'}>Link</a>
                                </div>
                                {
                                    shareTypeEmail ?
                                        (
                                            <div className="share-type">
                                                <div className="input">
                                                    <input name="emailTo" spellCheck={false} required onChange={this.isTyping} value={fileForm.emailTo} type="text" />
                                                    <span>Email to</span>
                                                </div>
                                                <div className="input">
                                                    <input name="emailFrom" spellCheck={false} required onChange={this.isTyping} value={fileForm.emailFrom} type="text" />
                                                    <span>Your Email</span>
                                                </div>
                                                <div className="input">
                                                    <textarea name="message" spellCheck={false} required onChange={this.isTyping} value={fileForm.message} />
                                                    <span>Message</span>
                                                </div>
                                            </div>
                                        ) :
                                        (
                                            <div className="share-type">
                                                <div className="input">
                                                    <input name="link" spellCheck={false} required type="text" value={shareLink} />
                                                    <span>Your link</span>
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                        <button className="action-section button primary medium" type="submit">{shareTypeEmail ? 'Send Files' : 'Copy Share Link'}</button>
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
