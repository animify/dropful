import React from 'react';
import RandomImage from './../../components/RandomImage';
import DropForm from './../../containers/DropForm';
import Footer from './../../components/Footer';

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
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Home;
