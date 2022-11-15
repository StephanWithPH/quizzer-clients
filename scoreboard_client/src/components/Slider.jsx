import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper';
import 'swiper/swiper-bundle.css';

function Slider(props) {
  const { teams } = props;
  const serverURL = process.env.REACT_APP_API_URL;
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCurrent((current + 1) % teams.filter((team) => team.image).length);
    }, 2000);
  }, [current]);

  return (
    teams.filter((team) => team.image).length === 1 ? (
      <div className="w-16 h-16 overflow-hidden border-2 border-indigo-600 rounded-full">
        <img src={serverURL + teams.filter((team) => team.image)[0].image} className="object-cover w-full h-full object-center" alt="Afbeelding van team" />
      </div>
    ) : (
      <div className="w-16 h-16 overflow-hidden border-2 border-indigo-600 rounded-full">
        <Swiper
          centeredSlides
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation, EffectFade]}
          className="w-full h-full"
        >
          {teams.map((team) => (
            <SwiperSlide key={team._id}>
              <img src={serverURL + team.image} className="object-cover w-full h-full object-center" alt="Afbeelding van team" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
}

export default Slider;
