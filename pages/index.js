/*********************************************************************************
*  WEB422 – Assignment 5
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Ulas Cagin Ondev Student ID: 123734220 Date: Nov 15, 2024
*
********************************************************************************/


import { Row, Col, Image, Card } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid
        rounded
        alt="The Metropolitan Museum of Art"
      />
      <Row className="mt-4">
      <Col md={6}>
      <Card>
          <Card.Body>
          The Metropolitan Museum of Art, colloquially referred to as the Met,&nbsp; is an encyclopedic art museum in New York City. By floor area, it is the fourth-largest museum in the world and the largest art museum in the Americas. With 5.36 million visitors in 2023, it is the most-visited museum in the United States and the fifth-most visited art museum in the world.
          </Card.Body>
        </Card>
        </Col>
        <Col md={6}>
        <Card>
          <Card.Body>
          The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum's permanent collection consists of works of art ranging from the ancient Near East and ancient Egypt, through classical antiquity to the contemporary world. It includes paintings, sculptures, and graphic works from many European Old Masters, as well as an extensive collection of American, modern, and contemporary art. The Met also maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and decorative arts and textiles, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries. 
          More on <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia</a>.
          </Card.Body>
        </Card>
          </Col>
      </Row>
    </>
  );
}
