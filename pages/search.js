import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store'; 

export default function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); 

  const submitForm = (data) => {
    let queryString = `searchBy=true`;

    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    setSearchHistory((current) => [...current, queryString]); 

    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group className="mb-3" controlId="searchBy">
        <Form.Label>Search By</Form.Label>
        <Form.Select {...register('searchBy')}>
          <option value="true">Tags</option>
          <option value="false">Title</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="geoLocation">
        <Form.Label>Geo Location</Form.Label>
        <Form.Control type="text" placeholder="e.g., France" {...register('geoLocation')} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="medium">
        <Form.Label>Medium</Form.Label>
        <Form.Control type="text" placeholder="e.g., Paintings" {...register('medium')} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="isOnView">
        <Form.Check type="checkbox" label="Currently On View" {...register('isOnView')} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="isHighlight">
        <Form.Check type="checkbox" label="Highlighted" {...register('isHighlight')} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="q">
        <Form.Label>Search Query</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., Flowers"
          {...register('q', { required: true })}
          className={errors.q ? 'is-invalid' : ''}
        />
        {errors.q && <Form.Text className="text-danger">This field is required.</Form.Text>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
}
