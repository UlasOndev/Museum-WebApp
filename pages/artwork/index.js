import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);
  const [validObjectIDList, setValidObjectIDList] = useState(null);
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  useEffect(() => {
    const fetchValidObjectIDList = async () => {
      const response = await fetch('/data/validObjectIDList.json'); 
      const data = await response.json();
      setValidObjectIDList(data);
    };

    fetchValidObjectIDList();
  }, []);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher);

  useEffect(() => {
    if (data?.objectIDs && validObjectIDList) {
      const filteredResults = validObjectIDList.objectIDs.filter((x) => data.objectIDs.includes(x));

      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1);
    } else {
      setArtworkList(null);
    }
  }, [data, validObjectIDList]);

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (page < artworkList.length) setPage(page + 1);
  };

  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null;

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}
