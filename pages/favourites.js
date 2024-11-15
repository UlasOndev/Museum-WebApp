import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { Card, Row, Col } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard'; 

const Favourites = () => {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <div>
      <h1>Favourites</h1>
      {favouritesList.length === 0 ? (
        <Card>
          <Card.Body>
            Nothing here. Try adding some new artwork to the list.
            </Card.Body>
            </Card>
      ) : (
        <Row>
          {favouritesList.map((objectID) => (
            <Col md={4} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Favourites;
