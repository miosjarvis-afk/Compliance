// Seed file for AI Trust Layer
// Creates demo data for 3 clients with full project data

import { PrismaClient, Plan, RiskSensitivity, ProjectType, ProjectStatus, RiskLevel, EvidenceType, EvidenceStatus, ChangeLogType, Severity, IntegrationProvider, IntegrationStatus, ActivityType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.$transaction([
    prisma.activity.deleteMany(),
    prisma.trustPortal.deleteMany(),
    prisma.integration.deleteMany(),
    prisma.changeLogItem.deleteMany(),
    prisma.evidenceItem.deleteMany(),
    prisma.intakeAnswer.deleteMany(),
    prisma.complianceSummary.deleteMany(),
    prisma.project.deleteMany(),
    prisma.client.deleteMany(),
    prisma.user.deleteMany(),
    prisma.agency.deleteMany(),
  ]);

  console.log('✅ Database cleared');

  // Create Agency
  const agency = await prisma.agency.create({
    data: {
      name: 'TrustLayer Agency',
      industryFocus: 'AI Compliance',
      plan: Plan.pro,
      teamSize: '5-10',
      primaryRegion: 'Europe',
      focus: ['Healthcare', 'HR Tech', 'Customer Service'],
    },
  });

  console.log(`✅ Created agency: ${agency.name}`);

  // Create Users
  const adminUser = await prisma.user.create({
    data: {
      agencyId: agency.id,
      email: 'admin@trustlayer.io',
      name: 'Admin User',
      role: 'admin',
    },
  });

  console.log(`✅ Created user: ${adminUser.email}`);

  // ===== CLIENT 1: MedClinic AG =====
  const client1 = await prisma.client.create({
    data: {
      agencyId: agency.id,
      name: 'MedClinic AG',
      industry: 'Healthcare',
      website: 'https://medclinic.de',
      contactName: 'Dr. Sarah Müller',
      contactEmail: 's.mueller@medclinic.de',
      region: 'Germany',
      riskSensitivity: RiskSensitivity.high,
    },
  });

  // Project 1: Voice Agent for MedClinic
  const project1 = await prisma.project.create({
    data: {
      clientId: client1.id,
      name: 'Voice Agent - Terminbuchung',
      type: ProjectType.voice_agent,
      status: ProjectStatus.trust_ready,
      description: 'AI Voice Agent für automatische Terminvereinbarung und Anfragen',
      owner: adminUser.name,
      riskLevel: RiskLevel.green,
      trustScore: 92,
      completionPercentage: 100,
    },
  });

  await createProjectData(project1.id, agency.id, 'MedClinic AG');

  // Project 2: Patient Intake Bot
  const project2 = await prisma.project.create({
    data: {
      clientId: client1.id,
      name: 'Patient Intake Bot',
      type: ProjectType.chatbot,
      status: ProjectStatus.intake_in_progress,
      description: 'Chatbot für Patientenaufnahme und Symptom-Check',
      owner: adminUser.name,
      riskLevel: RiskLevel.yellow,
      trustScore: 65,
      completionPercentage: 60,
    },
  });

  await createProjectData(project2.id, agency.id, 'MedClinic AG');

  console.log(`✅ Created client: ${client1.name} with 2 projects`);

  // ===== CLIENT 2: TalentFlow GmbH =====
  const client2 = await prisma.client.create({
    data: {
      agencyId: agency.id,
      name: 'TalentFlow GmbH',
      industry: 'HR / Recruiting',
      website: 'https://talentflow.io',
      contactName: 'Marc Weber',
      contactEmail: 'm.weber@talentflow.io',
      region: 'Germany',
      riskSensitivity: RiskSensitivity.medium,
    },
  });

  // Project 3: Recruiting Screening Bot
  const project3 = await prisma.project.create({
    data: {
      clientId: client2.id,
      name: 'Recruiting Screening Bot',
      type: ProjectType.chatbot,
      status: ProjectStatus.live,
      description: 'AI-gestützter Screening-Bot für erste Bewerbungsgespräche',
      owner: adminUser.name,
      riskLevel: RiskLevel.yellow,
      trustScore: 88,
      completionPercentage: 100,
    },
  });

  await createProjectData(project3.id, agency.id, 'TalentFlow GmbH');

  console.log(`✅ Created client: ${client2.name} with 1 project`);

  // ===== CLIENT 3: HomeFix Services =====
  const client3 = await prisma.client.create({
    data: {
      agencyId: agency.id,
      name: 'HomeFix Services',
      industry: 'Local Services',
      website: 'https://homefix-services.de',
      contactName: 'Anna Schmidt',
      contactEmail: 'a.schmidt@homefix.de',
      region: 'Germany',
      riskSensitivity: RiskSensitivity.low,
    },
  });

  // Project 4: Customer Support Chatbot
  const project4 = await prisma.project.create({
    data: {
      clientId: client3.id,
      name: 'Customer Support Chatbot',
      type: ProjectType.chatbot,
      status: ProjectStatus.review_needed,
      description: '24/7 Kundensupport Chatbot für Anfragen und Terminbuchung',
      owner: adminUser.name,
      riskLevel: RiskLevel.red,
      trustScore: 45,
      completionPercentage: 40,
    },
  });

  await createProjectData(project4.id, agency.id, 'HomeFix Services');

  console.log(`✅ Created client: ${client3.name} with 1 project`);

  console.log('\n🎉 Seed completed successfully!');
  console.log('📊 Summary:');
  console.log('   - 1 Agency');
  console.log('   - 1 User');
  console.log('   - 3 Clients');
  console.log('   - 4 Projects');
}

