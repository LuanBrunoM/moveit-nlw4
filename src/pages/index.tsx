import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const [level, setLevel] = useState(props.level);
  const [currentExperience, setCurrentExperience] = useState(props.currentExperience);
  const [challengesCompleted, setChallengesCompleted] = useState(props.challengesCompleted);

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const levelCookie = cookies.find(cookie => cookie.startsWith('level='));
    const currentExperienceCookie = cookies.find(cookie => cookie.startsWith('currentExperience='));
    const challengesCompletedCookie = cookies.find(cookie => cookie.startsWith('challengesCompleted='));

    if (levelCookie) {
      setLevel(Number(levelCookie.split('=')[1]));
    }

    if (currentExperienceCookie) {
      setCurrentExperience(Number(currentExperienceCookie.split('=')[1]));
    }

    if (challengesCompletedCookie) {
      setChallengesCompleted(Number(challengesCompletedCookie.split('=')[1]));
    }
  }, []);

  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      level: 0,
      currentExperience: 0,
      challengesCompleted: 0
    }
  }
}
