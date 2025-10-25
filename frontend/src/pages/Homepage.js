import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Globe, Shield, BarChart3, Cloud } from 'lucide-react';

const domains = [
  {
    name: 'Artificial Intelligence & Machine Learning',
    icon: Cpu,
    gradient: 'from-cyan-500 to-blue-600',
    description: 'Artificial Intelligence & Machine Learning'
  },
  {
    name: 'Web Development',
    icon: Globe,
    gradient: 'from-green-500 to-emerald-600',
    description: 'Full-Stack Web Development'
  },
  {
    name: 'Cyber Security',
    icon: Shield,
    gradient: 'from-red-500 to-pink-600',
    description: 'Cybersecurity & Ethical Hacking'
  },
  {
    name: 'Data Science',
    icon: BarChart3,
    gradient: 'from-orange-500 to-amber-600',
    description: 'Data Analysis & Visualization'
  },
  {
    name: 'Cloud Computing',
    icon: Cloud,
    gradient: 'from-violet-500 to-indigo-600',
    description: 'Cloud Infrastructure & Services'
  },
];

function Homepage() {
  const navigate = useNavigate();

  const handleDomainSelect = (domain) => {
    localStorage.setItem('selectedDomain', domain);
    navigate('/form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 font-space-grotesk">
            Tech Certificate Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose your Computer Science domain and generate a professional certificate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain) => {
            const IconComponent = domain.icon;
            return (
              <div
                key={domain.name}
                onClick={() => handleDomainSelect(domain.name)}
                className={`bg-gradient-to-r ${domain.gradient} p-8 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
              >
                <div className="text-center">
                  <IconComponent className="w-16 h-16 text-white mx-auto mb-4 group-hover:animate-pulse" />
                  <h3 className="text-2xl font-bold text-white mb-2 font-space-grotesk">
                    {domain.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {domain.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
