import React from 'react';
import Sidebar from '../../../components/SideBar';

function SoftSkills() {
  const topics = [
    {
      title: 'Communication',
      description: (
        <div>
          <p>Effective communication is key to success in any professional environment. It involves:</p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Clearly expressing ideas</li>
            <li>Actively listening</li>
            <li>Adapting your message to your audience</li>
            <li>Providing and receiving feedback</li>
          </ul>
        </div>
      ),
      videoId: 'pJ7RgUCEd5M', // Video ID for the Communication video
    },
    {
      title: 'Team Work',
      description: (
        <div>
          <p>Team work involves working collaboratively with others towards a common goal. Key aspects include:</p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Empathy towards team members</li>
            <li>Adaptability in roles</li>
            <li>Effective conflict resolution</li>
            <li>Clear communication within the team</li>
          </ul>
        </div>
      ),
      videoId: 'S7PhGkEQUWw' // Video ID for the Team Work video
    },
    {
      title: 'Leadership',
      description: (
        <div>
          <p>Leadership is about guiding and inspiring others. Important leadership qualities include:</p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Decision-making skills</li>
            <li>Motivating and inspiring team members</li>
            <li>Managing resources effectively</li>
            <li>Building trust and credibility</li>
          </ul>
        </div>
      ),
      videoId: 'eXDNkwIeOqA' // Video ID for the Leadership video
    },
    {
      title: 'Time Management',
      description: (
        <div>
          <p>Time management involves planning and controlling how you spend your time. Effective strategies include:</p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Prioritizing tasks</li>
            <li>Setting clear deadlines</li>
            <li>Avoiding procrastination</li>
            <li>Minimizing distractions</li>
          </ul>
        </div>
      ),
      videoId: 'iONDebHX9qk' // Updated Video ID for the Time Management video
    }
  ];

  const resources = [
    {
      title: 'Effective Communication Skills',
      description: 'Learn how to communicate effectively in both personal and professional settings.',
      link: 'https://www.mindtools.com/page8.html'
    },
    {
      title: 'Public Speaking and Presentation',
      description: 'Develop your public speaking and presentation skills to deliver confident and impactful talks.',
      link: 'https://www.toastmasters.org/'
    },
    {
      title: 'Emotional Intelligence',
      description: 'Understand and improve your emotional intelligence to build better relationships.',
      link: 'https://www.helpguide.org/articles/mental-health/emotional-intelligence-eq.htm'
    },
    {
      title: 'Time Management',
      description: 'Master time management techniques to boost productivity and reduce stress.',
      link: 'https://www.lifehack.org/articles/productivity/20-quick-tips-for-better-time-management.html'
    },
    {
      title: 'Leadership and Teamwork',
      description: 'Enhance your leadership and teamwork skills to become a more effective leader and team member.',
      link: 'https://www.forbes.com/sites/forbeshumanresourcescouncil/2021/02/17/15-simple-ways-to-improve-leadership-skills-at-work/'
    },
  ];

  const caseStudies = [
    {
      title: 'How Effective Communication Transformed a Business',
      description: 'Read about how improving communication skills led to better team collaboration and business success.',
      link: 'https://www.success.com/communication-case-study-how-to-improve-communication-in-the-workplace/'
    },
    {
      title: 'The Power of Emotional Intelligence in Leadership',
      description: 'Discover how leaders with high emotional intelligence have driven their teams to success.',
      link: 'https://hbr.org/2019/05/why-leaders-need-to-develop-a-high-emotional-intelligence'
    },
    {
      title: 'Public Speaking Skills: From Fear to Confidence',
      description: 'A success story of how mastering public speaking transformed a career.',
      link: 'https://www.toastmasters.org/Magazine/Articles/Public-Speaking-Confidence'
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow p-8 overflow-auto">
        {/* Resource Library Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Resource Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{resource.title}</h3>
                <p className="text-gray-700 mb-4">{resource.description}</p>
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies and Success Stories Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Case Studies and Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((caseStudy, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{caseStudy.title}</h3>
                <p className="text-gray-700 mb-4">{caseStudy.description}</p>
                <a href={caseStudy.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                  Read More
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* External Learning Resources Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">External Learning Resources</h2>
          <ul className="list-disc pl-6">
            <li className="mb-2">
              <a href="https://www.coursera.org/courses?query=soft%20skills" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                Coursera - Soft Skills Courses
              </a>
            </li>
            <li className="mb-2">
              <a href="https://www.udemy.com/topic/soft-skills/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                Udemy - Soft Skills Development
              </a>
            </li>
            <li className="mb-2">
              <a href="https://www.linkedin.com/learning/topics/soft-skills" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                LinkedIn Learning - Soft Skills
              </a>
            </li>
            <li className="mb-2">
              <a href="https://www.skillshare.com/browse/soft-skills" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                Skillshare - Soft Skills Classes
              </a>
            </li>
          </ul>
        </section>

        {/* Soft Skills Topics Section */}
        <h1 className="text-2xl font-bold mb-8 text-center">Soft Skills</h1>
        {topics.map((topic, index) => (
          <div key={index} className="flex flex-row space-x-8 mb-8">
            {/* Documentation Section */}
            <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
              <h2 className="text-xl font-bold mb-4">{topic.title}</h2>
              {topic.description}
            </div>

            {/* YouTube Video Section */}
            <div className="bg-white shadow-md rounded-lg p-6 w-1/2 flex items-center justify-center">
              <div className="w-full">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${topic.videoId}`}
                  title={`${topic.title} Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SoftSkills;