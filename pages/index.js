import React, { useState, useEffect, useContext } from "react";
import Image from 'next/image';
import Countdown from "react-countdown";

import { VotingContext } from "../context/Voter";
import Style from '../styles/index.module.css'
import Card from '../components/Card/Card'
import image from '../assets/candidate-1.jpg'


const index = () => {
  const { VotingTitle } = useContext(VotingContext)
  return (
    <div>{VotingTitle}</div>
  )
}

export default index