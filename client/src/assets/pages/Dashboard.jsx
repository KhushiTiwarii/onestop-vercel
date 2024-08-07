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
    padding: '1rem',
    overflow: 'auto',
    backgroundColor: '#D6CDE0', 
    minHeight: 'calc(100vh - 64px)', 
  },
  header: {
    color: '#5B2A6F', 
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  headerLarge: {
    fontSize: '2rem', 
    fontWeight: 'bold',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
    gap: '1rem',
    width: '100%',
    maxWidth: '1200px', 
    marginTop: '2rem', 
  },
  card: {
    backgroundColor: '#E8D6E4', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    borderRadius: '12px', 
    transition: 'transform 0.3s ease',
    padding: '1rem',
  },
  name: {
    color: '#5B2A6F', 
    fontWeight: 'bold',
  },
  description: {
    color: '#3D2A5D',
    margin: '0.5rem 0',
  },
  year: {
    color: '#3D2A5D', 
  },
  experience: {
    color: '#3D2A5D', 
    fontStyle: 'italic',
    marginTop: '0.5rem',
  },
  avatar: {
    width: '60px', 
    height: '60px',
    marginBottom: '1rem',
  },
};

const achievements = [
  {
    name: 'John Doe',
    description: 'Top alumni in 2023',
    year: 2023,
    experience: 'Completed a high-impact internship at XYZ Corp, significantly enhancing practical skills and industry knowledge.',
    profilePic: 'https://via.placeholder.com/80',
  },
  {
    name: 'Jane Smith',
    description: 'Outstanding research in 2022',
    year: 2022,
    experience: 'Led a groundbreaking project on AI-driven analytics that received praise from leading tech firms and academia.',
    profilePic: 'https://via.placeholder.com/80',
  },
  {
    name: 'Alice Johnson',
    description: 'Best project award 2021',
    year: 2021,
    experience: 'Developed an innovative solution in a competitive hackathon, winning first place and gaining industry recognition.',
    profilePic: 'https://via.placeholder.com/80',
  },
];

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <Typography variant="h4" style={{ ...styles.header, ...styles.headerLarge }}>
          Student Achievements
        </Typography>
        <div style={styles.cardContainer}>
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              style={styles.card}
              className="relative hover:shadow-xl hover:scale-105"
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