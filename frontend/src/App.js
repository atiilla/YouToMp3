import React from 'react'
//import { useState } from 'react'
import { Jumbotron, Button, Row, Col, Form } from 'react-bootstrap'
import './style.css'
export default function App() {
//  let downloadlink = document.querySelector("#root > div > div > p")
 // const [state, setState] = useState();
  
  function clickHandlerSingle(e) {
    e.preventDefault();
    let linkValue = document.querySelector("#singleyoutubelink")
    const downloadLink = document.getElementById('downloadLink')

    fetch('http://localhost:3000/get?youtubeid=' + linkValue.value, {
      method: 'post'
    }).then(res => res.text())
      .then(data => {
        console.log(data.slice(29))
    //    setState(data)
  
        downloadLink.setAttribute('href', `http://localhost:3000/files/${data.slice(29)}`)
        downloadLink.innerText = `Download ${data.slice(29)}`
      })
  }

  const c = t=>document.createElement(t)


  function bulkDownload(e) {
    e.preventDefault();
    let downLoadLink = document.querySelector("#root > div > div > p > p");
    let linkValue = document.querySelector("#bulkyoutube").value.split("\n")
    linkValue.forEach(link=>{
      
      fetch('http://localhost:3000/get?youtubeid=' + link, {
      method: 'post'
    }).then(res => res.text())
      .then(data => {
        console.log(data.slice(29))
    //    setState(data)
        console.log(data)
        // downloadLink.setAttribute('href', `http://localhost:3000/files/${data.slice(29)}`)
        // downloadLink.innerText = `Download ${data.slice(29)}`
        downLoadLink.innerHTML+=`<a href='http://localhost:3000/files/${data.slice(29)}' className="d-block text-warning" id="downloadLink">Download ${data.slice(29)}</a><br>`
      })
      
    })

  }


  return (
    <div>
      <Jumbotron className="bg-secondary text-center">
        <h1 className="bg-primary text-white p-3 mb-5">Youtube Downloader</h1>
        <Row>
          <Col md={6}>
            <Form.Group controlId="singleyoutubelink ">
              <Form.Label className="text-white lead">Single Youtube Link</Form.Label>
              <Form.Control type="text" placeholder="Youtube Link" />
            </Form.Group>
            <Button variant="dark" className="d-block" onClick={clickHandlerSingle}>download single</Button>
          </Col>
          <Col md={6}>
            <Form.Group controlId="bulkyoutube">
              <Form.Label className="lead text-white">Bulk youtube link downloader</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="dark" className="d-block" onClick={bulkDownload}>bulk download</Button>
          </Col>
        </Row>

        <hr className="bg-white" />

        <hr className="bg-white" />
        <p className="lead text-warning font-weight-bold bg-dark m-auto p-5">Click link to download youtube video as mp3 file.

          <p className="lead downloadmp3">
            <a href='#' className="d-block text-warning" id="downloadLink">Download :</a>
          </p>
        </p>
      </Jumbotron>
    </div>
  )
}
