"use client";
import React, { useState } from "react";
import Image from "@/components/designLayouts/Image";
import Link from "next/link";
import Slider from "react-slick";

const CustomSlide = ({
  Subtext,
  imgSrc,
  text,
  buttonLink,
  buttonText,
}: {
  Subtext: any;
  imgSrc: any;
  text: any;
  buttonLink: any;
  buttonText: any;
}) => (
  <div
    style={{
      position: "relative",
      backgroundColor: "#F5F5F3", // Gray background color
      display: "flex",
      justifyContent: "center",
      alignItems: "center", // Center vertically
      padding: "50px 0",
    }}
  >
    <div
      style={{
        maxWidth: "700px", // Adjust the maxWidth as needed
        marginRight: "50px", // Add margin between text/button and image
        paddingLeft: "50px",
      }}
    >
      <h1
        style={{
          marginBottom: "15px",
          fontSize: "2.5rem", // Adjust the font size as needed
          color: "#000", // Black color
          fontWeight: "700",
        }}
      >
        {text}
      </h1>
      <p
        style={{
          marginBottom: "25px",
          fontSize: "1.5rem", // Adjust the font size as needed
          color: "#666", // Gray color
        }}
      >
        {Subtext}
      </p>

      <Link href={buttonLink}>
        <button className="bg-blue-500 text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold">
          {buttonText}
        </button>
      </Link>
    </div>
    <div style={{ marginLeft: "50px" }}>
      <Image imgSrc={imgSrc} />
    </div>
  </div>
);

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (prev: any, next: any) => {
      setDocActive(next);
    },
    appendDots: (dots: any) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: any) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots: any) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i: any) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  const baseImgUrl =
    "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg";
  const slides = [
    {
      imgSrc: baseImgUrl,
      text: "Your PetCare Center",
      Subtext:
        "This is a website concept for a Pet care institute. Hope you guys will like it. Let me know your thought on that. Your feedback and appreciation is always welcome 🙂",
      buttonLink: "/offer",
      buttonText: "Shop Now",
    },
    {
      imgSrc: baseImgUrl,
      text: "Exceptional Pet Care Services",
      Subtext:
        "Provide your furry friends with the love and attention they deserve. Our dedicated team offers comprehensive pet care services to keep your pets happy, healthy, and thriving.",
      buttonLink: "/shop",
      buttonText: "Shop Now",
    },
    {
      imgSrc: baseImgUrl,
      text: "Tailored Pet Services",
      Subtext:
        "Discover a range of personalized services designed to meet the unique needs of your beloved pets. From grooming to training, we provide top-quality care for every aspect of your pet's well-being.",
      buttonLink: "/contact",
      buttonText: "Shop Now",
    },
  ];

  return (
    <div className="w-full bg-black">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
