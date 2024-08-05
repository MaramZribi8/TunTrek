import React from "react";
import Slider from "react-slick";
import Image from "./Image.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PlaceGallery({ place, className }) {
    // Check if there is only one photo
    if (place?.photos?.length === 1) {
        return (
            <div style={{ width: '100%', margin: '0 auto', position: 'relative' }}>


                {place.photos?.[0] && (
                    <Image className={className} src={place.photos?.[0]} alt="" />
                )}

            </div>
        );
    }

    // If there are more than one photo, render the Slider
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div style={{ width: '100%', height: '100%', margin: '0 auto', position: 'relative' }}>
            <Slider {...settings} className="center">
                {place?.photos?.map((photo, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                        <div className="w-full h-full bg-center bg-cover">
                            <Image src={photo} alt={`Photo ${index + 1}`} className={className} />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

// Previous Arrow Component
const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="prev-arrow" onClick={onClick} style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', borderRadius: '50%', padding: '10px', zIndex: 1, background: 'rgba(229, 231, 235, 0.5)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" /></svg>
        </div>



    );
};

// Next Arrow Component
const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="next-arrow" onClick={onClick} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', borderRadius: '50%', padding: '10px', zIndex: 1, background: 'rgba(229, 231, 235, 0.5)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" /></svg>
        </div>
    );
};
