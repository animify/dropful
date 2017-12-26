import React from 'react';
import minicons from 'minicons';
import RandomImage from './../../components/RandomImage';
import DropForm from './../../containers/DropForm';
import Header from './../../components/Header';
import Footer from './../../components/Footer';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'loading'
        };

        minicons.setOptions({
            observe: true,
            config: {
                name: 'feedlist-icons',
                props: {
                    stroke: '#5E6578',
                    'stroke-width': 4
                }
            }
        });
        minicons.swap();

        this.discard = this.discard.bind(this);
    }

    discard() {
        this.setState({
            status: 'drop'
        });
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
                    <DropForm status={status} discard={this.discard} />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Home;
