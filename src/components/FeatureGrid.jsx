import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';

export default function FeatureGrid({ features }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-lael-primary relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card hoverEffect className="p-8 h-full flex flex-col items-start group">
                <div className="w-14 h-14 rounded-xl bg-lael-secondary border border-white/5 flex items-center justify-center mb-6 group-hover:border-lael-accent/30 group-hover:text-lael-accent transition-colors duration-500">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3 text-lael-light">{feature.title}</h3>
                <p className="text-lael-muted leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
