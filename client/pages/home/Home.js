import React from 'react';
import RandomImage from './../../components/RandomImage';
import DropForm from './../../containers/DropForm';
import Header from './../../components/Header';
import Footer from './../../components/Footer';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'drop'
        };
    }

    render() {
        const { status } = this.state;

        return (
            <div className="zones">
                <div className="imagezone">
                    <RandomImage />
                </div>
                <div className="dropzone">
                    <Header />
                    <DropForm status={status} />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Home;
