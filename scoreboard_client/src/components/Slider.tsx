import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Team from "../models/team.ts";
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'

interface SliderProps {
  teams: Team[];
}

function Slider({ teams }: SliderProps) {
  const serverURL = import.meta.env.VITE_API_URL;
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCurrent((current + 1) % teams.filter((team) => team.image).length);
    }, 2000);
  }, [current, teams]);

  return teams.filter((team) => team.image).length === 1 ? (
    <div className="w-16 h-16 overflow-hidden border-2 border-indigo-600 rounded-full">
      <img
        src={serverURL + teams.filter((team) => team.image)[0].image}
        className="object-cover w-full h-full object-center"
        alt="Afbeelding van team"
      />
    </div>
  ) : (
    <div className="w-16 h-16 overflow-hidden border-2 border-indigo-600 rounded-full">
      <Swiper
        centeredSlides
        effect="fade"
        navigation
        fadeEffect={{ crossFade: true }}
        modules={[Navigation]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {teams.map((team) => (
          <SwiperSlide key={team._id}>
            <img
              src={serverURL + team.image}
              className="object-cover w-full h-full object-center"
              alt="Afbeelding van team"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
