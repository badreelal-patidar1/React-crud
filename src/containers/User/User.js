import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css'

import { deleteUser, search } from '../../actions/userAction';
import UserForm from './UserForm';

//College class start

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
            }
        };
    }

    componentWillMount() {
        this.props.search();
    } s

    delete(id) {
        this.props.deleteUser(id, () => {
            this.props.search();
        });
    }
    handleSave(val) {
        this.setState({ value: val });
    }

    render() {
        const { users } = this.props
        return (
            <div>
                <button className="btn btn-primary" data-target="#update" data-toggle="modal"> Add<i className="fas fa-plus-circle"></i></button>
                {!users.length ? <div id="alert" className="alert alert-info">College not found</div> : null}
                <div className="row">
                    <div className="col-md-12 table-responsive-md">
                        <table className="table table-sm table-bordered table-hover ">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>FIRST_NAME</th>
                                    <th>LAST_NAME</th>
                                    <th>LOGIN</th>
                                    <th>PASSWORD</th>
                                    <th>DOB</th>
                                    <th>MOBILE_NO</th>
                                    <th>ROLE_ID </th>
                                    <th>GENDER</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 && this.props.users.map((user, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.login}</td>
                                        <td>{user.password}</td>
                                        <td>{user.dob}</td>
                                        <td>{user.mobileNo}</td>
                                        <td>{user.roleId}</td>
                                        <td>{user.gender}</td>
                                        <td>
                                            <button className="btn btn-success" data-target="#update" data-toggle="modal" onClick={this.handleSave.bind(this, user)}><i className="fas fa-edit"></i></button>
                                            <button className="btn btn-danger" onClick={this.delete.bind(this, user.id)}><i className="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div id="update" className="modal fade" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 >User Information</h4>
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        <UserForm user={this.state.value} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//mapstateToProps
const mapStateToProps = (state) => {
    return ({
        users: state.users,
    })
}

User = connect(mapStateToProps, { search, deleteUser })(User);

export default User
