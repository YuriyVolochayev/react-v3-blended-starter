import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";

export default function App() {

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const onSubmit = async (query: string) => {
    setIsEmpty(false);
    setIsLoading(true); 
    try {
      const data = await getPhotos(query);
      if (!data.length) {
       setIsEmpty(true)
        return;
      }
       setPhotos(data);
    } catch (error) {
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={onSubmit} />
          {photos.length > 0 && <PhotosGallery photos={photos} />}
          {isLoading && <Loader />}
          {isEmpty && <Text textAlign="center">Nothing found...</Text>}
        </Container>
      </Section>
    </>
  );
}
