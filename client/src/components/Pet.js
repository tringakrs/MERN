import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaThumbsUp } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';

const Pet = (props) => {

    const [petList, setPetList] = useState([]);
    const { id } = useParams();
    const [pet, setPet] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then((response) => {
                console.log(response.data);
                setPet(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id])

    const getPet = () => {
        axios.get("http://localhost:8000/api/pet/" + props._id)
        .then(response => {
            setPet(response.data)
            console.log(response)
        })
        .catch(err => console.log("Error:", err))
    }

    useEffect( () => {
        getPet();

    }, [props._id])
    const adoptPetHandler = (id) => {
        axios.delete(`http://localhost:8000/api/pets/${id}`)
            .then((response) => {
                console.log(response.data);
                setPetList(petList.filter((pet) => pet._id !== id));
                navigate("/pets")
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const likePet = _id => {
        axios.put("http://localhost:8000/api/like/" + _id, {
        })
            .then(res => {
                console.log(res)
                getPet();
            })
            .catch(err => console.log(err))
            document.getElementById('button').setAttribute("disabled", "disabled");
    }

    return (
        <Container>
            <Row className="my-3">
                <Col className="text-start">
                    <h1>Pet Shelter</h1>
                </Col>
                <Col className="text-end">
                    <Link to={"/pets"}>back to home</Link>
                </Col>
            </Row>
            <Row className="my-3 py-2
            ">
                <Col className="text-start">
                    <h3 className="my-2">Details about: {pet.petName}</h3>
                </Col>
                <Col className="text-end">
                <Button type="button" className="btn btn-danger my-2" onClick={(e) => adoptPetHandler(id)}> <FaHome/>Adopt {pet.petName}</Button>
                </Col>
            </Row>
            <Row className="border">
                <Row className="text-start">
                    <Col lg={4}>
                        <p className="fw-bold">Pet Type:</p>
                    </Col>
                    <Col lg={4}>
                        <p>{ pet.petType }</p>
                    </Col>
                </Row>
                <Row className="text-start">
                    <Col lg={4}>
                        <p className="fw-bold">Pet Description:</p>
                    </Col>
                    <Col lg={4}>
                        <p>{ pet.petDescription }</p>
                    </Col>
                </Row>
                <Row className="text-start">
                    <Col lg={4}>
                        <p className="fw-bold">Skills:</p>
                    </Col>
                    <Col lg={4}>
                        <p>{ pet.petSkillOne }</p>
                        <p> { pet.petSkillTwo }</p>
                        <p> { pet.petSkillThree }</p>
                    </Col>
                </Row>
                <div className=" d-flex justify-content-center mb-3">

                <button  className="btn-success w-20 text-center mx-5" onClick={ e => {likePet(pet._id)}} id="button"><FaThumbsUp />Like {pet.petName}</button>

                <div className='ml-3'>0 like(s)</div>


                </div>

            </Row>

            
        </Container>
    )
}

export default Pet;
