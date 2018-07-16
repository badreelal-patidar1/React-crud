import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css'
import { search, deleteStudent } from '../../actions/studentAction';
import StudentForm from './StudentForm';



//College class start

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {}

        };
    }
    componentWillMount() {
        this.props.search();
    }

    delete(id) {
        this.props.deleteStudent(id, () => {
            this.props.search();
        });
    }
    handleUpdate(val) {
        this.setState({ value: val });
    }
    render() {
        const { students } = this.props
        return (
            <div>
                <button className="btn btn-primary" data-target="#update" data-toggle="modal"> Add<i className="fas fa-plus-circle"></i></button>
                {!students.length ? <div id="alert" className="alert alert-info">Student not found</div> : null}
                <div className="row">
                    <div className="col-md-12 table-responsive-md">
                        <table className="table table-sm table-bordered table-hover ">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>COLLEGE_ID</th>
                                    <th>COLLEGE_NAME</th>
                                    <th>FIRST_NAME</th>
                                    <th>LAST_NAME</th>
                                    <th>DATE_OF_BIRTH</th>
                                    <th>MOBILE_NO</th>
                                    <th>EMAIL</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.length > 0 && this.props.students.map((student, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{student.collegeId}</td>
                                        <td>{student.collegeName}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.dob}</td>
                                        <td>{student.mobileNo}</td>
                                        <td>{student.email}</td>
                                        <td>
                                            <button className="btn btn-success" data-target="#update" data-toggle="modal" onClick={this.handleUpdate.bind(this, student)}><i className="fas fa-edit"></i></button>
                                            <button className="btn btn-danger" onClick={this.delete.bind(this, student.id)}><i className="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div id="update" className="modal fade" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 >College Information</h4>
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        <StudentForm student={this.state.value} />
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
        students: state.students,
    })
}

Student = connect(mapStateToProps, { search, deleteStudent })(Student);

export default Student
