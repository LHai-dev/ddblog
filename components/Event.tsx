interface EventProps {
    title: string;
    date: string;
    description: string;
  }
  
  const Event = ({ title, date, description }: EventProps) => {
    return (
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    );
  };
  
  export default Event;
  