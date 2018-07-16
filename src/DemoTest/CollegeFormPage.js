import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveGame, fetchGame, updateGame } from '../action';
import CollegeForm from './CollegeForm';
import { createCollege } from '../actions/collegeActions';

class CollegeFormPage extends React.Component {

    state = {
        redirect: false
    }

    // componentDidMount = () => {
    //     const { match } = this.props;
    //     if (match.params._id) {
    //         this.props.fetchGame(match.params._id);
    //     }
    // }

    saveGame = ({ id, name, address, state, city, phoneNo }) => {
        console.log({ id, name, address, state, city, phoneNo })
        if (id) {
            console.log(id)
            return this.props.createCollege({ id, name, address, state, city, phoneNo }).then(
                () => { this.setState({ redirect: true }) },
            );
        } else {
            return this.props.createCollege({ name, address, state, city, phoneNo }).then(
                () => { this.setState({ redirect: true }) },
            );
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.redirect ?
                        <Redirect to="/colleges" /> :
                    <CollegeForm
                        game={this.props.college}
                        saveGame={this.saveGame}
                    />
                }
            </div>
        );
    }
}

// function mapStateToProps(state, props) {
//     const { match } = props;
//     if (match.params._id) {
//         return {
//             game: state.games[0]
//         }
//     }

//     return { game: null };
// }

export default connect(null, { saveGame, fetchGame, updateGame, createCollege })(CollegeFormPage);
