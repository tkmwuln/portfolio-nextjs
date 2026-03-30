/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('./app/generated/prisma');
const prisma = new PrismaClient();

async function addSampleData() {
  try {
    console.log('🚀 Adding sample data...');

    // Add sample user
    const user = await prisma.user.upsert({
      where: { email: 'demo@example.com' },
      update: {},
      create: {
        email: 'demo@example.com',
        name: 'Alex Johnson',
        bio: 'Full-stack developer passionate about creating amazing digital experiences with modern technologies. I love building scalable applications and mentoring developers.',
        website: 'https://alexjohnson.dev',
        github: 'https://github.com/alexjohnson',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        twitter: 'https://twitter.com/alexjohnson_dev'
      }
    });

    console.log('✅ User created:', user.name);

    // Add sample projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution built with Next.js, TypeScript, and Supabase. Features include user authentication, product management, shopping cart, and payment integration.',
        technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Stripe'],
        demoUrl: 'https://demo-ecommerce.vercel.app',
        sourceUrl: 'https://github.com/alexjohnson/ecommerce-platform',
        featured: true,
        published: true,
        userId: user.id
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.',
        technologies: ['React', 'Supabase', 'Socket.io', 'Material-UI'],
        demoUrl: 'https://taskmanager-demo.vercel.app',
        sourceUrl: 'https://github.com/alexjohnson/task-manager',
        featured: true,
        published: true,
        userId: user.id
      },
      {
        title: 'Weather Dashboard',
        description: 'A beautiful weather dashboard that displays current conditions and forecasts with interactive maps and location-based services.',
        technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Mapbox'],
        demoUrl: 'https://weather-dashboard.vercel.app',
        sourceUrl: 'https://github.com/alexjohnson/weather-dashboard',
        featured: false,
        published: true,
        userId: user.id
      }
    ];

    for (const project of projects) {
      await prisma.project.create({ data: project });
    }

    console.log('✅ Projects created:', projects.length);

    // Add sample skills
    const skills = [
      { name: 'JavaScript', category: 'Frontend', proficiency: 5, userId: user.id },
      { name: 'TypeScript', category: 'Frontend', proficiency: 4, userId: user.id },
      { name: 'React', category: 'Frontend', proficiency: 5, userId: user.id },
      { name: 'Next.js', category: 'Frontend', proficiency: 4, userId: user.id },
      { name: 'Node.js', category: 'Backend', proficiency: 4, userId: user.id },
      { name: 'PostgreSQL', category: 'Database', proficiency: 4, userId: user.id },
      { name: 'Supabase', category: 'Backend', proficiency: 4, userId: user.id },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 5, userId: user.id }
    ];

    for (const skill of skills) {
      await prisma.skill.create({ data: skill });
    }

    console.log('✅ Skills created:', skills.length);
    console.log('🎉 Sample data added successfully!');

  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addSampleData();