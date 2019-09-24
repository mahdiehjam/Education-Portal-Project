import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerCourseUser } from '../../_actions/index';
import classnames from 'classnames';
import Axios from 'axios';
import { MDBBtn } from "mdbreact";


class RegisterCourseUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

            student: '',
            course: '',
            students: [],
            courses:[],
            errors: {}
        }
        this.result = 0;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        // const { courses } = this.state;
        const CourseUser = {
            student: this.state.student,
            course: this.state.course
        }
        console.log(CourseUser);
        //this.setState({ courses: [...courses, course] });
        this.props.registerCourseUser(CourseUser, this.props.history);
    }

    EditeCourse = (id) => {
        Axios.put('/api/edit' + id).then(response => { })
    }

    deleteCourse = () => {

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentWillMount() {
        Axios.get('/api/users/courses-user/get-students').then(res => {
            this.setState({ students: [...res.data] })

            Axios.get('/api/users/courses-user/get-courses').then(res => {
                this.setState({ courses: [...res.data] })
            }).catch(err => console.log('axios for getting courses has err:' + err))

        }).catch(err => console.log('axios for getting students has err:' + err))
    }

    componentDidMount() {
        //this.result = this.props.resStatus;
        //console.log('result:' + this.result)
    }

    createCourseAdded = () => {
        //const { courses } = this.state;
        //const { resStatus } = this.props.courseStatus;
        //this.result = (resStatus == 'Ok') ? true : false;
        //console.log('resstause: '+ resStatus)
        //console.log('result: '+this.result);
        /* return <>
            {!this.result || <table>
                <tbody>
                    <tr>
                        <th>name</th>
                        <th>teacher</th>
                        <th>status</th>
                    </tr>

                    {courses.map(course => {
                        return <tr key={course.id} id={course.id}>
                            <td>{course.name}</td>
                            <td>{course.teacher}</td>
                            <td>{course.status}</td>
                            <td><MDBBtn onClick={this.EditeCourse(course.id)} color='info'>Edite</MDBBtn>
                                <MDBBtn onClick={this.deleteCourse} color='danger'>delete</MDBBtn></td>
                        </tr>
                    })}
                </tbody>
            </table>}
        </> */
    }


    render() {
        const { errors, students,courses } = this.state;
        console.log(students);
        console.log(courses);
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                <h2 style={{ marginBottom: '40px' }}>Registration</h2>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">

                        <select name="student" id="student" className="form-control" onChange={this.handleInputChange}>

                            <option value='notdefine'>choose student</option>
                            {students.map(student => {
                                return <option value={student.id} key={student.id}>{student.name}</option>
                            })}

                        </select>
                        {errors.role && (<div className="invalid-feedback">{errors.role}</div>)}
                    </div>

                    <div className="form-group">

                        <select name="course" id="course" className="form-control" onChange={this.handleInputChange}>

                            <option value='notdefine'>choose course</option>
                            {courses.map(course => {
                                return <option value={course.id} key={course.id}>{course.name}</option>
                            })}

                        </select>
                        {errors.role && (<div className="invalid-feedback">{errors.role}</div>)}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register Course
                    </button>
                    </div>
                </form>

                <div>
                   {/*  {this.createCourseAdded()} */}
                </div>
            </div>
        )
    }
}

RegisterCourseUser.propTypes = {
    registerCourseUser: PropTypes.func.isRequired,
    // resStatus: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    courseStatus: state.courseStatus
});

export default connect(mapStateToProps, { registerCourseUser })(withRouter(registerCourseUser))