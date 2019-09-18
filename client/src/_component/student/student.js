import React, { Component } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import axios from 'axios';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }

  }
 
  onChangeHandler = event => {

    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })

  }
  onClickHandler = () => {

    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("/api/users/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
  }
  componentDidMount() {
    console.log(this.state.selectedFile);
  }
  render() {
    return <>

      <input type="file" name="file" onChange={this.onChangeHandler} />
      <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

    </>
  }
}




export default Student;