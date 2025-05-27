import { Phone, Mail } from 'lucide-react';
import { Agent } from '../../types';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  const { firstName, lastName, email, phone, position, avatar, bio } = agent;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={avatar}
            alt={`${firstName} ${lastName}`}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="p-5 md:w-2/3">
          <h3 className="text-xl font-semibold">{firstName} {lastName}</h3>
          <p className="text-primary-600 font-medium">{position}</p>
          <p className="text-gray-600 my-3 line-clamp-3">{bio}</p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-700">
              <Phone size={18} className="mr-2 text-primary-600" />
              <a href={`tel:${phone}`} className="hover:text-primary-600">{phone}</a>
            </div>
            <div className="flex items-center text-gray-700">
              <Mail size={18} className="mr-2 text-primary-600" />
              <a href={`mailto:${email}`} className="hover:text-primary-600">{email}</a>
            </div>
          </div>
          
          <div className="mt-5">
            <button className="btn-outline w-full">Contacter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;