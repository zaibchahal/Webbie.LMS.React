import { LmsFeatures } from '../../menu';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Card, { CardTabItem } from '../../components/bootstrap/Card';
import FavouriteVideos from '../MyFavourits/FavouriteVideos';
import FavouriteMcqs from '../MyFavourits/FavouriteMcqs';
import FavouritePDF from '../MyFavourits/FavouritePdf';
import Page from '../../layout/Page/Page';

const MyFavourits = () => {
    return (
        <PageWrapper title={LmsFeatures.myfavourites.text}>
            <Page>
                <Card hasTab>
                    <CardTabItem id='videos' title='Videos' icon='Shop'>
                        <FavouriteVideos isFluid />
                    </CardTabItem>
                    <CardTabItem id='audios' title='Audios' icon='LibraryMusic'>
                        <FavouriteVideos isFluid />
                    </CardTabItem>
                    <CardTabItem id='mcq' title="Mcq's" icon='AutoStories'>
                        <FavouriteMcqs isFluid />
                    </CardTabItem>
                    <CardTabItem id='pdf' title='Pdf' icon='PictureAsPdf'>
                        <FavouritePDF isFluid />
                    </CardTabItem>
                </Card>
            </Page>
        </PageWrapper>
    );
};

export default MyFavourits;
