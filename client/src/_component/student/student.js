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
    return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'500px',flexDirection:'column'}}>

    <input type="file" style={{width:'30%',}} name="file" onChange={this.onChangeHandler} />
    <button type="button" style={{width:'30%',}} class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

  </div>
  }
}




export default Student;