import { useState,useEffect  } from "react";
import { Container, FormGroup,ListGroup } from "react-bootstrap";
import { Col, Row, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Accordion from 'react-bootstrap/Accordion';
import {useNavigate} from 'react-router-dom';
import { AddBlogItems, checkToken, GetBlogItemsByUserId, GetLoggedInUser, LoggedInData } from "../Services/DataService";
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = ({ isDarkMode, onLogin }) => {
  const [show, setShow] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [publisherName, setPublisherName] = useState("");

  const [edit, setEdit] = useState(false);

  const [blogId, setBlogId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  //Dummy data useState
  const [blogItems, setBlogItems] = useState([]);
  let navigate = useNavigate();
  
  const loadUserData = async () => {
    let userInfo = LoggedInData();
    onLogin(userInfo);
    setUserId(userInfo.userId);
    setPublisherName(userInfo.publisherName);
    console.log("User info:", userInfo);
    setTimeout(async () => {

      let userBlogItems = await GetBlogItemsByUserId(userInfo.userId)
      setBlogItems(userBlogItems);
    
      setIsLoading(false);
      console.log("Loaded blog items: ", userBlogItems);
    },1000)

}
  const handleSaveWithPublish = async () =>
    {
    let {publisherName, userId}  = LoggedInData();
    const published = {
      Id:0,
      UserId: userId,
      PublisherName:publisherName,
      Tag: blogTags,
      Title:blogTitle,
      Image:blogImage,
      Description:blogDescription,
      Date: new Date(),
      Category: blogCategory,
      IsPublished: textContent === "Save" ? false: true,
      IsDeleted: false,
    }
    console.log(published);
    handleClose();
    let result = await AddBlogItems(published);
    if (result){
      console.log("result is true");
      let userBlogItems = await GetBlogItemsByUserId(userId);
      console.log("displaying userBlogItems: ");
      console.log(userBlogItems);
      console.log("setting setBlogItems(userBlogItems)")
      setBlogItems(userBlogItems);
      console.log("Data in blogItems: ");
      console.log(blogItems);
    }
  }

  const handleSaveWithUnpublish = async () =>
  {
    let {publisherName, userId}  = LoggedInData();
    const notPublished = {
      Id:0,
      UserId: userId,
      PublisherName:publisherName,
      Tag: blogTags,
      Title:blogTitle,
      Image:blogImage,
      Description:blogDescription,
      Date: new Date(),
      Category: blogCategory,
      IsPublished: textContent === "Save" ? false: true,
      IsDeleted: false,
    }
    console.log(notPublished);
    handleClose();
    AddBlogItems(notPublished);
    let result = await AddBlogItems(published);
    if (result){
      console.log("result is true");
      let userBlogItems = await GetBlogItemsByUserId(userId);
      console.log("displaying blogItems: ");
      console.log(userBlogItems);
      setBlogItems(userBlogItems);

    }
  }


  const handleClose = () => setShow(false);
  const handleShow = (e, {id, blogId, publisherName, userId, title, description, category, tag, image, isDeleted, isPublished}) => {
    
    setShow(true)
    if(e.target.textContent === 'Add Blog Item')
        {
            setEdit(false);
            console.log(e.target.textContent, edit);

        }else{
            setEdit(true);
        }
        setBlogId(id);
        setBlogTitle(title);
        setUserId(userId);
        setPublisherName(publisherName);
        setBlogDescription(description);
        setBlogCategory(category);
        setBlogTags(tag);
        setBlogImage(image);
        setIsDeleted(isDeleted);
        setIsPublished(isPublished);
        console.log(e.target.textContent, edit);
};

const handleTitle = (e) => {
    setBlogTitle(e.target.value)
}

const handleDescription = (e) => {
    setBlogDescription(e.target.value)
}
const handleTags = (e) => {
    setBlogTags(e.target.value)
}
const handleCategory = (e) => {
    setBlogCategory(e.target.value)
}

const handleDelete = () => {

}

// const handleImage = (e) => {
//     setBlogImage(e.target.value)
// }
//useEffect is the first thing that fires onload.
  useEffect(() => {
    if(!checkToken())
    {
      navigate('/Login');
    } else {
      loadUserData();
    }
  }, [])

  const handleImage = async (e) =>
  {
    let file = e.target.files[0];
     const reader = new FileReader();
     reader.onloadend = () => {
      console.log(reader.result);
     }
     reader.readAsDataURL(file);
  }
  

  return (
    <>
      <Container
        className={isDarkMode ? 'bg-dark text-light p-5': 'bg-light'}
        fluid
      >
        <Button variant="outline-primary m-2" onClick={(e) => handleShow(e, {id: "", publisherName: "", userId: "",title: "", description: "", category: "", tag: "", image: "", isDeleted: false, isPublished: false})}>
       Add Blog Item
        </Button>


        <Modal
          data-bs-theme={isDarkMode ? "dark" : "light"}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit " : "Add " }Blog Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={blogTitle} onChange={handleTitle} />
                </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" placeholder="Enter Description" value={blogDescription} onChange={handleDescription} />
                </Form.Group>
                <FormGroup  controlId="Category">
                <Form.Label>Title</Form.Label>
                    <Form.Select value={blogCategory} onChange={handleCategory}>
                        <option>Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Fitness" >Fitness</option>
                        <option value="Tech">Tech</option>

                    </Form.Select>
                </FormGroup>

              <Form.Group className="mb-3" controlId="Tags">
              <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Enter Tag" value={blogTags} onChange={handleTags} />
              </Form.Group>
              <FormGroup className="mb-3" controlId="Image">
                <Form.Label>Pick an Image</Form.Label >
                <Form.Control type="file" placeholder="Select an Image from file" accept="image/png,image/jpg" onChange={handleImage} />

              </FormGroup>
             
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleSaveWithUnpublish}>
            {edit ? "  Save Changes" : "Save"}
            </Button>
            <Button variant="outline-primary" onClick={handleSaveWithPublish}>
              {edit ? "  Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>
    {/* Acordion below */}
    {isLoading ? <><Spinner animation="grow" variant="info" /><h2>....Loading</h2> </> :
    blogItems.length == 0 ? <><h2 className="text-center">No Blog Items to Show.</h2> </>  : 
    <Accordion defaultActiveKey={['0','1']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Published</Accordion.Header>
        <Accordion.Body>
         {
           
           blogItems.map((item,i) => (item.isPublished && !item.IsDeleted) && <ListGroup key={i}>{item.title}

                <Col className="d-flex justify-content-end mx-2">
                    <Button variant="outline-danger mx-2">Delete</Button>
                    <Button variant="outline-info mx-2" onClick={(e) => handleShow(e,item)}>Edit</Button>
                    <Button variant="outline-primary mx-2">Unpublish</Button>
                </Col>
            
             </ListGroup>)
         }
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Unpublished</Accordion.Header>
        <Accordion.Body>
        {
          blogItems.map((item,i )=> (!item.isPublished && !item.IsDeleted) && <ListGroup key={i}>{item.title}
            
            <Col className="d-flex justify-content-end mx-2">
                    <Button variant="outline-danger mx-2">Delete</Button>
                    <Button variant="outline-info mx-2" onClick={(e) => handleShow(e,item)}>Edit</Button>
                    <Button variant="outline-primary mx-2">Publish</Button>
                </Col>
            </ListGroup>)
         }
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    }
     
      </Container>
    </>
  );
};

export default Dashboard;