// FeaturesData.js
import React from 'react';
import { FaMedkit } from 'react-icons/fa';
import { IoIosOptions } from 'react-icons/io';
import { BiSupport, BiDollar } from 'react-icons/bi';
import { FaBolt } from 'react-icons/fa';
import { GiBiceps } from 'react-icons/gi';

const iconStyle = (Icon) => <Icon size="3rem" color="#0f0f0f" />;

export const getFeaturesData = (t) => [
  {
    name: t("Injury Prevention"),
    description: t("Injury Prevention Description"),
    icon: iconStyle(FaMedkit),
    imgClass: 'one',
  },
  {
    name: t("Time and Money Savings"),
    description: t("Time and Money Savings Description"),
    icon: iconStyle(BiDollar),
    imgClass: 'five',
  },
  {
    name: t("Performance Boost"),
    description: t("Performance Boost Description"),
    icon: iconStyle(FaBolt),
    imgClass: 'three',
  },
  {
    name: t("24/7 Support"),
    description: t("24/7 Support Description"),
    icon: iconStyle(BiSupport),
    imgClass: 'four',
  },
  {
    name: t("Ease of Use"),
    description: t("Ease of Use Description"),
    icon: iconStyle(IoIosOptions),
    imgClass: 'two',
  },
  {
    name: t("Physical Assessment"),
    description: t("Physical Assessment Description"),
    icon: iconStyle(GiBiceps),
    imgClass: 'six',
  },
];