const Skills = ({ data }) => {
  // Fallback to an empty array
  const skillCategories = data || [];

  return (
    <section id="skills" className="px-5 max-w-[1400px] mx-auto py-20">
      <div>
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            // Helper: Split comma-separated string into an array 
            // Handles both database strings and potential existing arrays
            const skillsArray = typeof category.skills === 'string' 
              ? category.skills.split(',').map(s => s.trim()) 
              : (category.skills || []);

            return (
              <div
                key={category.id || category.title}
                className="heavy-card card-default px-6 py-8 md:px-8 md:py-10"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Category Header */}
                <h3 className="font-display text-[1.4rem] text-primary mb-6">
                  {category.title || category.domain}
                </h3>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2.5">
                  {skillsArray.map((skillName) => (
                    <span
                      key={skillName}
                      className="inline-flex items-center px-3.5 py-1 text-xs font-medium text-secondary bg-white/5 border border-white/8 rounded-full"
                    >
                      {skillName}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;