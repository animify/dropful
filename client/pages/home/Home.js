import React from 'react';
import RandomImage from './../../components/RandomImage';
import DropForm from './../../containers/DropForm';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        };
    }

    render() {
        return (
            <div className="zones">
                <div className="imagezone">
                    <RandomImage />
                </div>
                <div className="dropzone">
                    <DropForm />
                </div>
            </div>
        );
    }
}

export default Home;
