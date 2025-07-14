'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ItemTypes} from "@/types/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "./Card";
import { isAlbum } from "@/utils/typeGuards";

type Props = {
    items : ItemTypes[],
    artist: string,
    className: string,
}

export default function Carousel({items, artist, className} : Props){
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            slidesPerView={5}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4},
                1440: { slidesPerView: 5},
            }}
            className={`${className}`}
        >
                                
        {items.map((c) => (isAlbum(c) && c.artist.name === artist && c.record_type!="single") ? (
            <SwiperSlide key={c.id} className={`p-4 items-center justify-center max-w-7xl `}>
                <Card carousel item={c} variant="square"></Card>
            </SwiperSlide>   
        ) : "")}
        </Swiper>
    );
}