import { createClient } from './utils/supabase/server.js';

async function addSampleData() {
  const supabase = createClient();

  try {
    console.log('🚀 Adding sample data...');

    // Add sample user
    const { data: user, error: userError } = await supabase
      .from('users')
      .upsert({
        email: 'demo@example.com',
        name: 'Alex Johnson',
        bio: 'Full-stack developer passionate about creating amazing digital experiences with modern technologies.',
        website: 'https://alexjohnson.dev',
        github: 'https://github.com/alexjohnson',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        twitter: 'https://twitter.com/alexjohnson_dev'
      })
      .select()
      .single();

    if (userError) throw userError;
    console.log('✅ User created:', user.name);

    // Add sample projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution built with Next.js, TypeScript, and Supabase.',
        technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
        demoUrl: 'https://demo-ecommerce.vercel.app',
        sourceUrl: 'https://github.com/alexjohnson/ecommerce-platform',
        featured: true,
        published: true,
        userId: user.id
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates.',
        technologies: ['React', 'Supabase', 'Material-UI'],
        demoUrl: 'https://taskmanager-demo.vercel.app',
        sourceUrl: 'https://github.com/alexjohnson/task-manager',
        featured: true,
        published: true,
        userId: user.id
      },
      {
        title: 'Weather Dashboard',
        description: 'A beautiful weather dashboard with interactive maps.',
        technologies: ['Vue.js', 'Chart.js', 'OpenWeather API'],
        demoUrl: 'https://weather-dashboard.vercel.app',
        sourceUrl: 'https://github.com/alexjohnson/weather-dashboard',
        featured: false,
        published: true,
        userId: user.id
      }
    ];

    for (const project of projects) {
      const { error } = await supabase.from('projects').insert(project);
      if (error) throw error;
    }

    console.log('✅ Projects created:', projects.length);

    // Add sample skills
    const skills = [
      { name: 'JavaScript', category: 'Frontend', proficiency: 5, userId: user.id },
      { name: 'TypeScript', category: 'Frontend', proficiency: 4, userId: user.id },
      { name: 'React', category: 'Frontend', proficiency: 5, userId: user.id },
      { name: 'Next.js', category: 'Frontend', proficiency: 4, userId: user.id },
      { name: 'Node.js', category: 'Backend', proficiency: 4, userId: user.id },
      { name: 'PostgreSQL', category: 'Database', proficiency: 4, userId: user.id }
    ];

    for (const skill of skills) {
      const { error } = await supabase.from('skills').insert(skill);
      if (error) throw error;
    }

    console.log('✅ Skills created:', skills.length);
    console.log('🎉 Sample data added successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

addSampleData();