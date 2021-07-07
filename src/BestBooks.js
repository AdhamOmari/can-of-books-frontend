import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userEmail: '',
      BookList: [],
      bookName:''
    }
  }
  getInput = (e) => {
    this.setState({
      userEmail: e.target.value,

    })
    console.log(this.state.data)
  }


  requestData = (e) => {
    e.preventDefault()
    // let userEmail = this.state.data

    let axiosArray = `http://localhost:8000/book?email=${this.state.userEmail}`
    axios.get(axiosArray).then(response => {
      console.log('new one', response.data.email);
      this.setState({
        BookList: response.data.arryBooks

      })
    }).catch(err => { console.log(err) })
    console.log(typeof (axiosArray));
    console.log('booklist', this.state.BookList);
  }


  createBook = (e) => {
    e.preventDefault()
    const reqBook = {
      bookName: this.state.BookList.name,
      userEmail: this.state.userEmail
    }
    axios.post(`http://localhost:8000/creat-book?`, reqBook).then(response => {
      this.setState({
        BookList: [response.data.bookName]
      })
    }).catch(error =>
      alert(error.massge))
  }

//   getupdatedBookName=(e)=>{
//     this.setState({
//       BookList:e.target.event
//     })
//   }
updateBookName=(e,  )=>{
    const reqBody ={
      userEmail:this.state.userEmail,
      bookName:this.state.bookName.name

    }
    console.log('add book',typeof(this.state.bookName))
  }
  render() {
    return (
      <Jumbotron>
        <div>
          <h1>Best</h1>
          <form>
            <input type="text" onChange={(e) => { this.getInput(e) }} />
            <button onClick={(e) => this.requestData(e)}>submit</button>
            <br>
            </br>

            <input type="text" onChange={(e) => { this.updateBookName(e) }} />
            <button onClick={(e) => this.createBook(e)}>addBook</button>
          </form>
          <ol>

            {this.state.BookList.map(book => {

              return <li>{book.name}</li>
            })}

          </ol>

        </div>
      </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;
