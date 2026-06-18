import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button 
      onClick={handleBack}
      className="flex items-center gap-2 text-gray-500 hover:text-primary transition-all font-bold group py-2 px-1"
    >
      <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
