const CounterSection = () => {
    const counters = [
      { count: "70+", label: "Papers Published", description: "Total number of research papers and publications." },
      { count: "15+", label: "Authors", description: "Contributors to the research and publications." },
      { count: "40+", label: "Reviewers", description: "Feedback and evaluations received." },
    ];
  
    return (
      <div className="bg-gradient-to-b bg-gray-200 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {counters.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-blue-600">{item.count}</span>
              <h3 className="text-xl font-semibold text-gray-800 mt-2">{item.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CounterSection;
  