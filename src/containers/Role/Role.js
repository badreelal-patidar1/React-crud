import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css'
import { deleteRole, search } from '../../actions/roleAction';
import RoleForm from './RoleForm';


//Role class start
class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
            }
        };
    }
    componentWillMount() {
        this.props.search();
    }

    delete(id) {
        this.props.deleteRole(id, () => {
            this.props.search();
        });
    }

    handleSave(val) {
        this.setState({ value: val });
    }
    render() {
        const { roles } = this.props
        return (
            <div>
                <button className="btn btn-primary" data-target="#update" data-toggle="modal"> Add<i className="fas fa-plus-circle"></i></button>
                {!roles.length ? <div id="alert" className="alert alert-info">Role not found</div> : null}
                <div className="row">
                    <div className="col-md-12 table-responsive-md">
                        <table className="table table-sm table-bordered table-hover ">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.length > 0 && this.props.roles.map((role, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{role.name}</td>
                                        <td>{role.description}</td>
                                        <td>
                                            <button className="btn btn-success" data-target="#update" data-toggle="modal" onClick={this.handleSave.bind(this, role)}><i className="fas fa-edit"></i></button>
                                            <button className="btn btn-danger" onClick={this.delete.bind(this, role.id)}><i className="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div id="update" className="modal fade" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 >Role Information</h4>
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        <RoleForm role={this.state.value} />
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
        roles: state.role,
    })
}

Role = connect(mapStateToProps, { search, deleteRole })(Role);

export default Role
