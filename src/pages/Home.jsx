import React from 'react';
import Background from '../components/common/Background';
import Toast from '../components/common/Toast';
import Nav from '../components/layout/Nav';
import HomeFooter from '../components/layout/HomeFooter';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Benefits from '../components/landing/Benefits';
import Banner from '../components/landing/Banner';

export default function Home() {
  return (
    <div className="landing-page">
      <Background />
      <Nav />

      <main className="landing-page__main">
        <Hero />
        <Features />
        <Benefits />
        <Banner />
      </main>

      <HomeFooter />
      <Toast />
    </div>
  );
}