async function createProjectData(projectId: string, agencyId: string, clientName: string) {
  // Create Compliance Summary
  await prisma.complianceSummary.create({
    data: {
      projectId,
      trustScore: Math.floor(Math.random() * 40) + 60,
      riskLevel: Math.random() > 0.5 ? RiskLevel.green : RiskLevel.yellow,
      transparencyRequired: true,
      personalDataInvolved: true,
      sensitiveDataInvolved: Math.random() > 0.3,
      humanOversightDefined: Math.random() > 0.2,
      subprocessorCount: Math.floor(Math.random() * 5) + 1,
      missingItems: Math.random() > 0.5 ? ['Disclosure text', 'Human oversight details'] : [],
    },
  });

  // Create Evidence Items
  const evidenceTypes = [
    { type: EvidenceType.system_card, title: 'AI System Card' },
    { type: EvidenceType.subprocessor_register, title: 'Subprocessor Register' },
    { type: EvidenceType.data_flow, title: 'Data Flow Diagram' },
    { type: EvidenceType.change_log, title: 'Change Log' },
    { type: EvidenceType.literacy_checklist, title: 'AI Literacy Checklist' },
    { type: EvidenceType.disclosure, title: 'AI Disclosure Text' },
  ];

  for (const evidence of evidenceTypes) {
    await prisma.evidenceItem.create({
      data: {
        projectId,
        type: evidence.type,
        title: evidence.title,
        status: Math.random() > 0.3 ? EvidenceStatus.ready : EvidenceStatus.incomplete,
        description: `Documentation for ${evidence.title}`,
      },
    });
  }

  // Create Change Logs
  const changeTypes = [
    { type: ChangeLogType.prompt_update, desc: 'Prompt template updated for better responses' },
    { type: ChangeLogType.model_change, desc: 'Upgraded to latest GPT model' },
    { type: ChangeLogType.tool_added, desc: 'Added calendar integration' },
    { type: ChangeLogType.integration_change, desc: 'Connected CRM system' },
  ];

  for (let i = 0; i < 4; i++) {
    const change = changeTypes[i];
    await prisma.changeLogItem.create({
      data: {
        projectId,
        type: change.type,
        description: change.desc,
        severity: Severity.low,
        createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      },
    });
  }

  // Create Integrations
  const providers = [
    IntegrationProvider.openai,
    IntegrationProvider.retell,
    IntegrationProvider.n8n,
    IntegrationProvider.zapier,
  ];

  for (const provider of providers) {
    await prisma.integration.create({
      data: {
        projectId,
        provider,
        status: Math.random() > 0.3 ? IntegrationStatus.connected : IntegrationStatus.not_connected,
        lastSync: Math.random() > 0.3 ? new Date() : null,
      },
    });
  }

  // Create Intake Answers
  const intakeSections = [
    { section: 'purpose', questionKey: 'system_name', answer: 'Demo System' },
    { section: 'purpose', questionKey: 'main_purpose', answer: 'Automate customer interactions' },
    { section: 'users', questionKey: 'customer_facing', answer: true },
    { section: 'users', questionKey: 'user_awareness', answer: true },
    { section: 'data', questionKey: 'personal_data', answer: true },
    { section: 'data', questionKey: 'sensitive_data', answer: false },
    { section: 'tools', questionKey: 'llm_provider', answer: 'OpenAI' },
    { section: 'decisions', questionKey: 'makes_decisions', answer: false },
  ];

  for (const intake of intakeSections) {
    await prisma.intakeAnswer.create({
      data: {
        projectId,
        section: intake.section,
        questionKey: intake.questionKey,
        answer: JSON.stringify(intake.answer),
      },
    });
  }

  // Create Trust Portal
  await prisma.trustPortal.create({
    data: {
      projectId,
      token: `portal-${projectId.slice(0, 8)}`,
      isActive: true,
      viewCount: Math.floor(Math.random() * 50),
    },
  });

  // Create Activities
  const activities = [
    { type: ActivityType.project_created, project: 'Project' },
    { type: ActivityType.passport_generated, project: 'Project' },
    { type: ActivityType.sync_connected, project: 'Project' },
  ];

  for (const activity of activities) {
    await prisma.activity.create({
      data: {
        projectId,
        type: activity.type,
        project: activity.project,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
