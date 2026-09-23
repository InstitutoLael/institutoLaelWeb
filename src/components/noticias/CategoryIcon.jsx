import React from 'react';
import { Graduacion, Guia, Familia, Paloma } from '../icons/LaelIcons';

const ICONS = { PAES: Graduacion, Adultos: Guia, Homeschool: Familia, Lael: Paloma };

export default function CategoryIcon({ category, ...props }) {
  const Icon = ICONS[category] || Paloma;
  return <Icon aria-hidden="true" {...props} />;
}
