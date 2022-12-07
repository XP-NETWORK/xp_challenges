import React from "react";
import { withAliceCarousel } from "../../../hocs/withCarousel";

import { ITestimonial } from "../testimonial";

import pad from "../../../assets/img/home/mob/woodenPad1.png";

import { TestimonialTemplate } from "../testimonial";

const Testimonial = ({ testimonial }: { testimonial: ITestimonial }) => {
  return (
    <div className="mobileFeature mobTestimonial">
      <img src={pad} alt="wPad" className="woodenPad" />
      <TestimonialTemplate card={testimonial} />
    </div>
  );
};

export const TestimonialCarousel = ({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) => {
  return (
    <>
      {withAliceCarousel(
        testimonials.map((testimonial, index) => (
          <Testimonial testimonial={testimonial} key={`TestieMob-${index}`} />
        )),
        {
          paddingLeft: 35,
          paddingRight: 30,
          autoPlay: false,
        }
      )}
    </>
  );
};
