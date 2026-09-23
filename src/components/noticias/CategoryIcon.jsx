import React from 'react';
import { GraduationCap, BookOpen, Home, Sparkles } from 'lucide-react';

const ICONS = { PAES: GraduationCap, Adultos: BookOpen, Homeschool: Home, Lael: Sparkles };

export default function CategoryIcon({ category, ...props }) {
  const Icon = ICONS[category] || Sparkles;
  return <Icon aria-hidden="true" {...props} />;
}
