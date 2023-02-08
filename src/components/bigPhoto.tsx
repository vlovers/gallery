import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Avatar, useMediaQuery, useTheme } from '@mui/material';
import { DownloadMenu } from './downloadMenu';
import { PhotoDto } from '../dto/photo.dto';
import {useEffect} from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { ReduxState } from '../reducers';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '89%',
    height: '84%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    borderRadius: 1
};

interface BigPhotoProps{
    photoId: string;
    handleClose(): void;
    fetchPhotos(): void;
}
export const BigPhoto: React.FC<BigPhotoProps> = ({photoId, handleClose, fetchPhotos}) => {
    const { photos } = useSelector((state: ReduxState) => state.photos);
    const [index, setIndex] = React.useState<number>(photos.findIndex((photo: PhotoDto) => photo.id === photoId));
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        findCurenPhoto()
    }, []);

    const findCurenPhoto = () => {
        const index = photos.findIndex((photo: PhotoDto) => photo.id === photoId);

        setIndex(index);
    }

    const nextPhoto = () => {
        if(photos.length - index === 2) {
            fetchPhotos();
        }

        setIndex(prev => prev && prev + 1)
    };
    const prevPhoto = () => setIndex(prev => prev && prev - 1);

    const {urls, user} = photos[index]

    const onDownload = (format: string) => {
        if (!format) {
            throw new Error("Resource URL not provided! You need to provide one");
        }

        // @ts-ignore
        fetch(urls[format])
            .then(response => response.blob())
            .then(blob => {
                const blobURL = URL.createObjectURL(blob);
                const a = document.createElement("a");

                a.href = blobURL;
                a.download = `image.${blob.type.split('/')[1]}`;
                document.body.appendChild(a);
                a.click();
            })
            .catch(() => console.log('error'));
    };

    console.log(user?.first_name);

    return (
        <Modal
            keepMounted
            open={!!photoId}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={{
                display: 'flex',
                justifyContent: matchDownMd ? 'center' : 'space-between',
                alignItems: 'center',
                padding: '0 20px',
            }}>
                {!matchDownMd && <CloseIcon sx={{
                    color: '#fff',
                    position: 'absolute',
                    top: 10
                }} onClick={handleClose}/>}

                {!matchDownMd && <ArrowBackIosIcon sx={{
                    color: '#fff',
                    position: 'absolute',
                    top: '50%'
                }} onClick={prevPhoto}/>}

                <Box sx={{...style, height: matchDownMd ? 'auto' : '84%'}}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ marginRight: 1 }} alt={user?.first_name + user?.last_name} src={user?.profile_image.small} />
                            <Typography id="keep-mounted-modal-title" variant="body1" component="h2">
                                {user.first_name} {user.last_name}
                            </Typography>
                        </Box>
                        {!matchDownMd ? <DownloadMenu onDownload={onDownload}/> : null}
                    </Box>
                    <Box
                        component="img"
                        sx={{
                            maxWidth: '100%',
                            maxHeight: matchDownMd ? '85%' : '90%',
                            margin: '0 auto',
                            marginTop: '20px',
                            marginBottom: matchDownMd ? 3 : 0
                        }}
                        loading="lazy"
                        src={urls.full}
                    />
                    {matchDownMd ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <DownloadMenu onDownload={onDownload}/>
                        </Box>
                    ) : null}
                </Box>

                {!matchDownMd && <ArrowForwardIosIcon sx={{
                    color: '#fff',
                    position: 'absolute',
                    top: '50%',
                    right: 10
                }} onClick={nextPhoto}/>}

                {matchDownMd && (
                    <Box sx={{
                        width: '120px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        top: '95%'
                    }}>
                        <ArrowBackIosIcon sx={{color: '#fff'}} onClick={prevPhoto}/>
                        <CloseIcon sx={{color: '#fff', marginLeft: '-5px'}} onClick={handleClose}/>
                        <ArrowForwardIosIcon sx={{color: '#fff'}} onClick={nextPhoto}/>
                    </Box>
                )}

            </Box>
        </Modal>
    );
}
