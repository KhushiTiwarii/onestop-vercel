import React from 'react';
import Sidebar from '../../components/SideBar';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import Bot from './ChatBot/Bot';


const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#D6CDE0',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    overflow: 'auto',
    backgroundColor: '#D6CDE0',
    minHeight: 'calc(100vh - 64px)',
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  headerLarge: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#5B2A6F',
  },
  headerSmall: {
    fontSize: '1.5rem',
    color: '#5B2A6F',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    width: '100%',
    maxWidth: '1200px',
    marginTop: '0rem',
  },
  card: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    padding: '0.5rem',
  },
  name: {
    color: '#5B2A6F',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  description: {
    color: '#3D2A5D',
    margin: '0.3rem 0',
    fontSize: '0.9rem',
  },
  year: {
    color: '#3D2A5D',
    fontSize: '0.8rem',
  },
  experience: {
    color: '#3D2A5D',
    fontStyle: 'italic',
    marginTop: '0.3rem',
    fontSize: '0.9rem',
  },
  avatar: {
    width: '50px',
    height: '50px',
    marginBottom: '0.5rem',
  },
};

const achievements = [
  {
    name: 'Ravi Kumar',
    description: 'Top student in 2023',
    year: 2023,
    experience: 'Completed a successful internship with a leading Indian tech firm, gaining valuable industry experience and skills.',
    profilePic: 'https://media.licdn.com/dms/image/D5603AQFnuJQ1lSBBvQ/profile-displayphoto-shrink_200_200/0/1688184601583?e=2147483647&v=beta&t=pPl1BCari2MNh5yAsL4Ydevlq-lYX4-aoKfxqghXWVE',
  },
  {
    name: 'Anita Sharma',
    description: 'Exceptional research in 2022',
    year: 2022,
    experience: 'Led a research project on AI applications in Indian agriculture, receiving recognition from top research institutions.',
    profilePic: 'https://media.licdn.com/dms/image/D4D03AQGnTQGyW5J1bw/profile-displayphoto-shrink_200_200/0/1705261855453?e=2147483647&v=beta&t=CkDJrmHK59fZz6J5i9qPksKC_WM7xnZuYowDuZjQdts',
  },
  {
    name: 'Raj Patel',
    description: 'Best project award 2021',
    year: 2021,
    experience: 'Developed a novel mobile application that won first place in a national hackathon, showcasing innovation and technical prowess.',
    profilePic: 'https://media.licdn.com/dms/image/D5603AQHqRJ1dPe-IQg/profile-displayphoto-shrink_200_200/0/1703569296218?e=2147483647&v=beta&t=FCBD0iLcwlLlqNX9J25JDQsjObDZoEslPApWQ-pYyjE',
  },
];

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.headerContainer}>
          <Typography variant="h1" style={styles.headerLarge}>
            OneStop
          </Typography>
          <Typography variant="h6" style={styles.headerSmall}>
            YOUR ONE-STOP PATH TO SUCCESS!
          </Typography>
          <Typography variant="h6" style={{ marginTop: '2rem', color: '#5B2A6F' }}>
            Testimonials
          </Typography>
        </div>
        <div style={styles.cardContainer}>
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <CardContent>
                <Avatar src={achievement.profilePic} style={styles.avatar} />
                <Typography variant="h6" component="div" style={styles.name}>
                  {achievement.name}
                </Typography>
                <Typography variant="body2" style={styles.description}>
                  {achievement.description}
                </Typography>
                <Typography variant="caption" style={styles.year}>
                  Year: {achievement.year}
                </Typography>
                <Typography variant="body2" style={styles.experience}>
                  "{achievement.experience}"
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Bot/>

    </div>
  );
};

export default Dashboard;
