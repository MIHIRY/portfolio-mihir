import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Terminal, Globe } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center bg-[#0a0118] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="relative z-20 text-center px-4 animate-fadeIn">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30"></div>
            <img
              src="https://avatars.githubusercontent.com/u/97229749"
              alt="Mihir Yanamandra"
              className="w-40 h-40 rounded-full mx-auto border-4 border-purple-500/50 shadow-2xl relative"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">Mihir Yanamandra</h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8">Data Science Student at Stony Brook University</p>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/MIHIRY" target="_blank" rel="noopener noreferrer" 
               className="text-purple-300 hover:text-purple-400 transition-colors transform hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/mihir-yanamandra-60358021b" target="_blank" rel="noopener noreferrer" 
               className="text-purple-300 hover:text-purple-400 transition-colors transform hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="mailto:mihiryanamandra10@gmail.com" 
               className="text-purple-300 hover:text-purple-400 transition-colors transform hover:scale-110">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">About Me</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            I'm a Data Science student at Stony Brook University, passionate about leveraging data to solve complex problems
            and derive meaningful insights. With a strong foundation in statistics, machine learning, and programming,
            I enjoy working on projects that combine analytical thinking with practical applications. Currently seeking
            internship opportunities in data science and machine learning.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
              <Code2 className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="font-semibold mb-2 text-purple-200">Programming</h3>
              <p className="text-gray-400">Python, R, SQL, Java</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
              <Globe className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="font-semibold mb-2 text-purple-200">Data Science</h3>
              <p className="text-gray-400">Machine Learning, Statistics, Data Visualization</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
              <Database className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="font-semibold mb-2 text-purple-200">Tools & Libraries</h3>
              <p className="text-gray-400">Pandas, Scikit-learn, TensorFlow</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
              <Terminal className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="font-semibold mb-2 text-purple-200">Development</h3>
              <p className="text-gray-400">Git, Jupyter, Docker</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Featured Projects</h2>
          <div className="space-y-12">
            {[
              {
                title: "Predictive Analytics for Student Success",
                description: "Developed a machine learning model to predict student academic performance using historical data and various features.",
                tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
                link: "#"
              },
              {
                title: "Hate Speech Detection Using different models",
                description: "Hate speech detection system using a dataset of over 10,000 entries.",
                tech: ["Python", "NLTK", "Pandas", "Machine Learning", "Deep Learning"],
                image: "https://vitalflux.com/wp-content/uploads/2022/03/hate-speech-detection-using-machine-learning-1280x720.png",
                link: "https://github.com/MIHIRY/Hate-Speech-Recognition"
              }
            ].map((project, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="h-48 w-full object-cover md:h-full"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-bold mb-2 text-purple-200">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-purple-900/30 text-purple-200 rounded-full text-sm border border-purple-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-400 hover:text-purple-300"
                    >
                      View Project <ExternalLink className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-[#0a0118]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Get In Touch</h2>
          <p className="text-lg text-gray-300 mb-8">
            I'm currently looking for data science internship opportunities. Feel free to reach out!
          </p>
          <div className="space-y-4">
            <a 
              href="mailto:mihiryanamandra10@gmail.com"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              Personal Email
            </a>
            <br />
            <a 
              href="mailto:mihir.yanamandra@stonybrook.edu"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              University Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0118] text-gray-400 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p>© 2024 Mihir Yanamandra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;