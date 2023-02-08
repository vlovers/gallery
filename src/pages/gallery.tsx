import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from '../reducers';
import { PhotosActions } from '../reducers/photosReducer';
import { getPhotosRequest } from '../api/photos';
import { PhotoDto } from '../dto/photo.dto';
import {useEffect} from "react";
import { BigPhoto } from '../components/bigPhoto';
import { useMediaQuery, useTheme } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';


export const Gallery = () => {
    const [photoId, setPhotoId] = React.useState<string | null>(null);

    const dispatch = useDispatch();
    const theme = useTheme();

    const { photos, page } = useSelector((state: ReduxState) => state.photos);

    const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if(!photos.length){
            fetchPhotos();
        }
    }, [])

    const fetchPhotos = async () => {
        dispatch(PhotosActions.fetchStart());

        try {
            const { data } = await getPhotosRequest(page);

            dispatch(PhotosActions.setPhotos(data));
            dispatch(PhotosActions.fetchSuccess());
        } catch (error) {
            dispatch(PhotosActions.fetchFailed());
        }
    };

    const refreshFunction = () => {
        dispatch(PhotosActions.setPhotos([]));

        fetchPhotos()
    }
    const handleOpen = (id: string) => () => setPhotoId(id);
    const handleClose = () => setPhotoId(null);

    return (
        <Box sx={{ margin: matchDownMd ? 0 : 5, overflowY: 'scroll' }}>
            <InfiniteScroll
                dataLength={photos.length}
                next={fetchPhotos}
                hasMore={true}
                loader={null}
                refreshFunction={refreshFunction}
            >
                <ImageList
                    variant="masonry"
                    cols={matchDownMd ? 1 : 3}
                    gap={8}>

                    {photos.map((photo: PhotoDto) => (
                        <ImageListItem
                            key={photo.id}
                            onClick={handleOpen(photo.id)}
                        >
                            <img
                                src={`${photo.urls.small}`}
                                srcSet={`${photo.urls.small}`}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </InfiniteScroll>
            {photoId ? <BigPhoto photoId={photoId} handleClose={handleClose} fetchPhotos={fetchPhotos}/> : null}
        </Box>
    );
}
