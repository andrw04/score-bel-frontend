import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid2,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import { NewsType } from '../../../core/types/newsType'
import Preloader from '../common/Preloader'
import { useEffect, useState } from 'react'

const News = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    const news: NewsType[] = [
        {
            imageUrl:
                'https://bel.football/uploads/images/653xcyfiq61kop89g617k1ir_16ced0b0_95df_4d1b_b064_0edac13113d1.jpg',
            title: 'Отразил пенальти, оформил хет-трик, убрал всю оборону одним финтом. Символическая сборная 29 тура от bel.football',
            newsPageUrl:
                'https://bel.football/articles/otrazil-penalti-oformil-khet-trik-ubral-vsyu-oboronu-odnim-fintom-simvolicheskaya-sbornaya-29-tura-ot-belfootball',
            posted: new Date(),
        },
        {
            imageUrl:
                'https://bel.football/uploads/images/654g75hwbzte0bk57z3rmck1_654g6xzqs13j5se5gf56j8t8_64uhomr6ok7g3npa82ec1039_photo_2024.jpg',
            title: 'Рулевой «Сморгони» — о продлении контракта: «Хотеть и мочь — это разные вещи»',
            newsPageUrl:
                'https://bel.football/news/rulevoi-smorgoni-o-prodlenii-kontrakta-khotet-i-moch-eto-raznye-veshai',
            posted: new Date(),
        },
        {
            imageUrl:
                'https://bel.football/uploads/images/654g2csfz1nkaudk73321i7s_654g29sut74035hbho5v7ij6_64wujuakbrgxm49443stbd73_1718562281.jpg',
            title: 'Игорь Слесарчук: «Был соблазн заменить вратаря, но футболистов нужно уважать как личность»',
            newsPageUrl:
                'https://bel.football/news/igor-slesarchuk-v-razdevalke-skazal-chto-mnogie-ne-ponimayut-chto-eto-ne-kompyuternaya-igra',
            posted: new Date(),
        },
        {
            imageUrl:
                'https://bel.football/uploads/images/652vo9w629lda9n4yfdr424p_photo_2024_11_24_19_42_53.jpg',
            title: 'Кровь, удаление и стычка после финального свистка. «Гомель» потерял шансы на топ-4, сыграв безголевую ничью со «Славией»',
            newsPageUrl:
                'https://bel.football/articles/krov-udalenie-i-stychka-posle-finalnogo-svistka-gomel-poteryal-shansy-na-top-4-sygrav-bezgolevuyu-nichyu-so-slaviei',
            posted: new Date(),
        },
        {
            imageUrl:
                'https://bel.football/uploads/images/653geaj90m02h47jcnvqb0s7_405821.jpg',
            title: '«По бокалу пива, наверное, даже не выпьем». «Динамо» на родном стадионе взяло золото, обыграв БАТЭ',
            newsPageUrl:
                'https://bel.football/articles/po-bokalu-piva-navernoe-dazhe-ne-vypem-dinamo-na-rodnom-stadione-vzyalo-zoloto',
            posted: new Date(),
        },
    ]

    return (
        <>
            {isLoading && <Preloader />}
            {!isLoading && (
                <Stack p="20px" gap="5px">
                    <Typography variant="h4">Новости</Typography>
                    {news.map((item) => (
                        <Card key={item.title}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={item.imageUrl}
                                    height="140px"
                                    alt=""
                                />
                                <CardContent>
                                    <Typography>{item.title}</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size="small"
                                    href={item.newsPageUrl}
                                    variant="contained"
                                    color="inherit"
                                >
                                    Читать далее
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Stack>
            )}
        </>
    )
}

export default News
